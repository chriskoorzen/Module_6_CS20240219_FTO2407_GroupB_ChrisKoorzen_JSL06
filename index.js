"use strict";       // "Be tolerant with others, and strict with yourself." - Marcus Aurelius


// Sample menu data (Consider fetching this data from a server in a real-world scenario)
const menu = {
    "Starters": [{name: "Garlic Bread", price: 21.50}, {name:" Bruschetta", price: 32}],
    "Main Courses": [{name: "Margherita Pizza", price: 75}, {name: "Spaghetti Carbonara", price: 62}],
    "Desserts": [{name: "Tiramisu", price: 33}, {name: "Cheesecake", price: 42.50}]
};

// Get UI references
const menuOptionsUI = document.getElementById("menu");
const orderUI = document.getElementById("order");
const orderSelectedUI = document.getElementById("order-items");
const orderTotalUI = document.getElementById("order-total");


// Function to display menu items by category
function displayMenuItems(menu) {

    const newMenu = new DocumentFragment();
    
    for (const [category, entries] of Object.entries(menu)){

        let heading = document.createElement("h2");
        heading.innerText = category;
        newMenu.append(heading);

        let options = document.createElement("ul");
        newMenu.append(options);

        for (let entry of entries){
            let item = document.createElement("li");
            item.innerHTML = `<span>${entry.name}</span><span>R ${entry.price.toFixed(2)}</span>`;
            item.setAttribute("data-price", entry.price);

            item.addEventListener("click", addToOrder);

            options.append(item);
        }

    }

    // Prefer "replace" to "append"
    // because in the event this becomes dynamic
    // we'd want to clear previous entries and update with new ones.
    menuOptionsUI.replaceChildren(...newMenu.childNodes);

}

// Callback function for adding an item to the order
function addToOrder(event) {
    event.preventDefault();

    const selection = this.cloneNode(true);
    const name = selection.querySelector("span");
    const removeButton = document.createElement("button");
    removeButton.innerText = "x";

    // Tightly coupled -> we are expecting this to operate on the parent element
    removeButton.addEventListener("click", removeFromOrder);
    
    name.prepend(removeButton);
    orderSelectedUI.append(selection);

}

// Callback function for removing an item from the order
function removeFromOrder(event) {
    event.preventDefault();

    // Tightly coupled -> we are expecting this to operate on the parent element
    event.target.parentElement.parentElement.remove()

}

// Callback function for observing changes to order list
function calculateDueAmount(){

    let total = 0;
    for (let order of orderSelectedUI.children){
        total += Number.parseFloat(order.getAttribute("data-price"));
    }

    orderTotalUI.innerText = total.toFixed(2);
}

// Function to initialize the menu system
function initMenuSystem(menu) {

    orderObserver.observe(orderSelectedUI, { childList: true });

    displayMenuItems(menu);

}

// Start the menu system by calling the init function
const orderObserver = new MutationObserver(calculateDueAmount);
initMenuSystem(menu);
