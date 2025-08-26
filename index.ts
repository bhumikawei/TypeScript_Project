//Typescript type for a cart item
type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

//Select DOM elements
const productList = document.getElementById("product-list") as HTMLElement;
const cartItemsContainer = document.getElementById("cart-items") as HTMLElement;
const totalCostElement = document.getElementById("total-cost") as HTMLElement;
const checkoutButton = document.getElementById("checkout") as HTMLElement;

//Cart array to store items
let cart: CartItem[] = [];

loadCartFromLocalStorage();
//add a product to the cart
function addToCart(productId: string, productName: string, productPrice: number): void {
    const existingItem = cart.find(item => item.id === productId);

    if(existingItem) {
        existingItem.quantity++;
    } else {
        const newItem: CartItem = {
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
    const target = event.target as HTMLElement;
    if(target.classList.contains("add-to-cart")) {
        const product = target.parentElement as HTMLElement;
        const productId = product.getAttribute("data-id")!;
        const productName = product.getAttribute("data-name")!;
        const productPrice = parseFloat(product.getAttribute("data-price")!);

        addToCart(productId, productName, productPrice);
    }
});

//Render the cart in the HTML
function renderCart(): void {
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