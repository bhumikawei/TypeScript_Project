//select DOM elements
const checkoutItemsContainer = document.getElementById("checkout-items") as HTMLElement;
const finalTotalCostElement = document.getElementById("final-total-cost") as HTMLElement;
const confirmPurchaseButton = document.getElementById("confirm-purchase") as HTMLElement;

// Load cart from local storage
let cartCheckout: CartItem[] = JSON.parse(localStorage.getItem("shoppingCart") || "[]");

// Render cart items on the checkout page
function renderCheckoutItems(): void {
    checkoutItemsContainer.innerHTML = "";

    cartCheckout.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <p>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        checkoutItemsContainer.appendChild(itemElement);
    });

    updateFinalTotalCost();
}

// Calculate and display the final total cost
function updateFinalTotalCost(): void {
    const total = cartCheckout.reduce((acc, item) => acc + item.price * item.quantity, 0);
    finalTotalCostElement.innerText = `Total: $${total.toFixed(2)}`;
}

// Clear the cart upon confirming the purchase
confirmPurchaseButton.addEventListener("click", () => {
    alert("Thank you for your purchase!");
    localStorage.removeItem("shoppingCart"); // Clear the cart in local storage
    cartCheckout = []; // Clear the cart array
    renderCheckoutItems(); // Re-render to clear displayed items
    updateFinalTotalCost(); // Reset the total cost display
});

// Initial render of checkout items
renderCheckoutItems();