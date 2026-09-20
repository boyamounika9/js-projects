import products from "./products.js";


// Simulated API
export function fetchProducts() {

    return new Promise(function(resolve) {

        setTimeout(function() {

            resolve(products);

        }, 2000);

    });

}


// API that sometimes fails
export function fetchProductsWithError() {

    return new Promise(function(resolve, reject) {

        setTimeout(function() {

            const success = Math.random() > 0.3;

            if (success) {

                resolve(products);

            } else {

                reject("Failed to fetch products from server.");

            }

        }, 2000);

    });

}