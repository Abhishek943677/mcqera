import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGoogle = async () => {
    handleClose();
    signIn("google", { callbackUrl: process.env.APP_URL });
  };
  const handleFacebook = async () => {
    handleClose();
    signIn("facebook", { callbackUrl: process.env.APP_URL });
  };
  const handleGithub = async () => {
    handleClose();
    signIn("github", { callbackUrl: process.env.APP_URL });
  };

  return (
    <div>
      <Button variant="contained" size="small" onClick={handleOpen}>
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="make-com-dark">
          <p className="text-lg text-center m-3 p-2">Login</p>
          <button onClick={handleGoogle}>
            <GoogleIcon />&nbsp; Login using google
          </button>
          <br /> <br />
          <button onClick={handleFacebook}>
            <FacebookIcon />&nbsp; Login using facebook
          </button>
          <br /> <br />
          <button onClick={handleGithub}>
            <GitHubIcon />&nbsp; Login using github
          </button>
        </Box>
      </Modal>
    </div>
  );
}
