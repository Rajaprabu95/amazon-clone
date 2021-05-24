import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import styles from "./Payment.module.css";
import { getBasketTotal } from "../reducer";
import axios from "../axios";
import { useHistory } from "react-router";
import { db } from "../firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
    // effect
    // return () => {
    //     cleanup
    // }
  }, [basket]);

  // console.log("The Secret Is : >>>>> ", clientSecret);

  const paymentChangeHandler = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : " ");
  };

  const paymentSubmitHandler = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });

    setProcessing(false);
  };

  return (
    <div className={styles.payment}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.title}>
            <h3>Delivery Address</h3>
          </div>
          <div className={styles.address}>
            <p>{user?.email}</p>
            <p>123 Lake View Apartment</p>
            <p>Anna Nagar, Chennai</p>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>
            <h3>Review Items and Delivery</h3>
          </div>
          <div className={styles.product}>
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
        </div>
        <div className={styles.section}>
          <div className={styles.title}>
            <h3>Payment Method</h3>
          </div>
          <div className={styles.paymentDetails}>
            <form onSubmit={paymentSubmitHandler}>
              <CardElement onChange={paymentChangeHandler} />
              <div className={styles.priceContainer}>
                <CurrencyFormat
                  renderText={(value) => <h3>Order total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
