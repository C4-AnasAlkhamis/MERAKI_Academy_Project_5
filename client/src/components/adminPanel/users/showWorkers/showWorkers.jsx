/** @format */

import React, { useEffect, useState } from "react";
import "./showWorkers.css";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setWorkers, deleteWorkers } from "../../../../reducer/worker/index";
import { AiTwotoneDelete } from "react-icons/ai";

//===============================================================

const ShowWorkers = () => {

  const dispatch = useDispatch();

  const { workers } = useSelector((state) => {
    return {
      workers: state.workerReducer.workers,
    };
  });

  //===============================================================

  const geAllWorker = async () => {
    try {
      const res = await axios.get("/worker");
      if (res.data.success) {
        dispatch(setWorkers(res.data.result));
      } else throw Error;
    } catch (error) {
    }
  };
  //===============================================================

  const deleteWorker = async (id) => {
    try {
      const res = await axios.put(`/worker/delete/${id}`);
      if (res.data.success) {
        dispatch(deleteWorkers(id));
      } else {
        throw Error;
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  //===============================================================
  useEffect(() => {
    geAllWorker();
  }, []);
  return (
    <div className="showUsers">
      <h2>Workers</h2>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>address</th>
            <th>Service</th>
            <th className="icon">Delete</th>
          </tr>
          {workers.map((worker, index) => {
            return (
              <tr key={index}>
                <td>{worker.w_id}</td>
                <td>
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                    src={worker.w_image}
                    alt={worker.user_name}
                  />
                </td>
                <td>{worker.user_name}</td>
                <td>{worker.email}</td>
                <td>{worker.phone}</td>
                <td>{worker.address}</td>
                <td>{worker.title}</td>

                <td>
                  <i>
                    <AiTwotoneDelete
                      onClick={() => {
                        deleteWorker(worker.user_id);
                      }}
                      className="btn"
                    />
                  </i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowWorkers;
