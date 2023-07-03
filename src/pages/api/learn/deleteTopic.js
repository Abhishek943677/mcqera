import { ObjectId } from "mongodb";
import { mongoConnectLearn } from "../../../../lib/mongoConnectLearn";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const db = await mongoConnectLearn(); // my function to connect with db

            // console.log(req.body)
            const collection = db.collection("topics"); // creating collection with name of trade

            // const questions = await collection.find({"_id":new ObjectId("6440320c2590bb362173e95d")}).project({_id:1,trade:1,"que.question":1}).toArray()
            const deleted = await collection.deleteOne({ "_id": new ObjectId(req.body.id) })

            res.status(200).json({ ok: "yes ok hai", deleted });
            return res.end();

        } catch (error) {
            console.log(error)
            res.status(200).json({ error });
            res.end();
        }
    }
};


