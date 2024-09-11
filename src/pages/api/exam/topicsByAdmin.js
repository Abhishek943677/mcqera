import { ObjectId } from "mongodb";
import { mongoConnectExam } from "../../../../lib/mongoConnectExam";

export default async function handler(req, res) {

    if (req.method === "POST") {
        try {
            const db = await mongoConnectExam(); // my function to connect with db

            // console.log(req.body)
            const collection = await db.collection("exams"); // creating collection with name of trade
            const list = await collection.find({author: req.body.author}).toArray()

            res.status(200).json({ ok: "yes ok hai", list});
            return res.end();

        } catch (error) {
            // console.log(error)
            res.status(200).json({ error });
            res.end();
        }
    }
};


