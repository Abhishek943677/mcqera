import { ObjectId } from "mongodb";
import { mongoConnectLearn } from "../../../../lib/mongoConnectLearn";

export default async function handler(req, res) {

    if (req.method === "POST") {
        try {
            const db = await mongoConnectLearn(); // my function to connect with db

            // console.log(req.body)
            const collection = await db.collection("topics"); // creating collection with name of trade
            const list = await collection.find({author: req.body.author, course:req.body.course,subject:req.body.subject,chapter:req.body.chapter}).project({ _id: 1,topicName:1,url:1 }).toArray()

            res.status(200).json({ ok: "yes ok hai", list});
            return res.end();

        } catch (error) {
            // console.log(error)
            res.status(200).json({ error });
            res.end();
        }
    }
};


