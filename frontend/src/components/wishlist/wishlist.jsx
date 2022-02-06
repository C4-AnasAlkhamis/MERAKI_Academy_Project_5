import React, { useState, useEffect } from "react";
import "./wishlist.css";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist, deleteWishlist } from "../../reducer/wishlist/index";

const Wishlist = () => {
  const [notes, setNotes] = useState([
    { myNote: "I have buy new wheel" },
    { myNote: "I have buy new paint brush" },
  ]);
  const [note, setNote] = useState("");

  console.log(notes);

  const dispatch = useDispatch();
  const { token, wishlists } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      wishlists: state.wishlistReducer.wishlists,
    };
  });

  const getWishlistById = async () => {
    await axios
      .get(`http://localhost:5000/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setWishlist(result.data.results));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteWishlistById = async (id) => {
    //delete http://localhost:5000/wishlist/:id

    await axios
      .delete(`http://localhost:5000/wishlist/${id}`)
      .then((result) => {
        dispatch(deleteWishlist(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createNewCart = async (id) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/cart`,
        { item_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    getWishlistById();
  }, []);
  return (
    <div className="Wishlist">
      <h1 className="Wishlist_title"> My Wishlist Content ... </h1>

      <div className="note">
        <h1>Reminder </h1>
<br></br>
        {notes.map((note, i) => {
          return (
            <div key={i}>
              <p>{note.myNote}</p>
            </div>
          );
        })}

        <input
          onChange={(e) => {
            setNote(e.target.value);
          }}
          type="text"
          placeholder="note"
        ></input>
        <button
        className="noteBttn"
          onClick={(e) => {
            setNotes([...notes, { myNote: note }]);
          }}
        >
          Note!
        </button>
      </div>
      {wishlists ? (
        wishlists.map((wishlist, index) => {
          return (
            <div key={index} className="box">
              <div className="wishlist_box">
                <div>
                  <img src={wishlist.img} alt={wishlist.title} />
                </div>
                <div className="info_box_flex_column">
                  <span>{wishlist.title}</span>
                  <span>{wishlist.description}</span>
                  <br></br>
                  <br></br>

                  <span>
                    {wishlist.price}
                    {"  JOD"}
                  </span>
                  <span>{wishlist.rate}</span>
                  <br></br>
                  <br></br>

                  <button
                    className="wishlist_delete"
                    id={wishlist.id}
                    onClick={(e) => {
                      deleteWishlistById(wishlist.wishlist_id);
                    }}
                  >
                    Remove Item
                  </button>
                  <button
                    className="wishlist_add_cart"
                    id={wishlist.id}
                    onClick={(e) => {
                      createNewCart(wishlist.item_id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No Wishlist Yet!</div>
      )}
    </div>
  );
};

export default Wishlist;
