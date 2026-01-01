// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", () => {

    // ================= CART (FIXED TYPE) =================
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!Array.isArray(cart)) {
        cart = [];
    }

    // ================= PRODUCTS =================
    const products = [
        { id: 1, name: "Laptop", price: 50000, image:"images/laptop.jpg",
        rating: 4 },
        { id: 2, name: "Headphones", price: 2000, image: "images/headphones.jpg",
        rating: 5},
        { id: 3, name: "Mobile", price: 30000, image: "images/smartphone.jpg",
        rating: 4}
    ];

    // ================= PRODUCT CONTAINER =================
    const productContainer = document.getElementById("products");
    if (!productContainer) {
        console.error("❌ Missing <div id='products'> in HTML");
        return;
    }

    // ================= DISPLAY PRODUCTS =================
function displayProducts(filteredProducts = products) {
    productContainer.innerHTML = "";

    filteredProducts.forEach(product => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>₹${product.price}</p>
            <div class="rating">
                ${"⭐".repeat(product.rating)}
            </div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productContainer.appendChild(div);
    });
}

displayProducts();
//=====SEARCH=====//
document.getElementById("search").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    displayProducts(filtered);
});


    // ================= CART CONTAINER =================
    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("total-price");

    if (!cartContainer || !totalElement) {
        console.error("❌ Missing cart-items or total-price ID in HTML");
        return;
    }

    // ================= ADD TO CART =================
    window.addToCart = function (id) {
        const item = cart.find(p => p.id === id);
        if (item) {
            item.quantity += 1;
        } else {
            const product = products.find(p => p.id === id);
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    };

    // ================= QUANTITY CONTROLS =================
    window.increaseqty = function (id) {
        const item = cart.find(p => p.id === id);
        if (item) {
            item.quantity++;
            updateCart();
        }
    };

    window.decreaseqty = function (id) {
        const item = cart.find(p => p.id === id);
        if (item) {
            item.quantity--;
            if (item.quantity === 0) {
                cart = cart.filter(p => p.id !== id);
            }
            updateCart();
        }
    };

    // ================= UPDATE CART =================
 

    function updateCart() {
        cartContainer.innerHTML = "";
        cart.forEach(item => {
            const div = document.createElement("div");
            div.innerHTML = `
                <strong>${item.name}</strong><br>
                ₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}
                <br>
                <button onclick="decreaseqty(${item.id})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseqty(${item.id})">+</button>
            `;
            cartContainer.appendChild(div);
        });
        updateTotal();
           function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-badge").innerText = totalItems;
};
    updateCartBadge();
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // ================= TOTAL =================
    function updateTotal() {
        const total = cart.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);
        totalElement.innerText = total;
    }

    updateCart();
});
