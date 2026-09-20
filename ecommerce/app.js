import {
    getProducts,
    placeOrder
} from "./services/api.js";


import {
    searchProducts,
    filterByCategory,
    filterByPrice,
    filterByRating,
    sortProducts,

    totalProducts,
    averagePrice,
    highestPrice,
    lowestPrice,

    getCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateCartTotal,
    clearCart
} from "./modules/index.js";


// DOM elements

const productContainer =
    document.getElementById("productContainer");

const loading =
    document.getElementById("loading");

const message =
    document.getElementById("message");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const minPrice =
    document.getElementById("minPrice");

const maxPrice =
    document.getElementById("maxPrice");

const ratingFilter =
    document.getElementById("ratingFilter");

const sortFilter =
    document.getElementById("sortFilter");

const cartContainer =
    document.getElementById("cartContainer");

const cartTotal =
    document.getElementById("cartTotal");

const placeOrderBtn =
    document.getElementById("placeOrderBtn");


// Statistics

const totalProductsElement =
    document.getElementById("totalProducts");

const averagePriceElement =
    document.getElementById("averagePrice");

const highestPriceElement =
    document.getElementById("highestPrice");

const lowestPriceElement =
    document.getElementById("lowestPrice");


// Store products

let products = [];


// Current displayed products

let displayedProducts = [];


// ----------------------------------
// Display products
// ----------------------------------

function displayProducts(productList) {

    productContainer.innerHTML = "";


    if (productList.length === 0) {

        productContainer.innerHTML = `
            <p class="empty">
                No products found.
            </p>
        `;

        return;

    }


    productList.forEach(function(product) {

        const card =
            document.createElement("div");


        card.className = "product-card";


        card.innerHTML = `

            <h3>${product.name}</h3>

            <p>
                ID: ${product.id}
            </p>

            <p>
                Category: ${product.category}
            </p>

            <p class="price">
                ₹${product.price.toLocaleString()}
            </p>

            <p>
                Rating: ⭐ ${product.rating}
            </p>

            <p>
                Stock: ${product.stock}
            </p>

            <button
                class="add-button"
                data-id="${product.id}"
            >
                Add to Cart
            </button>

        `;


        productContainer.appendChild(card);

    });


    // Add button events

    const addButtons =
        document.querySelectorAll(".add-button");


    addButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const id =
                Number(button.dataset.id);


            const product =
                products.find(function(product) {

                    return product.id === id;

                });


            const result =
                addToCart(product);


            message.textContent =
                result.message;


            displayCart();

        });

    });

}


// ----------------------------------
// Display cart
// ----------------------------------

function displayCart() {

    const cart =
        getCart();


    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p>
                Cart is empty.
            </p>
        `;

        cartTotal.textContent = "₹0";

        return;

    }


    cart.forEach(function(item) {

        const product =
            products.find(function(product) {

                return product.id === item.productId;

            });


        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <strong>
                    ${product.name}
                </strong>

                <p>
                    ₹${product.price.toLocaleString()}
                    × ${item.quantity}
                </p>

            </div>


            <div>

                <button
                    class="increase"
                    data-id="${product.id}"
                >
                    +
                </button>

                <button
                    class="decrease"
                    data-id="${product.id}"
                >
                    -
                </button>

                <button
                    class="remove"
                    data-id="${product.id}"
                >
                    Remove
                </button>

            </div>

        `;


        cartContainer.appendChild(cartItem);

    });


    cartTotal.textContent =
        "₹" +
        calculateCartTotal(products)
            .toLocaleString();


    // Increase

    document
        .querySelectorAll(".increase")
        .forEach(function(button) {

            button.addEventListener("click", function() {

                const id =
                    Number(button.dataset.id);


                const product =
                    products.find(function(product) {

                        return product.id === id;

                    });


                const result =
                    increaseQuantity(product);


                message.textContent =
                    result.message;


                displayCart();

            });

        });


    // Decrease

    document
        .querySelectorAll(".decrease")
        .forEach(function(button) {

            button.addEventListener("click", function() {

                const id =
                    Number(button.dataset.id);


                decreaseQuantity(id);

                displayCart();

            });

        });


    // Remove

    document
        .querySelectorAll(".remove")
        .forEach(function(button) {

            button.addEventListener("click", function() {

                const id =
                    Number(button.dataset.id);


                removeFromCart(id);

                displayCart();

            });

        });

}


// ----------------------------------
// Apply filters
// ----------------------------------

function applyFilters() {

    let result = [...products];


    // Search

    const searchText =
        searchInput.value.trim();


    if (searchText !== "") {

        result =
            searchProducts(result, searchText);

    }


    // Category

    result =
        filterByCategory(
            result,
            categoryFilter.value
        );


    // Price

    const min =
        Number(minPrice.value) || 0;


    const max =
        Number(maxPrice.value) || Infinity;


    result =
        filterByPrice(
            result,
            min,
            max
        );


    // Rating

    result =
        filterByRating(
            result,
            ratingFilter.value
        );


    // Sort

    result =
        sortProducts(
            result,
            sortFilter.value
        );


    displayedProducts = result;


    displayProducts(result);

}


// ----------------------------------
// Statistics
// ----------------------------------

function displayStatistics() {

    totalProductsElement.textContent =
        totalProducts(products);


    averagePriceElement.textContent =
        "₹" +
        Math.round(
            averagePrice(products)
        ).toLocaleString();


    highestPriceElement.textContent =
        "₹" +
        highestPrice(products)
            .toLocaleString();


    lowestPriceElement.textContent =
        "₹" +
        lowestPrice(products)
            .toLocaleString();

}


// ----------------------------------
// Load products
// ----------------------------------

async function loadProducts() {

    loading.style.display = "block";


    try {

        products =
            await getProducts();


        displayedProducts =
            products;


        displayProducts(products);

        displayStatistics();

        displayCart();


    } catch (error) {

        message.textContent =
            error;

    } finally {

        loading.style.display = "none";

    }

}


// ----------------------------------
// Filter events
// ----------------------------------

searchInput.addEventListener(
    "input",
    applyFilters
);


categoryFilter.addEventListener(
    "change",
    applyFilters
);


minPrice.addEventListener(
    "input",
    applyFilters
);


maxPrice.addEventListener(
    "input",
    applyFilters
);


ratingFilter.addEventListener(
    "change",
    applyFilters
);


sortFilter.addEventListener(
    "change",
    applyFilters
);


// ----------------------------------
// Place order
// ----------------------------------

placeOrderBtn.addEventListener(
    "click",
    async function() {

        const cart =
            getCart();


        if (cart.length === 0) {

            message.textContent =
                "Cart is empty.";

            return;

        }


        placeOrderBtn.disabled = true;

        message.textContent =
            "Placing order...";


        try {

            const result =
                await placeOrder(cart);


            message.textContent =
                result;


            clearCart();

            displayCart();


        } catch (error) {

            message.textContent =
                error;

        } finally {

            placeOrderBtn.disabled = false;

        }

    }
);


// Start

loadProducts();