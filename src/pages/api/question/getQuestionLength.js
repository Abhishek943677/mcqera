import { mongoConnect } from "../../../../lib/mongoConnect"

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            // console.log(req.query)
            // const db = await mongoConnect(); // my function to connect with db

            // const collection = db.collection(req.query.trade); // creating collection with name of trade
            // const length = await collection.find({ subject: req.query.subject }).count()
            // console.log(length)

            res.status(200).json({ ok: "yes ok hai", length:19});
            return res.end();

        } catch (error) {
            res.status(200).json({ error });
            res.end();
        }
    }
};


