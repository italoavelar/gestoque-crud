import { InventoryService } from "../services/inventoryService";
import { InventoryItem } from "../models/inventoryItem";

const inventoryService = new InventoryService();

export class InventoryController {
  public addItem(item: InventoryItem): void {
    const success = inventoryService.addItem(item);
    if (success) {
      console.log("Item added successfully.");
    } else {
      console.error("Failed to add item.");
    }
  }

  public listItems(): void {
    const items = inventoryService.getAllItems();
    console.table(items);
  }

  public removeItem(id: string): void {
    const success = inventoryService.removeItem(id);
    if (success) {
      console.log("Item removed successfully.");
    } else {
      console.error("Failed to remove item.");
    }
  }
}