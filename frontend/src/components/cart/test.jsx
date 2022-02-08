import React, { useState } from "react";
import axios from "axios";

import PaginateReact from "react-paginate";
import "./test.css";

// import cloudImage from "cloudinary-react";
import { Image } from "cloudinary-react";

////////////
/** @format */
const Pag = () => {
  // const arr = [
  //   "1",
  //   "554",
  //   "7654",
  //   "6546544",
  //   "465465",
  //   "49891",
  //   "79879",
  //   "84151",
  //   "898651",
  //   "6161",
  //   "16160",
  //   "46515",
  //   "4656541",
  //   "48491",
  //   "5464651",
  //   "6465467",
  //   "64658",
  //   "8789",
  //   "4656",
  //   "8524",
  // ];

  // const [items, setItems] = useState(arr.slice(0,20));
  // const [pgNum, setPgNum] = useState(0);

  // const itemsPerPg = 3;
  // const pgVS = pgNum *itemsPerPg;
  // const display = items.slice(pgVS, pgVS+itemsPerPg).map((el, index) => {
  //   return <p className="element" key={index}>{el}</p>;
  // });
  // const pageCount = Math.ceil(items.length / itemsPerPg);
  // const changePage = ({ selected }) => {
  //   setPgNum(selected);
  // };
  // const url="CLOUDINARY_URL=cloudinary://186168973372335:b8FUrazq0ox83eJsFuWV1boJpI0@debtpixx1";
  const [imageSelected, setImageSelected] = useState("");
  const [imageBack, setImageBack] = useState("");

  // const formData=(){

  // }

  const uploadImage = () => {
    const formData = new FormData();

    // console.log(files[0]);

    formData.append("file", imageSelected);
    formData.append("upload_preset", "rwnvwutb");
    axios
      .post(`https://api.cloudinary.com/v1_1/debtpixx1/image/upload/`, formData)
      .then((res) => {
        setImageBack(res.data.secure_url);
        console.log(res.data.secure_url);
      });

    // const dataForm = new dataForm ();

    // console.log(files[0])
  };

  return (
    <>
      {/*       <div className="Paginate">
      {display}

/       <PaginateReact
//         PreviousLabel={"Previous"}
//         NextLabel={"Next"}
//        pageCount={pageCount}
//         onPageChange={changePage}

//         containerClassName={"paginationBttns"}
//         previousLinkClassName={"previousBttn"}
//         nextLinkClassName={"nextBttn"}
//         disabledClassName={" paginationDisabled "}
//         activeClassName={" paginationActive "}

//       />
//     </div> */}

      <div className="cloud">
        <p>hhhhhhhhhhhhhhhhhhhh</p>

        <input
          type="file"
          onChange={(e) => {
            setImageSelected(e.target.files[0]);
          }}
        />

        <button onClick={uploadImage}> upload image</button>

        <Image
          style={{ width: 300 }}
          cloudName="debtpixx1"
          publicId={imageBack}
        />
      </div>
    </>
  );
};

export default Pag;
