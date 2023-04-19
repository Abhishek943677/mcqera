import { promises as fs } from "fs";
import path from "path";

export default async function createAndwriteJsonFile (path,data){
    var writeStream =await fs.createWriteStream(path);
    writeStream.write(`[${JSON.stringify(data)}]`);
    writeStream.end();
}