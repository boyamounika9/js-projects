let cart = [];


// Get cart

export function getCart() {

    return cart;

}


// Add product

export function addToCart(product) {

    const existingItem =
        cart.find(function(item) {

            return item.productId === product.id;

        });


    if (existingItem) {

        if (existingItem.quantity < product.stock) {

            existingItem.quantity++;

            return {
                success: true,
                message: "Quantity increased"
            };

        } else {

            return {
                success: false,
                message: "Cannot add more. Stock limit reached."
            };

        }

    }


    cart.push({

        productId: product.id,

        quantity: 1

    });


    return {
        success: true,
        message: "Product added to cart"
    };

}


// Remove product

export function removeFromCart(productId) {

    cart = cart.filter(function(item) {

        return item.productId !== productId;

    });

}


// Increase quantity

export function increaseQuantity(product) {

    const item =
        cart.find(function(item) {

            return item.productId === product.id;

        });


    if (!item) {

        return {
            success: false,
            message: "Product not in cart"
        };

    }


    if (item.quantity >= product.stock) {

        return {
            success: false,
            message: "Stock limit reached"
        };

    }


    item.quantity++;


    return {
        success: true,
        message: "Quantity increased"
    };

}


// Decrease quantity

export function decreaseQuantity(productId) {

    const item =
        cart.find(function(item) {

            return item.productId === productId;

        });


    if (!item) {

        return;

    }


    item.quantity--;


    if (item.quantity <= 0) {

        removeFromCart(productId);

    }

}


// Calculate total

export function calculateCartTotal(products) {

    return cart.reduce(function(total, item) {

        const product =
            products.find(function(product) {

                return product.id === item.productId;

            });


        if (product) {

            return total +
                (product.price * item.quantity);

        }


        return total;

    }, 0);

}


// Clear cart

export function clearCart() {

    cart = [];

}