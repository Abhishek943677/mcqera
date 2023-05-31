import { ObjectId } from "mongodb";
import { mongoConnect } from "../../../../lib/mongoConnect"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await mongoConnect(); // my function to connect with db
      console.log(req.query);
      const collection = db.collection(req.query.trade); // creating collection with name of trade

      const singleQuestion = await collection.find({ _id: new ObjectId(req.query.id) }).toArray()
      
      res.status(200).json({ ok: "yes ok hai", singleQuestion :singleQuestion[0].que });
      return res.end();

    } catch (error) {
      console.log(error);
      res.status(200).json({ error });
      res.end();
    }
  }




  if (req.method === "POST") {
    try {
      const db = await mongoConnect(); // my function to connect with db
      console.log(req.body);
      const collection = db.collection(req.body.trade); // creating collection with name of trade

      const updated = await collection.updateOne({ _id: new ObjectId(req.body.id)},{$set:{que: req.body.que,trade:req.body.trade,subject:req.body.subject}})
      
      res.status(200).json({ ok: "yes ok hai", updated});
      return res.end();

    } catch (error) {
      console.log(error);
      res.status(200).json({ error });
      res.end();
    }
  }
};


