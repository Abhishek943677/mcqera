import React from "react";
import Login from "./login/Login";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";

export default function Header() {
  const { data: session } = useSession();
  // console.log(session)
  return (
    <div>
      {session ? (
        <Button variant="contained" size="small" onClick={() => signOut()}>
          log out
        </Button>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}
