import { useSelector, useDispatch } from "react-redux";
// import { setCategories } from "../../reducer/item/index";

const Category = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      categories: state.itemsReducer.categories,
    };
  });
  const { categories, token, items } = state;
  console.log(categories);
  return (
    <>
      <h1>Category panel</h1>
    </>
  );
};
export default Category;
