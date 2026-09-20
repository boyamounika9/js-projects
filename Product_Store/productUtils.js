import products from "./product.js";


// Calculate total inventory value
export function calculateTotalValue( products) {

    return products.reduce(function(total, product) {

        return total + (product.price * product.stock);

    }, 0);

}


// Find most expensive product
export function findMostExpensive(products) {

    return products.reduce(function(expensive, product) {

        if (product.price > expensive.price) {

            return product;

        }

        return expensive;

    });

}


// Find out of stock products
export function findOutOfStock(products) {

    return products.filter(function(product) {

        return product.stock === 0;

    });

}


// Calculate average price
export function calculateAveragePrice( products) {

    if (products.length === 0) {
        return 0;
    }

    const total = products.reduce(function(sum, product) {

        return sum + product.price;

    }, 0);

    return total / products.length;

}


// Apply discount
export function applyDiscount(productList, discountPercentage) {

    return productList.map(function(product) {

        return {
            ...product,
            discountedPrice:
                product.price -
                (product.price * discountPercentage / 100)
        };

    });

}