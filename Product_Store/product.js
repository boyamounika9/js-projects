const products = [

    {
        id: 1,
        name: "Laptop",
        price: 55000,
        category: "Electronics",
        stock: 8
    },

    {
        id: 2,
        name: "Smartphone",
        price: 28000,
        category: "Electronics",
        stock: 15
    },

    {
        id: 3,
        name: "Headphones",
        price: 2500,
        category: "Accessories",
        stock: 25
    },

    {
        id: 4,
        name: "Keyboard",
        price: 1800,
        category: "Accessories",
        stock: 12
    },

    {
        id: 5,
        name: "Office Chair",
        price: 8500,
        category: "Furniture",
        stock: 5
    },

    {
        id: 6,
        name: "Monitor",
        price: 16000,
        category: "Electronics",
        stock: 7
    },

    {
        id: 7,
        name: "Study Table",
        price: 6500,
        category: "Furniture",
        stock: 0
    },

    {
        id: 8,
        name: "USB Cable",
        price: 500,
        category: "Accessories",
        stock: 30
    }

];


// Named export
export function getAllProducts() {

    return products;

}


// Find product by ID
export function findProductById(id) {

    return products.find(function(product) {

        return product.id === id;

    });

}


// Filter by category
export function filterByCategory(category) {

    return products.filter(function(product) {

        return product.category === category;

    });

}


// Filter products below price
export function filterBelowPrice(price) {

    return products.filter(function(product) {

        return product.price <= price;

    });

}


// Default export
export default products;