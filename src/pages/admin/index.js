import React, { useEffect, useState } from "react";
import AddQuestion from "../../../components/addQuestion/AddQuestion";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { loadCourseObj } from "../../../logics/loadCourseObj";
import { useRouter } from "next/router";
import AdminPanel from "../../../components/adminPanel/AdminPanel";
import { Button } from "@mui/material";

export default function Home({ courseObj }) {
  const { data: session } = useSession();
  const [showAdminPanel, setShowAdminAPanel] = useState(false)
  const router = useRouter();
    

  return (
    <div className={`w-full mx-auto`}>
      <Button variant="contained" onClick={() => setShowAdminAPanel(pre => !pre)}>{showAdminPanel ? "Add new Question" : "Edit Your Previous Questions"}</Button>
      {showAdminPanel ?
        <AdminPanel courseObj={courseObj} />
        :
        <AddQuestion courseObj={courseObj}  />
      }
    </div>
  );
}


export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  try {
    const { data } = await axios.post(`${process.env.APP_URL}/api/auth/admin`, { email: session.user.email })
    if (!data) {
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

  const courseObj = await loadCourseObj();
    

  return {
    props: { session, courseObj }
  };
}
