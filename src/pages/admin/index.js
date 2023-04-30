import React, { useEffect, useState } from "react";
import AddQuestion from "../../../components/addQuestion/AddQuestion";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { loadCourseObj } from "../../../logics/loadCourseObj";

export default function Home({courseObj}) {
  const { data: session } = useSession();
  // console.log(session)
  
  return (
    <div className={`w-full lg:w-2/3 md:w-2/3 px-3 mx-auto`}> <AddQuestion courseObj={courseObj} /></div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  try {
    const {data} =await axios.post(`${process.env.APP_URL}/api/auth/admin`,{email:session.user.email})
    if(!data){
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
  }
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const courseObj = await loadCourseObj()
  return {
    props: { session,courseObj }
  };
}
