import React from "react";
import styles from "./Home.module.css";
import Product from "./Product";

function Home() {
  let products = [
    {
      title: "Samsung Smartphone M31",
      price: 15000,
      imageUrl: "https://m.media-amazon.com/images/I/41+xWzgV8jL.jpg",
      rating: 4,
    },
    {
      title: "LG Refrigirator",
      price: 12000,
      imageUrl:
        "https://images-eu.ssl-images-amazon.com/images/I/31y+7PbofhL._AC_SX368_.jpg",
      rating: 4,
    },
    {
      title: "Boat EarPhone",
      price: 400,
      imageUrl: "https://m.media-amazon.com/images/I/31IdiM9ZM8L.jpg",
      rating: 5,
    },
    {
      title: "Pigeon Multicooker keetle",
      price: 2000,
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/51Y21By5TzL._SX679_.jpg",
      rating: 4,
    },
    {
      title: "Fossil Classic Watch",
      price: 5000,
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/G/31/img20/Watches/WinterflipWatches/brandqc/Fossil._SS680_QL85_.jpg",
      rating: 4,
    },
    {
      title: "Samsung LCD TV Product",
      price: 25000,
      imageUrl: "https://m.media-amazon.com/images/I/513lkJuezIL.jpg",
      rating: 4,
    },
  ];

  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        <img
          className={styles.homeImage}
          alt="Join prime now"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/Multititle/May/M17/reg/3000x1200_Hero-Tall_JPN._CB667961979_.jpg"
        />

        <div className={styles.homeRow}>
          <Product
            key="1"
            id="1"
            title={products[0].title}
            price={products[0].price}
            imageUrl={products[0].imageUrl}
            rating={products[0].rating}
          />
          <Product
            key="2"
            id="2"
            title={products[1].title}
            price={products[1].price}
            imageUrl={products[1].imageUrl}
            rating={products[1].rating}
          />
          {/* product */}
        </div>
        <div className={styles.homeRow}>
          <Product
            key="3"
            id="3"
            title={products[2].title}
            price={products[2].price}
            imageUrl={products[2].imageUrl}
            rating={products[2].rating}
          />
          <Product
            key="4"
            id="4"
            title={products[3].title}
            price={products[3].price}
            imageUrl={products[3].imageUrl}
            rating={products[3].rating}
          />
          <Product
            key="5"
            id="5"
            title={products[4].title}
            price={products[4].price}
            imageUrl={products[4].imageUrl}
            rating={products[4].rating}
          />
        </div>
        <div className={styles.homeRow}>
          <Product
            key="6"
            id="6"
            title={products[5].title}
            price={products[5].price}
            imageUrl={products[5].imageUrl}
            rating={products[5].rating}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
