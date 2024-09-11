import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../widgets/Spinner";

export default function AdminPanel({ data }) {
  const [listData, setListData] = useState([]);
  const [sent, setSent] = useState(false);
  const { data: session } = useSession();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [toBeDeleted, setTobeDeleted] = useState("");

  // to get topics on click
  const handleApi = () => {
    axios
      .post("/api/exam/topicsByAdmin", {
        author: session.user.email,
      })
      .then(({ data }) => {
        console.log(data);
        setListData(data.list);
        setSent(false);

        if (data.ok) {
          setListData(data.list);
        } else {
          setListData([]);
        }
      })
      .catch((error) => {
        setSent(true);
      });
  };

  // to delete the item from the list
  const handleDelete = () => {
    axios.post("/api/exam/deleteTopic", { id:toBeDeleted }).then(({ data }) => {
      console.log(data);
      const filteredList = listData.filter((item) => item._id !== toBeDeleted);
      setListData(filteredList);
    });
  };

  // delete alert dialog
  const handleClickOpenDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div>
      {/* delete dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"confirmation for deletion of topic"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete this topic. This will not be
            recovered if deleted once.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button
            onClick={() => {
              handleDelete();
              handleClose();
            }}
            autoFocus
          >
            ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* ------------------------------- */}

      {/* this is the button to get topics */}
      <div className="flex justify-center w-full">
        <Button
          className="w-60"
          color="success"
          disabled={sent}
          variant="contained"
          onClick={() => {
            setSent(true);
            handleApi();
          }}
        >
          {sent ? <Spinner /> : "get exams ..."}
        </Button>
      </div>

      {/* this section shows all the exams for editing purpose */}
      <main>
        {listData &&
          listData.length > 0 &&
          listData.map((item, index) => {
            return (
              <div className="px-2 make-com-dark my-1 rounded" key={index}>
                <div className="flex justify-between">
                  <Link
                    className=" hover:opacity-50"
                    href={`/exam/${item.examname}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.branch} / {item.examname}
                  </Link>

                  <div className="flex my-auto">
                    <Button size="small">
                      <DeleteIcon
                        fontSize="large"
                        color="error"
                        className="cursor-pointer mx-2 "
                        onClick={(e) => {
                          setTobeDeleted(item._id);
                          handleClickOpenDialog();
                          e.target.classList.add("deleted");

                          // handleDelete(item._id);
                        }}
                      />
                    </Button>
                    <Link
                      href={`/e-admin/edit?id=${item._id}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Button>
                        <EditIcon
                          fontSize="large"
                          color="primary"
                          className="cursor-pointer ml-2"
                        />
                      </Button>
                    </Link>
                    <p className="text-center my-auto p-1">{index + 1}</p>
                  </div>
                </div>
                <Divider />
              </div>
            );
          })}
      </main>
    </div>
  );
}
