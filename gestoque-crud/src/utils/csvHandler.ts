import fs from "fs";
import path from "path";

const FILE_PATH = path.join(__dirname, "../../data/estoque.csv");

export class CSVHandler {
  private static ensureFileExists() {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, "id,name,weight,value,quantity\n", "utf8");
    }
  }

  public static readCSV(): string[][] {
    this.ensureFileExists();

    const data = fs.readFileSync(FILE_PATH, "utf8");
    const rows = data
      .split("\n")
      .filter((row) => row.trim())
      .map((row) => row.split(","));

    return rows.slice(1); // Remove o cabeçalho
  }

  public static writeCSV(rows: string[][]): void {
    const header = "id,name,weight,value,quantity\n";
    const content = rows.map((row) => row.join(",")).join("\n");
    fs.writeFileSync(FILE_PATH, header + content, "utf8");
  }

  public static appendRow(row: string[]): void {
    this.ensureFileExists();
    const content = row.join(",") + "\n";
    fs.appendFileSync(FILE_PATH, content, "utf8");
  }
}
