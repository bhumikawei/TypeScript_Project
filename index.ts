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