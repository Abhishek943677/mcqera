import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { getSession } from "next-auth/react";
import axios from "axios";
import AdminPanel from "../../../components/exam-admin/AdminPanel";
import AddExam from "../../../components/exam-admin/AddExam";
import { clientMenu } from "../../../lib/sanityConnect";

const Index = ({ data }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div>
      <Button onClick={() => setEdit((pre) => !pre)} variant="contained">
        {edit ? "Add Exams" : "edit previous exams"}
      </Button>

      {edit ? <AdminPanel data={data} /> : <AddExam data={data} />}
    </div>
  );
};

//----------------------- server auth and admin authentication----------------------------
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

  // actual server side stuffs for the page
  try {
    const rawExamData = await clientMenu.fetch(
      `*[_type=="exam"]{examname , branch->{title}}`
    );
    const data = rawExamData.map(({ branch, examname }) => {
      return {
        examname: examname.replaceAll(" ","-"),
        branch: branch.title,
      };
    });
    console.log(data)

    // return data for frontend
    return {
      props: {
        data: JSON.stringify(data),
      },
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

export default Index;
