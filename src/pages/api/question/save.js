import {mongoConnect} from "../../../../lib/mongoConnect"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const db = await mongoConnect(); // my function to connect with db
  
      const collection = db.collection(req.body.trade); // creating collection with name of trade
  
      const inserted =await collection.insertOne(req.body)
  
      res.status(200).json({ok:"yes ok hai",inserted});
      return res.end();
      
    } catch (error) {
      res.status(200).json({error});
      res.end();
    }
  }
};


