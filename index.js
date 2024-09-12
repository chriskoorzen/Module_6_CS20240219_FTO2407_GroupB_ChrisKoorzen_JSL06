"use strict";       // "Be tolerant with others, and strict with yourself." - Marcus Aurelius


// Sample menu data (Consider fetching this data from a server in a real-world scenario)
const menu = {
    "Starters": [{name: "Garlic Bread", price: 21.50}, {name:"Bruschetta", price: 32}],
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

    const selection = this.cloneNode(true);                 // Make a deep copy of selected item
    const nameTag = selection.querySelector("span");
    const removeButton = document.createElement("span");    // Create and add a "remove button" to order item
    nameTag.prepend(removeButton);

    // Define "remove button" characteristics
    removeButton.innerHTML = "&#11198;&nbsp;&nbsp;";        // circled cross and 2 whitespaces
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener("click", (event) => {
        // Callback function for removing an item from the order
        event.preventDefault();

        // By using arrow functions we can create a closure
        // referencing the correct "selection" every time.
        selection.remove()
    });
    

    orderSelectedUI.append(selection);                      // Add item to Order List
}

// Callback function for observing changes to order list
function calculateDueAmount(){

    let total = 0;
    for (let order of orderSelectedUI.children){
        total += Number.parseFloat(order.getAttribute("data-price"));
    }

    orderTotalUI.innerText = total.toFixed(2);
}


// Set up observer to watch for changes in OrderList
const orderObserver = new MutationObserver(calculateDueAmount);     // Run this function on every change
orderObserver.observe(orderSelectedUI, { childList: true });        // Watch for changes in children list


// Start the menu system by initializing the menu system
displayMenuItems(menu);
