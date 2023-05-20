import { MongoClient } from "mongodb";
import path from "path";
const fs = require("fs");

export default async (req, res) => {
  const postsDirectory = path.join(process.cwd(), 'constants');
  if (req.method === "GET") {
    
    try {
      const client = new MongoClient(process.env.DATABASE_URL);
      const dbName = "mcqera";
      await client.connect({ useUnifiedTopology: true, useNewUrlParser: true });
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      
      const collection = db.collection("courses");
      const courseObj = await collection.find({}).toArray();// this is course object from databse
      console.log(courseObj)
      
      //logics to save question
      
      const path = `${postsDirectory}/courseObj.json`;
      var writeStream = fs.createWriteStream(`${path}`);
      writeStream.write(`${JSON.stringify(courseObj)}`);
      writeStream.end();


      res.status(200).json(courseObj);
      return res.end();

    } catch (error) {
      console.log(error)
      res.status(200).json([]);
      return res.end();
    }
  };
}
