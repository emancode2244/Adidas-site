let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= CART COUNT ================= */

function updateCartCount() {
    let count = document.getElementById("cart-count");
    if (count) {
        count.innerText = cart.length;
    }
}

updateCartCount();

/* ================= ADD TO CART ================= */

document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation();

        let card = button.closest(".card");

        let product = {
            name: card.dataset.name,
            price: Number(card.dataset.price), // مهم جداً
            image: card.dataset.image
        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();
    });
});

/* ================= CART PAGE ================= */

let cartItems = document.getElementById("cart-items");

if (cartItems) {
    renderCart();
}

function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        let price = Number(item.price); // حماية من NaN

        if (isNaN(price)) price = 0;

        total += price;

        cartItems.innerHTML += `
            <div class="card">
                <img src="${item.image}" width="180">
                <h3>${item.name}</h3>
                <p>$${price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    let totalPrice = document.getElementById("total-price");

    if (totalPrice) {
        totalPrice.innerText = "Total: $" + total;
    }

    let checkoutBox = document.querySelector(".checkout-box");

    if (checkoutBox) {
        checkoutBox.style.display = cart.length > 0 ? "flex" : "none";
    }

    updateCartCount();
}

/* ================= REMOVE ITEM ================= */

function removeItem(index) {
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
    updateCartCount();
}

/* ================= SEARCH ================= */

let searchInput = document.getElementById("search");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        let searchValue = searchInput.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {

            let name = (card.dataset.name || "").toLowerCase();

            card.style.display = name.includes(searchValue)
                ? "block"
                : "none";
        });
    });
}

/* ================= GO TO PRODUCT ================= */

function goToProduct(product) {

    let name = encodeURIComponent(product.dataset.name);
    let price = encodeURIComponent(product.dataset.price);
    let image = encodeURIComponent(product.dataset.image);

    window.location.href =
        `product.html?name=${name}&price=${price}&image=${image}`;
}