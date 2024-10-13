import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

export default function PaginationModal({
  noOfPageForPagination,
  currentPage,
}) {
  const router = useRouter();
  const handleChange = (event, value) => {
    // window.location.href = `${encodeURIComponent(value)}`
    router.push(
      `/quiz/${router.query.route[0]}/${router.query.route[1]}/${value}`
    );
  };
  const [paginationSize, setPaginationSize] = React.useState("large");
  const [siblingCount, setSiblingCount] = React.useState("1");

  // Function to update pagination size based on screen width
  const handleResize = () => {
    if (window.innerWidth < 640) {
      setPaginationSize("medium"); // Small for screens < 640px (sm in Tailwind)
      setSiblingCount(1)
    } else {
      setPaginationSize("large"); // Large for wider screens
      setSiblingCount(2)
    }
  };

  // Run on initial render and on screen resize
  React.useEffect(() => {
    handleResize(); // Check size initially
    window.addEventListener("resize", handleResize); // Listen for window resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <Stack>
      <div className="flex m-auto py-4 justify-center ">
        <Pagination
          count={noOfPageForPagination}
          onChange={handleChange}
          shape="rounded"
          color="secondary"
          page={Number(currentPage)}
          siblingCount={siblingCount}
          size={paginationSize}
        />
      </div>
    </Stack>
  );
}
