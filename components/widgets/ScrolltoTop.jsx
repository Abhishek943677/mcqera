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
        className=" bg-blue-500 text-white rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out bottom-10 right-7 fixed hidden p-2  z-50"
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
