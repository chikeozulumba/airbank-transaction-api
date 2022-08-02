import * as fs from "fs";
import { parse } from "fast-csv";
import { ICSVToArray } from "@types";

export function csvToArray<K extends keyof ICSVToArray>(
  path: string
): Promise<ICSVToArray[K]> {
  return new Promise((resolve, reject) => {
    try {
      const data = [];
      fs.createReadStream(path)
        .pipe(parse({ headers: true }))
        .on("error", (error) => {
          throw error;
        })
        .on("data", (row) => data.push(row))
        .on("end", () => resolve(data));
    } catch (error) {
      reject(error);
    }
  });
}
