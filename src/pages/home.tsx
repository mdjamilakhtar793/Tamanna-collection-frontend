import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };
  if (isError) toast.error("Cannot fetch the Products");
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      <main>
        {isLoading ? (
          <Loader />
        ) : (
          data?.products.map((item) => {
            return (
              <ProductCard
                key={item._id}
                productId={item._id}
                name={item.name}
                price={item.price}
                stock={item.stock}
                handler={addToCartHandler}
                photo={item.photo}
              />
            );
          })
        )}
      </main>
    </div>
  );
};

export default Home;
