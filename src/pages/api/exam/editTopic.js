import { ObjectId } from "mongodb";
import { mongoConnectExam } from "../../../../lib/mongoConnectExam";

export default async function handler(req, res) {

  // this is for getting data of specific post data
  if (req.method === "GET") {
    try {
      const db = await mongoConnectExam(); // my function to connect with db
      console.log(req.query);
      const collection = db.collection("exams"); // creating collection with name of trade

      const topicData = await collection
        .find({ _id: new ObjectId(req.query.id) })
        .toArray();

      res.status(200).json({ ok: "yes ok hai", examData: topicData[0] });
      return res.end();
      
    } catch (error) {
      console.log(error);
      res.status(200).json({ error });
      res.end();
    }
  }


  // this is post request for update the topicData
  if (req.method === "POST") {
    try {
      const db = await mongoConnectExam(); // my function to connect with db
      console.log(req.body);
      const collection = db.collection("exams"); // creating collection with name of trade

      const updated = await collection.updateOne(
        { _id: new ObjectId(req.body.id) },
        {
          $set: {
            branch: req.body.branch,
            examname: req.body.examname,
            notification: req.body.notification,
            updates: req.body.updates,
            syllabus: req.body.syllabus,
          },
        }
      );

      res.status(200).json({ ok: "yes ok hai", updated});
      return res.end();
    } catch (error) {
      res.status(200).json({ error });
      res.end();
    }
  }
}
