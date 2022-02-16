/** @format */

import React, { useEffect, useState } from "react";
import "./showUsers.css";
import Select from "react-select";
import PaginateReact from "react-paginate";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUsers, deleteUsers } from "../../../../reducer/users/index";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";

//===============================================================

const ShowUsers = () => {
  const [message, setMessage] = useState("");
  const [id, setId] = useState();

  const dispatch = useDispatch();

  const { users } = useSelector((state) => {
    return {
      users: state.usersReducer.users,
    };
  });

  //===============================================================

  const getAllUsers = async () => {
    try {
      const res = await axios.get("/user/all");
      if (res.data.success) {
        dispatch(setUsers(res.data.result));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
    console.log(users);

  };
  //===============================================================
  const deleteUserById = async (id) => {
    try {
      const res = await axios.delete(`/user/${id}`);
      console.log(res);
      if (res.data.success) {
        setMessage(res.data.success);
        dispatch(deleteUsers(id));
      } else {
        throw Error;
      }
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while deleting new data");
    }
  };
  //===============================================================
  useEffect(() => {
    getAllUsers();
  }, [id]);
  return (
    <div className="showUsers">
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th className="icon">Delete</th>
          </tr>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.user_name}</td>
                <td>{user.email}</td>
                <td>
                  <i>
                    <AiTwotoneDelete
                      onClick={() => {
                        setId(user.id);
                        deleteUserById(user.id);
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

export default ShowUsers;
