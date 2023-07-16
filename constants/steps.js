export default [
  {
    selector: "#one ",
    content: () => (
      <div >
        <p className="dark:text-black text-white">this is styled text</p>
      </div>
    ),
  },
  {
    selector: "#two ",
    content: () => (
      <div className=" bg-black">
        <p className=" text-white">this is styled text</p>
      </div>
    ),
  },
  {
    selector: "#social-media ",
    content: () => (
      <div>
        <p className="dark:text-black text-white">Our social media handles. Follow for more stuffs</p>
      </div>
    ),
  },
];
