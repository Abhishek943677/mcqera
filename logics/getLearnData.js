import { mongoConnectLearn } from "../lib/mongoConnectLearn";

export async function getLearnData() {
  try {
    const db = await mongoConnectLearn(); // mongoConnect is a function which returns db
    const collection = db.collection("learnObj"); //accessing collection of trade
    const learnObj = await collection
      .find({}) // finding data from trade collection with subject name
      .toArray();
    return learnObj;
  } catch (error) {
    return { learnObj: [] };
  }
}
