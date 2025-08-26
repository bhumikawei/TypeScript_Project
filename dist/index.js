"use strict";
//Select DOM elements
const productList = document.getElementById("product-list");
const cartItemsContainer = document.getElementById("cart-items");
const totalCostElement = document.getElementById("total-cost");
const checkoutButton = document.getElementById("checkout");
//Cart array to store items
let cart = [];
loadCartFromLocalStorage();
//add a product to the cart
function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    }
    else {
        const newItem = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        };
        cart.push(newItem);
    }
    saveCartToLocalStorage();
    renderCart();
}
//attach event listener to add to cart buttons
productList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("add-to-cart")) {
        const product = target.parentElement;
        const productId = product.getAttribute("data-id");
        const productName = product.getAttribute("data-name");
        const productPrice = parseFloat(product.getAttribute("data-price"));
        addToCart(productId, productName, productPrice);
    }
});
//Render the cart in the HTML
function renderCart() {
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.className = "cart-item";
        cartItemElement.innerHTML = `
        <p>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
        <input type="number" class="quantity" data-id="${item.id}" value="${item.quantity}" min="1">
        <button class="remove" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    updateToTotalCost();
}
//update the local cost display
function updateToTotalCost() {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalCostElement.innerText = `Total: $${total.toFixed(2)}`;
}
//remove an item from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    renderCart();
}
//update item quantity in the cart
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCartToLocalStorage();
        renderCart();
    }
}
//Event delegation for remove and quantity input events
cartItemsContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("remove")) {
        const productId = target.getAttribute("data-id");
        removeFromCart(productId);
    }
});
cartItemsContainer.addEventListener("change", (event) => {
    const target = event.target;
    if (target.classList.contains("quantity")) {
        const productId = target.getAttribute("data-id");
        const quantity = parseInt(target.value);
        if (quantity > 0) {
            updateQuantity(productId, quantity);
        }
    }
});
//save the cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
//load cart from loal storage if it exists
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("shoppingCart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart();
    }
}
//load the cart from local storage
checkoutButton.addEventListener("click", () => {
    window.location.href = "checkout.html";
});
