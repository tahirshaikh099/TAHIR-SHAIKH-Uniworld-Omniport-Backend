const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price, 0);
};

module.exports = calculateTotal;