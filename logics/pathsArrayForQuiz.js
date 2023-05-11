import { mongoConnect } from "../lib/mongoConnect";
import { loadCourseObj } from "./loadCourseObj"


export async function pathsArrayForQuiz() {
    const path = [];

    const courseObj = await loadCourseObj();
    // const db = await mongoConnect();

    const estimatedCount=Array.from({length: 20}, (_, i) => i + 1);
    // console.log(estimatedCount) // [1,2,3,4......,100]

    courseObj.forEach((item) => {
        const { trade } = item

        item.subjects.forEach(async (subject) => {

            estimatedCount.forEach((count) => {
                path.push({ params: { route: [String(trade), String(subject), String(count)] } })
            })

        })
    });

    // console.log("line 27")
    // console.log(path)
    // paths: [{ params: { route: ['electrical','network','1'] } },{ params: { route: ['electrical','network','2'] } }],

    return path
}
