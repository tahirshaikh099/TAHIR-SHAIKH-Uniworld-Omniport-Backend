// const db = require('../db/connect');
// const calculateTotal = require('../utils/calculateTotal');

// const createUser = async () => {
//     try {
//         db.beginTransaction((err) => {
//             if (err) throw err;

//             db.query('INSERT INTO Users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
//                 if (err) {
//                     return db.rollback(() => {
//                         throw err;
//                     });
//                 }
//                 const userId = result.insertId;
//             });
//         });
//         return userId;
//     } catch (err) {
//         db.rollback(() => {
//             throw err;
//         });
//     }
// }


// const createOrder = async () => {
//     try {
//         db.beginTransaction((err) => {
//             if (err) throw err;
//             db.query('INSERT INTO `Order` (amount, user_id) VALUES (?, ?)', [totalAmount, userId], (err, result) => {
//                 if (err) {
//                     return db.rollback(() => {
//                         throw err;
//                     });
//                 }
//                 const orderId = result.insertId;

//             });
//         })
//         return orderId;
//     } catch (err) {
//         db.rollback(() => {
//             throw err;
//         });
//     }
// }

// const placeOrder = (req, res) => {
//     const { name, email, items } = req.body;
//     const totalAmount = calculateTotal(items.items);

//     db.beginTransaction((err) => {
//         if (err) throw err;

//         db.query('INSERT INTO Users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
//             if (err) {
//                 return db.rollback(() => {
//                     throw err;
//                 });
//             }
//             const userId = result.insertId;

//             db.query('INSERT INTO `Order` (amount, user_id) VALUES (?, ?)', [totalAmount, userId], (err, result) => {
//                 if (err) {
//                     return db.rollback(() => {
//                         throw err;
//                     });
//                 }
//                 const orderId = result.insertId;

//                 const insertOrderItems = items.items.map(item => {
//                     return new Promise((resolve, reject) => {
//                         const table = `Order_${item.category}`;
//                         db.query(`INSERT INTO ${table} (order_id, ${item.category.toLowerCase()}_id) VALUES (?, ?)`, [orderId, item.id], (err) => {
//                             if (err) {
//                                 return reject(err);
//                             }
//                             resolve();
//                         });
//                     });
//                 });

//                 Promise.all(insertOrderItems)
//                     .then(() => {
//                         db.commit((err) => {
//                             if (err) {
//                                 return db.rollback(() => {
//                                     throw err;
//                                 });
//                             }
//                             res.status(200).send({ status: "success", data: "Order placed successfully" });
//                         });
//                     })
//                     .catch(err => {
//                         db.rollback(() => {
//                             throw err;
//                         });
//                     });
//             });
//         });
//     });
// };

// module.exports = { placeOrder };


const db = require('../db/connect');
const calculateTotal = require('../utils/calculateTotal');

const createUser = (name, email) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO Users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result.insertId);
        });
    });
};

const createOrder = (totalAmount, userId, totalQuantity) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO `Order` (amount, user_id, total_quantity) VALUES (?, ?, ?)', [totalAmount, userId, totalQuantity], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result.insertId);
        });
    });
};

const insertOrderItems = (orderId, items) => {
    const insertPromises = items.map(item => {
        return new Promise((resolve, reject) => {
            const table = `Order_${item.category}`;
            db.query(`INSERT INTO ${table} (order_id, ${item.category.toLowerCase()}_id, quantity) VALUES (?, ?, ?)`, [orderId, item.id, item.quantity], (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
    return Promise.all(insertPromises);
};

const placeOrder = (req, res) => {
    const { name, email, items } = req.body;
    const totalAmount = calculateTotal(items);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    db.beginTransaction(async (err) => {
        if (err) return res.status(500).send({ status: "error", error: err.message });

        try {
            const userId = await createUser(name, email);
            const orderId = await createOrder(totalAmount, userId, totalQuantity);
            await insertOrderItems(orderId, items);

            db.commit((err) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).send({ status: "error", error: err.message });
                    });
                }
                res.status(200).send({ status: "success", data: "Order placed successfully" });
            });
        } catch (err) {
            db.rollback(() => {
                res.status(500).send({ status: "error", error: err.message });
            });
        }
    });
};

module.exports = { placeOrder };
