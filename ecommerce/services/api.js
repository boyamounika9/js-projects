import products from "../data/products.js";


// Get all products
export function getProducts() {

    return new Promise(function(resolve) {

        setTimeout(function() {

            resolve(products);

        }, 2000);

    });

}


// Get product by ID
export function getProductById(id) {

    return new Promise(function(resolve, reject) {

        setTimeout(function() {

            const product = products.find(function(product) {

                return product.id === id;

            });


            if (product) {

                resolve(product);

            } else {

                reject("Product not found");

            }

        }, 1000);

    });

}


// Place order
export function placeOrder(cart) {

    return new Promise(function(resolve, reject) {

        setTimeout(function() {

            const success = Math.random() > 0.5;


            if (success) {

                resolve("Order placed successfully!");

            } else {

                reject("Order failed. Please try again.");

            }

        }, 2000);

    });

}