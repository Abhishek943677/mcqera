import { promises as fs } from "fs";
import path from "path";

export default async function getContent({context}) {
  const postsDirectory = path.join(process.cwd(),`content/${context.params.route[0]}`);
  const filePath = path.join(postsDirectory, `${context.params.route[1]}.json`);
  const fileContents = await fs.readFile(filePath, "utf8");
  const parsedFileContent = JSON.parse(fileContents);
  return {parsedFileContent};
}
