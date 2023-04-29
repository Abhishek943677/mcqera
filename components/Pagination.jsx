import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {useRouter } from "next/router";

export default function PaginationModal({noOfPageForPagination,currentPage}) {
  const router = useRouter();
  const handleChange = (event, value) => {
    // window.location.href = `${encodeURIComponent(value)}`
    router.push(`/quiz/${router.query.route[0]}/${router.query.route[1]}/${value}`);

  };
  
  return (
    <Stack spacing={2} >
      <div className="flex  m-auto py-4 justify-center ">
        <Pagination count={noOfPageForPagination} onChange={handleChange} shape="rounded" page={Number(currentPage)} size="medium" />
      </div>
    </Stack>
  );
};
