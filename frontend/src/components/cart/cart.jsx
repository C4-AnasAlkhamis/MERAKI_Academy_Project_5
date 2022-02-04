import React, { useState, useEffect } from "react";
import { useNavigate, LINK } from "react-router-dom";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCart, deleteCart } from "../../reducer/cart/index";

const Cart = () => {
  const [message, setMessage] = useState("");

  const { token, carts } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      carts: state.cartReducer.carts,
    };
  });
  const dispatch = useDispatch();

  const getCartById = async () => {
    await axios
      .get(`http://localhost:5000/cart/`)
      .then((result) => {
        dispatch(setCart({ ...result.data.result }));
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCartById = async (id) => {
    //delete http://localhost:5000/cart/:id

    await axios
      .delete(`http://localhost:5000/cart/${id}`)
      .then((result) => {
        setMessage("cart has been deleted successfully");
        dispatch(deleteCart(""));
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
        setMessage("Error happened while deleting the cart");
      });
  };

  // useEffect(() => {
  //   console.log(carts);
  //   getCartById(),
  //   axios
  //     .get(`http://localhost:5000/cart/`)
  //     .then((res) => {
  //       dispatch(setCart(res.data));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);


  return (
    <div className="Cart">
      <h1>cart content </h1>

      {/* {carts.map((cart, i) => {
        return (
          <div key={i}>
            <img src={cart.image} alt="" />
            <button onClick={deleteCartById(cart.id)}>Delete From Cart</button>
          </div>
        );
      })} */}

      {/* <div className="user_id">
      <input
          onChange={(e) => {
            setUser_id(e.target.value);
          }}
          value={user_id}
          type="text"
          placeholder="user_id"
        />

      </div>

      <div className="item_id">
      <input
          onChange={(e) => {
            setItem_id(e.target.value);
          }}
          value={item_id}
          type="text"
          placeholder="item_id"
        />

      </div>
      <button onClick={createCart}>Add to Cart</button> */}
    </div>
  );
};

export default Cart;

// const Cart = () => {

// const dispatch = useDispatch();
// const [user_id, setUser_id] = useState("");
// const [item_id, setItem_id] = useState("");
// const [message, setMessage] = useState("");

// const createCart = async (e) => {
//   e.preventDefault();
//   //   POST -> http://localhost:5000/cart/
//     await axios
//       .post("http://localhost:5000/cart/", {
//         user_id: user_id,
//         item_id: item_id
//       })
//       .then((result) => {
//         if (result) setMessage(result.data.message);

//       })
//       .catch((err) => {
//         setMessage(err.response.data.message);
//       });

// };

// return (
//   <div className="Cart">
//     <h1>cart content </h1>

//     <div className="user_id">
//     <input
//         onChange={(e) => {
//           setUser_id(e.target.value);
//         }}
//         value={user_id}
//         type="text"
//         placeholder="user_id"
//       />

//     </div>

//     <div className="item_id">
//     <input
//         onChange={(e) => {
//           setItem_id(e.target.value);
//         }}
//         value={item_id}
//         type="text"
//         placeholder="item_id"
//       />

//     </div>
//     <button onClick={createCart}>Add to Cart</button>

//   </div>
// );
// };

// export default Cart;

// import React, { useState } from "react";
// import axios from "axios";

// import { useNavigate, LINK } from "react-router-dom";
// import "./itemInfo.css";
// import { setItemInfo, updateItemInfo } from "../../reducer/itemInfo/index";
// import { useSelector, useDispatch } from "react-redux";

// const Cart = () => {

//   const dispatch = useDispatch();
//   const [user_id, setUser_id] = useState("");
//   const [item_id, setItem_id] = useState("");
//   const [message, setMessage] = useState("");

//   const createCart = async (e) => {
//     e.preventDefault();
//     //   POST -> http://localhost:5000/cart/
//       await axios
//         .post("http://localhost:5000/cart/", {
//           user_id: user_id,
//           item_id: item_id
//         })
//         .then((result) => {
//           if (result) setMessage(result.data.message);

//         })
//         .catch((err) => {
//           setMessage(err.response.data.message);
//         });

//   };

//   return (
//     <div className="Cart">
//       <h1>cart content </h1>

//       <div className="user_id">
//       <input
//           onChange={(e) => {
//             setUser_id(e.target.value);
//           }}
//           value={user_id}
//           type="text"
//           placeholder="user_id"
//         />

//       </div>

//       <div className="item_id">
//       <input
//           onChange={(e) => {
//             setItem_id(e.target.value);
//           }}
//           value={item_id}
//           type="text"
//           placeholder="item_id"
//         />

//       </div>
//       <button onClick={createCart}>Add to Cart</button>

//     </div>
//   );
// };

// export default Cart;
