import { InventoryItem } from "../models/inventoryItem";
import fs from "fs";
import path from "path";

const FILE_PATH = path.join(__dirname, "../../data/inventory.csv");

export class InventoryService {
  private ensureFileExists() {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, "id,name,weight,value,quantity\n", "utf8");
    }
  }

  public addItem(item: InventoryItem): boolean {
    this.ensureFileExists();
    const items = this.getAllItems();

    if (items.find((i) => i.id === item.id)) {
      console.error("Item with this ID already exists.");
      return false;
    }

    const row = `${item.id},${item.name},${item.weight},${item.value},${item.quantity}\n`;
    fs.appendFileSync(FILE_PATH, row, "utf8");
    return true;
  }

  public getAllItems(): InventoryItem[] {
    this.ensureFileExists();
    const data = fs.readFileSync(FILE_PATH, "utf8");
    const rows = data.split("\n").slice(1).filter((row) => row.trim());

    return rows.map((row) => {
      const [id, name, weight, value, quantity] = row.split(",");
      return {
        id,
        name,
        weight: parseFloat(weight),
        value: parseFloat(value),
        quantity: parseInt(quantity, 10),
      };
    });
  }

  public removeItem(id: string): boolean {
    const items = this.getAllItems();
    const filteredItems = items.filter((item) => item.id !== id);

    if (items.length === filteredItems.length) {
      console.error("Item not found.");
      return false;
    }

    const header = "id,name,weight,value,quantity\n";
    const content = header +
      filteredItems.map((item) => `${item.id},${item.name},${item.weight},${item.value},${item.quantity}`).join("\n");
    fs.writeFileSync(FILE_PATH, content, "utf8");
    return true;
  }
}