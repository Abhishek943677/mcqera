import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { mongoConnectLearn } from "../../../lib/mongoConnectLearn";
import AddTopic from "../../../components/learn/AddTopic";
import AdminPanel from "../../../components/learn/AdminPanel";
import { getSession } from "next-auth/react";
import axios from "axios";

const Index = ({ data }) => {
  const [edit, setEdit] = useState(true);

  return (
    <div>
      <Button onClick={() => setEdit((pre) => !pre)} variant="contained">
        {edit ? "add topics" : "edit previous topics"}
      </Button>

      {edit ? <AdminPanel data={data} /> : <AddTopic data={data} />}
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

  // actual server side stuffs
  try {
    const db = await mongoConnectLearn(); //connection to MongoDB instance
    const collection = db.collection("learnObj"); //accessing collection of learnObj

    const data = await collection
      .find() // finding data from trade collection with subject name
      .toArray();

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
