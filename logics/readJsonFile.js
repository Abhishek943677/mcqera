import { promises as fs } from "fs";
import path from "path";

export default async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
  } catch (error) {
    res.json({error})
    res.end()
  }
}
