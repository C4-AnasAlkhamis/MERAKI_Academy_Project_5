/** @format */

const connection = require("../database/db");

// This function checks user login credentials
// const login = (req, res) => {
//   const password = req.body.password;
//   const email = req.body.email.toLowerCase();
//   const query = `SELECT * FROM users WHERE email = ?`;
//   const data = [email];
//   connection.query(query, data, async (err, result) => {
//     try {
//       if (err) {
//         return res.status(409).json({
//           success: false,
//           message: `The email not exists`,
//           err: err,
//         });
//       }
//       const valid = await bcrypt.compare(password, result[0].password);
//       if (!valid) {
//         return res.status(403).json({
//           success: false,
//           message: `The password you’ve entered is incorrect`,
//         });
//       }
//       const payload = {
//         userId: result[0].id,
//         role: result[0].role_id,
//         userName: result[0].userName,
//       };

//       const options = {
//         expiresIn: "60m",
//       };
//       const token = await jwt.sign(payload, process.env.SECRET, options);
//       res.status(200).json({
//         success: true,
//         message: `Valid login credentials`,
//         token: token,
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: `Server Error`,
//         err: err,
//       });
//     }
//   });
// };

// module.exports = {
//   login,
// };
// // =================================================== // done

// // This function creates new category
// const createNewCategory = (req, res) => {
//   const { category } = req.body;

//   const query = `INSERT INTO categories (category) VALUE (?)`;
//   const data = [category];
//   connection.query(query, data, (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: `Server Error`,
//       });
//     }
//     res.status(201).json({
//       success: true,
//       message: `category created`,
//       result: result,
//     });
//   });
// };
// categoriesRouter.post("/", createNewCategory);

// // =================================================== // done

// // This function returns the categories
// const getAllCategories = (req, res) => {
//   const query = `SELECT * FROM categories WHERE is_deleted = 0`;
//   connection.query(query, (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: `Server Error`,
//       });
//     }
//     if (!result) {
//       return res.status(200).json({
//         success: false,
//         message: `No Categories Yet`,
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: `All the Categories`,
//       result: result,
//     });
//   });
// };
// categoriesRouter.get("/", getAllCategories);
// // =================================================== // done

// // This function returns Category By Id
// const getCategoryById = (req, res) => {
//   let id = req.query.id;
//   const query = `SELECT * FROM categories WHERE id = ?`;
//   const data = [id];
//   connection.query(query, data, (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: `Server Error`,
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: `The cart ${id}`,
//       result: result,
//     });
//   });
// };
// categoriesRouter.get("/:id", getCategoryById);
// // =================================================== // done

// // This function delete Category By Id
// const deleteCategoryById = (req, res) => {
//   let id = req.query.id;
//   const query = `DELETE categories WHERE id = ?`;
//   const data = [id];
//   connection.query(query, data, (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: `Server Error`,
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: `The category with ${id} deleted`,
//       result: result,
//     });
//   });
// };
// categoriesRouter.delete("/:id", deleteCategoryById);
// // =================================================== // done

// This function creates new cart
// const createNewCart = (req, res) => {
//   const { user_id, item_id } = req.body;

//   const query = `INSERT INTO carts (user_id,item_id) VALUE (?,?)`;
//   const data = [user_id, item_id];
//   connection.query(query, data, (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: `Server Error`,
//       });
//     }
//     res.status(201).json({
//       success: true,
//       message: `cart created`,
//       result: result,
//     });
//   });
// };
// cartRouter.post("/", createNewCart);
// // =================================================== // done

// // This function returns Cart By Id
// const getCartById = (req, res) => {
//   let id = req.query.id;
//   const query = `SELECT * FROM carts join items ON carts.item_id = items.id where user_id =?`;
//   const data = [id];
//   connection.query(query, data, (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: `Server Error`,
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: `The carts with user ${id}`,
//       result: result,
//     });
//   });
// };
// cartRouter.get("/:id", getCartById);

// // =================================================== // done

// // This function returns Cart By Id
// const deleteCartById = (req, res) => {
//   let id = req.query.id;
//   const query = `DELETE carts WHERE id = ?`;
//   const data = [id];
//   connection.query(query, data, (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: `Server Error`,
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: `The cart with ${id} deleted`,
//       result: result,
//     });
//   });
// };
// cartRouter.delete("/:id", deleteCartById);

// // =================================================== // done
// // This function creates new role
// const createNewRole = (req, res) => {
//   const { role } = req.body;
//   const query = `INSERT INTO roles (role) VALUE (?)`;
//   const data = [role];

//   connection.query(query, data, (err, role) => {
//     if (err) {
//       res.status(500).json({
//         success: false,
//         message: `Server Error`,
//         err: err,
//       });
//     }
//     res.status(201).json({
//       success: true,
//       message: `Success role created`,
//       result: role,
//     });
//   });
// };
// roleRouter.post("/", createNewRole);

// //=================================================== // done
// // This function creates new Permission
// const createNewPermission = (req, res) => {
//   const { permission } = req.body;
//   const query = `INSERT INTO permissions (permission) VALUE (?)`;
//   const data = [permission];

//   connection.query(query, data, (err, role) => {
//     if (err) {
//       res.status(500).json({
//         success: false,
//         message: `Server Error`,
//         err: err,
//       });
//     }
//     res.status(201).json({
//       success: true,
//       message: `Success permission created`,
//       result: role,
//     });
//   });
// };
// roleRouter.post("/permissions", createNewPermission);

// //=================================================== // done
// // This function creates new Permission
// const createNewRole_permission = (req, res) => {
//   const { permission } = req.body;
//   const query = `INSERT INTO permissions (permission) VALUE (?)`;
//   const data = [permission];

//   connection.query(query, data, (err, role) => {
//     if (err) {
//       res.status(500).json({
//         success: false,
//         message: `Server Error`,
//         err: err,
//       });
//     }
//     res.status(201).json({
//       success: true,
//       message: `Success role-permission created`,
//       result: role,
//     });
//   });
// };
// roleRouter.post("/role-permission", createNewRole_permission);
// This function create new item
const createNewItem = (req, res) => {
  const { image, title, description, category, price } = req.body;

  const query = `INSERT INTO items (image, title, description, category, price) VALUE (?,?,?,?,?)`;
  const data = [image, title, description, category, price];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    res.status(201).json({
      success: true,
      message: `new item created`,
      result: result,
    });
  });
};

// // =================================================== // done

// This function get all items from items
const getAllItems = (req, res) => {
  const query = `SELECT * FROM items WHERE is_deleted = 0`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }
    if (!result) {
      return res.status(200).json({
        success: false,
        message: `No items Yet`,
      });
    }
    res.status(200).json({
      success: true,
      message: `all the items`,
      items: result,
    });
  });
};
// // =================================================== // done

// This function delete Item By Id
const deleteItemById = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM items WHERE id = ?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No item with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to delete item with id ${id}`,
      result: result,
    });
  });
};

// // =================================================== // done

// This function get Item By Id
const getItemById = (req, res) => {
  let { id } = req.query;

  const query = `select * FROM items WHERE id = ?`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: ` No item with id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Succeeded to get item with id ${id}`,
      item: result,
    });
  });
};

// // =================================================== // done
// This function to update item by id.
const updateItemById = (req, res) => {
  const { image, title, description, category, price } = req.body;
  const { id } = req.query;

  const query = `UPDATE items SET image=?, title=?, description=? , category = ? , price=? WHERE id=?;`;

  const data = [image, title, description, category, price, id];

  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (results.changedRows == 0) {
      res.status(500).json({
        success: false,
        massage: `The item : ${id} is not found`,
        err: err,
      });
    }

    res.status(201).json({
      success: true,
      massage: `the item updated`,
      results: results,
    });
  });
};

module.exports = {
  createNewItem,
  getAllItems,
  deleteItemById,
  getItemById,
  updateItemById,
};
