import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { loadCourseObj } from "../../../logics/loadCourseObj";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import AdminPanel from "../../../components/quiz-admin/AdminPanel";
import AddQuestion from "../../../components/quiz-admin/AddQuestion";

export default function Home({ courseObj }) {
  const [showAdminPanel, setShowAdminAPanel] = useState(false);

  return (
    <div className={`w-full mx-auto`}>

      <Button
        variant="contained"
        onClick={() => setShowAdminAPanel((pre) => !pre)}
      >
        {showAdminPanel ? "Add new Question" : "Edit Your Previous Questions"}
      </Button>

      
      {showAdminPanel ? (
        <AdminPanel courseObj={courseObj} />
      ) : (
        <AddQuestion courseObj={courseObj} />
      )}
    </div>
  );
}

// ---------------------server auth and admin authentication------------------------
export async function getServerSideProps(context) {
  // this is user authentication
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  // this is admin validation
  try {
    const { data } = await axios.post(`${process.env.APP_URL}/api/auth/admin`, {
      email: session.user.email,
    });
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

  // actual server stuffs
  try {
    const courseObj = await loadCourseObj();

    // retuning data for frontend
    return {
      props: { session, courseObj },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
