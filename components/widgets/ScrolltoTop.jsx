import React, { useEffect } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function Scrolltotop() {
  useEffect(() => {
    let mybutton = document.getElementById("btn-back-to-top");
    // console.log(mybutton)
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  }, []);
  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <>
      <button
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className=" bg-blue-500 text-white rounded-2xl shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out bottom-5 right-5 fixed hidden p-2  z-50"
        id="btn-back-to-top"
        onClick={() => {
          backToTop();
        }}
      >
        <ArrowUpwardIcon className=""/>
      </button>
    </>
  );
}
