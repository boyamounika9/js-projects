import products from "./products.js";


// Calculate total inventory value
export function calculateTotalValue(productList = products) {

    return productList.reduce(function(total, product) {

        return total + (product.price * product.stock);

    }, 0);

}


// Find most expensive product
export function findMostExpensive(productList = products) {

    return productList.reduce(function(expensive, product) {

        if (product.price > expensive.price) {

            return product;

        }

        return expensive;

    });

}


// Find out of stock products
export function findOutOfStock(productList = products) {

    return productList.filter(function(product) {

        return product.stock === 0;

    });

}


// Calculate average price
export function calculateAveragePrice(productList = products) {

    if (productList.length === 0) {
        return 0;
    }

    const total = productList.reduce(function(sum, product) {

        return sum + product.price;

    }, 0);

    return total / productList.length;

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