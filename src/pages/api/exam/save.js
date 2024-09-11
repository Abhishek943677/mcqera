import { mongoConnectExam } from "../../../../lib/mongoConnectExam";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const db = await mongoConnectExam(); // my function to connect with db
        const collectionName = "exams";
        const collection = db.collection(collectionName); // creating collection with name of trade

        const inserted = await collection.insertOne(req.body);
      console.log(req.body);
      res.status(200).json({ ok: "yes ok hai" ,inserted});
      return res.end();
    } catch (error) {
      res.status(200).json({ error });
      res.end();
    }
  }
}
