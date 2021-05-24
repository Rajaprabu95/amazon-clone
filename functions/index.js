/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IuFTSSAY2TYKutGXqsis4vyJrsHqPznkTGq7I5v2JFEV2x66gQEHESFcXY3mXTmBXRL00DvyxuuJm"
); // Pushed fake stripe key

// API

// -App Config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// -API routes
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  //   console.log("Payment Request Received for : ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/", (req, res) => res.status(200).send("hello world"));

// Listen Command
exports.api = functions.https.onRequest(app);
