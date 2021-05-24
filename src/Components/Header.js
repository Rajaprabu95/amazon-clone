import React from "react";
import styles from "./Header.module.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";

function Header() {
  const [{ basket, user }] = useStateValue();

  const authHandler = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className={styles.header}>
      <Link to="/">
        <img
          className={styles.logo}
          alt="logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className={styles.search}>
        <input className={styles.searchInput} type="text" />
        <SearchIcon className={styles.searchIcon} />
      </div>
      <div className={styles.nav}>
        <Link to={!user && "/login"} style={{ textDecoration: "none" }}>
          <div onClick={authHandler} className={styles.item}>
            <span className={styles.itemLineOne}>
              Hello {user ? user?.email : "Guest"}
            </span>
            <span className={styles.itemLineTwo}>
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders" style={{ textDecoration: "none" }}>
          <div className={styles.item}>
            <span className={styles.itemLineOne}>Returns</span>
            <span className={styles.itemLineTwo}>& orders</span>
          </div>
        </Link>

        <div className={styles.item}>
          <span className={styles.itemLineOne}>Your</span>
          <span className={styles.itemLineTwo}>Prime</span>
        </div>
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <div className={styles.basket}>
            <ShoppingBasketIcon />
            <span className={`${styles.itemLineTwo} ${styles.basketCount} `}>
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
