// Search products by name

export function searchProducts(products, searchText) {

    return products.filter(function(product) {

        return product.name
            .toLowerCase()
            .includes(searchText.toLowerCase());

    });

}


// Filter by category

export function filterByCategory(products, category) {

    if (category === "all") {

        return products;

    }


    return products.filter(function(product) {

        return product.category === category;

    });

}


// Filter by price range

export function filterByPrice(products, minPrice, maxPrice) {

    return products.filter(function(product) {

        return product.price >= minPrice &&
               product.price <= maxPrice;

    });

}


// Filter by rating

export function filterByRating(products, rating) {

    if (rating === "all") {

        return products;

    }


    return products.filter(function(product) {

        return product.rating >= Number(rating);

    });

}


// Sort products

export function sortProducts(products, sortType) {

    const sortedProducts = [...products];


    if (sortType === "low") {

        return sortedProducts.sort(function(a, b) {

            return a.price - b.price;

        });

    }


    if (sortType === "high") {

        return sortedProducts.sort(function(a, b) {

            return b.price - a.price;

        });

    }


    if (sortType === "rating") {

        return sortedProducts.sort(function(a, b) {

            return b.rating - a.rating;

        });

    }


    return sortedProducts;

}


// Total products

export function totalProducts(products) {

    return products.length;

}


// Average price

export function averagePrice(products) {

    if (products.length === 0) {

        return 0;

    }


    const total = products.reduce(function(sum, product) {

        return sum + product.price;

    }, 0);


    return total / products.length;

}


// Highest price

export function highestPrice(products) {

    if (products.length === 0) {

        return 0;

    }


    return products.reduce(function(highest, product) {

        if (product.price > highest) {

            return product.price;

        }

        return highest;

    }, products[0].price);

}


// Lowest price

export function lowestPrice(products) {

    if (products.length === 0) {

        return 0;

    }


    return products.reduce(function(lowest, product) {

        if (product.price < lowest) {

            return product.price;

        }

        return lowest;

    }, products[0].price);

}