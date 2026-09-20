import {
    findProductById,
    filterByCategory,
    filterBelowPrice
} from "./product.js";


import {
    calculateTotalValue,
    findMostExpensive,
    findOutOfStock,
    calculateAveragePrice,
    applyDiscount
} from "./productUtils.js";


import {
    fetchProducts
} from "./api.js";


// DOM elements

const productContainer =
    document.getElementById("productContainer");

const loading =
    document.getElementById("loading");

const errorMessage =
    document.getElementById("errorMessage");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const priceInput =
    document.getElementById("priceInput");

const idInput =
    document.getElementById("idInput");

const searchBtn =
    document.getElementById("searchBtn");

const categoryBtn =
    document.getElementById("categoryBtn");

const priceBtn =
    document.getElementById("priceBtn");

const idBtn =
    document.getElementById("idBtn");

const resetBtn =
    document.getElementById("resetBtn");


// Statistics

const totalValue =
    document.getElementById("totalValue");

const averagePrice =
    document.getElementById("averagePrice");

const expensiveProduct =
    document.getElementById("expensiveProduct");

const outOfStock =
    document.getElementById("outOfStock");


// Store loaded products

let allProducts = [];



// Display Products

function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {

        productContainer.innerHTML = `
            <div class="empty">
                No products found.
            </div>
        `;

        return;
    }


    productList.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className = "product-card";


        let stockStatus = "";

        if (product.stock === 0) {

            stockStatus = `
                <span class="out">
                    Out of Stock
                </span>
            `;

        } else {

            stockStatus = `
                <span class="available">
                    ${product.stock} Available
                </span>
            `;

        }


        card.innerHTML = `

            <div class="product-top">

                <span class="product-id">
                    #${product.id}
                </span>

                <span class="category">
                    ${product.category}
                </span>

            </div>


            <h2>
                ${product.name}
            </h2>


            <p class="price">
                ₹${product.price.toLocaleString()}
            </p>


            <p>
                ${stockStatus}
            </p>


            <p class="stock">
                Stock: ${product.stock}
            </p>

        `;


        productContainer.appendChild(card);

    });

}


// Update statistics

function updateStatistics(productsList) {

    totalValue.textContent =
        "₹" +
        calculateTotalValue(productsList)
            .toLocaleString();


    averagePrice.textContent =
        "₹" +
        Math.round(
            calculateAveragePrice(productsList)
        ).toLocaleString();


    const expensive =
        findMostExpensive(productsList);


    if (expensive) {

        expensiveProduct.textContent =
            expensive.name;

    } else {

        expensiveProduct.textContent = "-";

    }


    const outProducts =
        findOutOfStock(productsList);


    outOfStock.textContent =
        outProducts.length;

}



// Load Products

async function loadProducts() {

    loading.style.display = "block";

    errorMessage.textContent = "";

    productContainer.innerHTML = "";


    try {

        const products =
            await fetchProducts();


        allProducts = products;


        displayProducts(allProducts);

        updateStatistics(allProducts);


    } catch (error) {

        errorMessage.textContent =
            error;

    } finally {

        loading.style.display = "none";

    }

}


 
// Search by name 

searchBtn.addEventListener("click", function() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const result =
        allProducts.filter(function(product) {

            return product.name
                .toLowerCase()
                .includes(searchText);

        });


    displayProducts(result);

});


// Filter category
categoryBtn.addEventListener("click", function() {

    const category =
        categoryFilter.value;


    if (category === "all") {

        displayProducts(allProducts);

        return;

    }


    const result =
        filterByCategory(category);


    displayProducts(result);

});


// Filter price

priceBtn.addEventListener("click", function() {

    const price =
        Number(priceInput.value);


    if (!price) {

        displayProducts(allProducts);

        return;

    }


    const result =
        filterBelowPrice(price);


    displayProducts(result);

});


// Find product by ID

idBtn.addEventListener("click", function() {

    const id =
        Number(idInput.value);


    const product =
        findProductById(id);


    if (product) {

        displayProducts([product]);

    } else {

        productContainer.innerHTML = `
            <div class="empty">
                Product with ID ${id} not found.
            </div>
        `;

    }

});


// Reset

resetBtn.addEventListener("click", function() {

    searchInput.value = "";

    categoryFilter.value = "all";

    priceInput.value = "";

    idInput.value = "";

    displayProducts(allProducts);

});


// Discount example

const discountedProducts =
    applyDiscount(allProducts, 10);


// Start application

loadProducts();