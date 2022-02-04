import React, { useState } from "react";

import PaginateReact from "react-paginate";
import "./test.css";

/** @format */
const Pag = () => {
  const arr = ["1", "554", "7654", "6546544", "465465", "49891", "79879", "84151", "898651", "6161", "16160", "46515", "4656541", "48491", "5464651","6465467","64658","8789","4656","8524"];
  const [items, setItems] = useState(arr.slice(0,20));
  const [pgNum, setPgNum] = useState(0);

  const itemsPerPg = 3;
  const pgVS = pgNum *itemsPerPg;
  const display = items.slice(pgVS, pgVS+itemsPerPg).map((el, index) => {
    return <p className="element" key={index}>{el}</p>;
  });
  const pageCount = Math.ceil(items.length / itemsPerPg);
  const changePage = ({ selected }) => {
    setPgNum(selected);
  };
  return (
    <div className="Paginate">
      {display}

      <PaginateReact
        PreviousLabel={"Previous"}
        NextLabel={"Next"}
       pageCount={pageCount}
        onPageChange={changePage}

        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={" paginationDisabled "}
        activeClassName={" paginationActive "}

      />

      {/* {arr.map((el, index) => {
        return <div key={index}>{el}</div>;
      })} */}
    </div>
  );
};

export default Pag;
