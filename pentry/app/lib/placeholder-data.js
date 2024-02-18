const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@nextmail.com',
        password: '123456',
    },
];

const items = [
    {
        name: "Milk",
        quantity: 1,
        expirationDate: "2021-05-01",
        gtin: "123456789012",
        brand: "Milk Brand",
        category: "Dairy",
        image: "https://www.milk.com/milk.jpg",
        userId: users[0].id,
    },
    {
        name: "Eggs",
        quantity: 1,
        expirationDate: "2021-05-01",
        gtin: "123456789012",
        brand: "Eggs Brand",
        category: "Dairy",
        image: "https://www.eggs.com/eggs.jpg",
        userId: users[0].id,
    },
]
module.exports = {
    users,
    items,
};