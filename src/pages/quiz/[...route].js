import React, { useEffect, useState } from 'react'
import AllQuestions from '../../../components/AllQuestions'
import PaginationModal from '../../../components/Pagination'
import getContent from '../../../logics/getContent'
import ChangeSubject from '../../../components/ChangeSubject'
import { useRouter } from 'next/router'
import ChangeTrade from '../../../components/ChangeTrade'
import { Button } from '@mui/material'
import { loadCourseObj } from '../../../logics/loadCourseObj'

export default function Page({questions,noOfPageForPagination,UserBlogPage,courseObj}) {
  // console.log(questions)
  /*
  [
    {
    "question": "network",
    "trueOpt": "this ans is true",
    "falseOpt1": " sorry wrong",
    "falseOpt2": "weong ans",
    "falseOpt3": "oh no",
    "detail": "<p>wow details is amazing</p>"
  },
  {
    "question": "network",
    "trueOpt": "this ans is true",
    "falseOpt1": " sorry wrong",
    "falseOpt2": "weong ans",
    "falseOpt3": "oh no",
    "detail": "<p>wow details is amazing</p>"
  }
  ]
*/
  const [trade, setTrade] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const[courses,setCourses]=useState([])
  const router=useRouter()

  useEffect(() => {
    setTrade(router.query.route[0]);
    setSubject(router.query.route[1])
    setCourses(courseObj)
    
    const getSubjects=courseObj.find((ele)=>ele.trade===router.query.route[0])
    // console.log(getSubjects.subjects) // ['mos', 'dos', 'fluuid', 'concrete']

    if(getSubjects){
      setSubjects(getSubjects?.subjects)
    }else{
      setSubjects([])
    }
    
  }, []);

  return (
    <div>
      <div className="w-2/4 mx-auto px-4 justify-center">
        <ChangeTrade
          trade={trade}
          courses={courses}
          setTrade={setTrade}
          setSubject={setSubject}
          setSubjects={setSubjects}
        />
        <ChangeSubject
          subject={subject}
          subjects={subjects}
          setSubject={setSubject}
        />
        <Button
          variant="contained"
          color='success'
          className='w-full p-2 mx-2'
          onClick={() => {

            router.push(`/quiz/${trade}/${subject}/1`)
          }}
          >
          change subject
        </Button>
      </div>

      {questions && questions.length === 0 ? (
        <div className=''>
          <p className='text-lg text-center p-3'>{`Bhosdik kuchh na h yha`}</p>
        </div>
      ) : (
        <AllQuestions questions={questions} />
      )}
      <PaginationModal
        noOfPageForPagination={noOfPageForPagination}
        currentPage={UserBlogPage}
      />
    </div>
  );
}


// export async function getStaticPaths() {
//   var path =[];
//   const courseObj = await loadCourseObj();
//   // console.log(courseObj)
//   /* [
//     {
//       id: 1,
//       trade: 'electrical',
//       subjects: [ 'network', 'power system' ]
//     },
//     {
//       id: 2,
//       trade: 'civil',
//       subjects: [ 'mos', 'dos', 'fluuid', 'concrete' ]
//     }
//    ] */
   
//   //making paths for pre gerenated url  
//   courseObj.forEach(element => {
//     element.subjects.forEach((ele)=>{
//       path.push({ params: { route:[element.trade,ele] } })
//     })
//   });

//   // console.log(path)
//   // [{ params: { route: ['electrical','network'] } },{ params: { route: ['electrical','power system'] } }]

//   return {
//     paths: path,
//     fallback: 'blocking',
//   }
// }

// export async function getStaticProps(context){

//   var questions , noOfPageForPagination ,courseObj;
//   var UserBlogPage=1;
//   try {
//     courseObj = await loadCourseObj()

//     if(context.params.route[2]){
//       UserBlogPage = context.params.route[2];
//     };

//     const {parsedFileContent} = await getContent({context})
//     noOfPageForPagination = Math.ceil(parsedFileContent.length / 10 );

//     const start = (UserBlogPage - 1) * 10;
//     const end = UserBlogPage * 10;

//     questions = parsedFileContent.slice(start, end);
//     // console.log(questions); // lists array of questions with 10 objects

//   return {
//     props:{questions,noOfPageForPagination,
//       UserBlogPage,courseObj}
//   }

// } catch (error) {
//   courseObj=await loadCourseObj()
//   // console.log(error)
//   return{
//     props:{questions:[],courseObj,noOfPageForPagination:1}
//   }
// }
// }




export async function getServerSideProps(context){

  var questions , noOfPageForPagination ,courseObj;
  var UserBlogPage=1;
  try {
    courseObj = await loadCourseObj()

    if(context.params.route[2]){
      UserBlogPage = context.params.route[2];
    };

    const {parsedFileContent} = await getContent({context})
    noOfPageForPagination = Math.ceil(parsedFileContent.length / 10 );

    const start = (UserBlogPage - 1) * 10;
    const end = UserBlogPage * 10;

    questions = parsedFileContent.slice(start, end);
    // console.log(questions); // lists array of questions with 10 objects

  return {
    props:{questions,noOfPageForPagination,
      UserBlogPage,courseObj}
  }

} catch (error) {
  courseObj=await loadCourseObj()
  // console.log(error)
  return{
    props:{questions:[],courseObj,noOfPageForPagination:1}
  }
}
}
