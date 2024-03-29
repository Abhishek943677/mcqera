// import courseObj  from "../constants/courseObj"
import { mongoConnect } from "../lib/mongoConnect";

export async function loadCourseObj() {
  try {
    const db = await mongoConnect(); // mongoConnect is a function which returns db
    const collection = db.collection("courses"); //accessing collection of trade
    const data = await collection
      .find() // finding data from trade collection with subject name
      .toArray();
    const courseObj = data
    
    return courseObj

  } catch (error) {
    return {courseObj:[]}

  }
}