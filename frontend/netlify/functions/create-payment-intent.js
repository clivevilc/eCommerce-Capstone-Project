require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context, callback) => {
  const { amount, currency } = JSON.parse(event.body);
  console.log(event) // testing event

  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency,
      payment_method_types: ["card"],
    });

    console.log("paymentIntent created");
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log("error in paymentIntent, see below ");

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
