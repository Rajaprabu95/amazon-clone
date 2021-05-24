import React from "react";
import styles from "./CheckoutProduct.module.css";
import { useStateValue } from "./../StateProvider";
import StarIcon from "@material-ui/icons/Star";
function CheckoutProduct(props) {
  const [, dispatch] = useStateValue();

  const removeProductHandler = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      item: {
        id: props.id,
      },
    });
  };

  return (
    <div className={styles.product}>
      <img src={props.imageUrl} alt="" />
      <div className={styles.productInfo}>
        <p className={styles.title}>{props.title}</p>
        <p className={styles.price}>
          <small>₹</small>
          <strong>{props.price}</strong>
        </p>
        <div className={styles.rating}>
          {Array(props.rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} />
            ))}
        </div>
        {!props.hideButton && (
          <button onClick={removeProductHandler}>Remove this item</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
