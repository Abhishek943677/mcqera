import axios from "axios";
import { loadCourseObj } from "./loadCourseObj"


export async function pathsArrayForQuiz() {

    const courseObj = await loadCourseObj();
    const estimatedCount = Array.from({ length: 1 }, (_, i) => i + 1);  // console.log(estimatedCount) // [1,2,3,4......,100]

    // const url = `api/question/getQuestionLength?subject=network&trade=electrical`;

    const path = [];
    courseObj.map((item) => {
        const { trade, subjects } = item;
        subjects.map(async (subject) => {
            estimatedCount.map(async (count) => {
                path.push({ params: { route: [String(trade), String(subject), String(count)] } })
            })
        })
    });

    console.log("end")
    console.log(path)
    // paths: [{ params: { route: ['electrical','network','1'] } },{ params: { route: ['electrical','network','2'] } }],

    return path
};




