import React from "react";
import { useStateValue } from "../StateProvider";
import styles from "./Checkout.module.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";

function Checkout() {
  const [{ basket }] = useStateValue();

  return (
    <div className={styles.checkout}>
      <div className={styles.checkoutLeft}>
        <img
          className={styles.checkoutAd}
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h2 className={styles.checkoutTitle}>Your Shopping Basket</h2>
        </div>
        {basket.map((item) => (
          <CheckoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            price={item.price}
            rating={item.rating}
          />
        ))}
      </div>

      <div className={styles.checkoutRight}>
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
