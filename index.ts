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