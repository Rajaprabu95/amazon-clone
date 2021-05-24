import React from "react";
import { useStateValue } from "../StateProvider";
import styles from "./Product.module.css";
import { v4 as uuidv4 } from "uuid";
import StarIcon from "@material-ui/icons/Star";

function Product(props) {
  const [, dispatch] = useStateValue();

  const addToBasket = () => {
    // console.log("Inside addBasket");
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: uuidv4(),
        title: props.title,
        imageUrl: props.imageUrl,
        price: props.price,
        rating: props.rating,
      },
    });
  };

  return (
    <div className={styles.product}>
      <div className={styles.productInfo}>
        <p>{props.title}</p>
        <p className={styles.productPrice}>
          <small>₹</small>
          <strong>{props.price}</strong>
        </p>
        <div className={styles.productRating}>
          {Array(props.rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} />
            ))}
        </div>
      </div>
      <img src={props.imageUrl} alt="" />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
