import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Components/Orders";

const promise = loadStripe(
  "pk_test_51IuFTSSAY2TYKutG4fQZadMLCuZ5W3Sak47vNqSGyu6zdPL45ME8jxYQEwQT7GpNHCClpWglizC8E9F8FNY9POEw00ximERWIk"
);

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("The User Status is Changed : ", authUser);

      if (authUser) {
        // the user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div>
        {/* <h1>Hi raja, Lets build amazon store</h1> */}
        <Switch>
          <Route key="01" path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route key="0" path="/login">
            <Login />
          </Route>
          <Route key="1" path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route key="2" path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route key="3" path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
