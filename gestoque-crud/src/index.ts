import { InventoryController } from "./controllers/inventoryController";
import readline from "readline-sync";

const controller = new InventoryController();

function mainMenu() {
  while (true) {
    console.log("\nInventory Management System");
    console.log("1. Add Item");
    console.log("2. List Items");
    console.log("3. Remove Item");
    console.log("0. Exit");

    const choice = readline.questionInt("Choose an option: ");
    switch (choice) {
      case 1:
        const id = readline.question("Enter ID: ");
        const name = readline.question("Enter Name: ");
        const weight = readline.questionFloat("Enter Weight (kg): ");
        const value = readline.questionFloat("Enter Value: ");
        const quantity = readline.questionInt("Enter Quantity: ");

        controller.addItem({ id, name, weight, value, quantity });
        break;
      case 2:
        controller.listItems();
        break;
      case 3:
        const removeId = readline.question("Enter ID to remove: ");
        controller.removeItem(removeId);
        break;
      case 0:
        console.log("Goodbye!");
        return;
      default:
        console.error("Invalid option. Try again.");
    }
  }
}

mainMenu();