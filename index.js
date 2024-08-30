"use strict";       // "Be tolerant with others, and strict with yourself." - Marcus Aurelius


// Sample menu data (Consider fetching this data from a server in a real-world scenario)
const menu = {
    Starters: ["Garlic Bread", "Bruschetta"],
    MainCourses: ["Margherita Pizza", "Spaghetti Carbonara"],
    Desserts: ["Tiramisu", "Cheesecake"]
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
            item.innerText = entry;
            options.append(item);
        }

    }

    // Prefer "replace" to "append"
    // because in the event this becomes dynamic
    // we'd want to clear previous entries and update with new ones.
    menuOptionsUI.replaceChildren(...newMenu.childNodes);

}

// Callback function for adding an item to the order
function addToOrder(itemName) {
    // Get the order items list and the order total element from the HTML

    // Create a list item for the order

    // Set the text content of the list item to the item name

    // Append the list item to the order items list

    // Calculate and update the total price

    // Update the text content of the order total element with the new total
}

// Function to initialize the menu system
function initMenuSystem(menu) {

    displayMenuItems(menu);
    
}

// Start the menu system by calling the init function
initMenuSystem(menu);
