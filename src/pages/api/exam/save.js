// import { mongoConnectExam } from "../../../../lib/mongoConnectExam";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const db = await mongoConnectExam(); // my function to connect with db
//         const collectionName = "exams";
//         const collection = db.collection(collectionName); // creating collection with name of trade

//         const inserted = await collection.insertOne(req.body);
//       console.log(req.body);
//       res.status(200).json({ ok: "yes ok hai" ,inserted});
//       return res.end();
//     } catch (error) {
//       res.status(200).json({ error });
//       res.end();
//     }
//   }
// }



import { mongoConnectExam } from "../../../../lib/mongoConnectExam";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const db = await mongoConnectExam();
      const collection = db.collection("exams");

      // Check if an entry with the same branch and examname already exists
      const existingExam = await collection.findOne({
        branch: req.body.branch,
        examname: req.body.examname,
      });

      if (existingExam) {
        // If found, return a failure response to prevent duplication
        return res.status(200).json({ ok: false, message: "Duplicate entry" });
      }

      // If not found, proceed with the insert
      const inserted = await collection.insertOne(req.body);
      // console.log(req.body);
      return res.status(200).json({ ok: "yes ok hai", inserted });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
