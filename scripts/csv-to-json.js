// scripts/csv-to-json.js
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

const inputFile = "./teleton.csv";
const outputFile = "./src/data/teleton.json";

const records = [];

fs.createReadStream(inputFile)
  .pipe(parse({ columns: true, skip_empty_lines: true }))
  .on("data", (row) => {
    // Normaliza números
    const num = (val) =>
      val && val.trim() !== ""
        ? Number(val.replace(/\./g, "").replace(",", "."))
        : undefined;

    records.push({
      id: num(row.id),
      year: num(row.year),
      dates: row.dates,
      motto: row.motto,
      ambassador: row.ambassador,
      goal_clp: num(row.goal_clp),
      last_on_air_clp: num(row.last_on_air_clp),
      last_on_air_pct: num(row.last_on_air_pct),
      audited_total_clp: num(row.audited_total_clp),
      value_current_clp: num(row.value_current_clp),
      value_current_usd: num(row.value_current_usd),
      notes: row.notes || undefined,
    });
  })
  .on("end", () => {
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify(records, null, 2));
    console.log(`✅ Archivo JSON generado en ${outputFile}`);
  });
