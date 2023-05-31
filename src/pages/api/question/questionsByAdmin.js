import { ObjectId } from "mongodb";
import { mongoConnect } from "../../../../lib/mongoConnect"

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const db = await mongoConnect(); // my function to connect with db

            console.log(req.body)
            const collection = await db.collection(req.body.trade); // creating collection with name of trade

            // const questions = await collection.find({"_id":new ObjectId("6440320c2590bb362173e95d")}).project({_id:1,trade:1,"que.question":1}).toArray()
            // const questions = await collection.find({"_id":new ObjectId("6440320c2590bb362173e95d")}).toArray()

            const skipped = 4 * (req.body.count - 1)
            console.log(skipped);
            
            const list = await collection.find({ "author": req.body.author, "subject": req.body.subject }).project({ _id: 1, "que.question": 1 }).limit(4).skip(skipped).toArray()

            res.status(200).json({ ok: "yes ok hai", list });
            return res.end();

        } catch (error) {
            console.log(error)
            res.status(200).json({ error });
            res.end();
        }
    }
};


