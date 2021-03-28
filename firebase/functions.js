const functions = require("firebase-functions");
/* eslint max-len: ["error", { "ignoreStrings": true }]*/
const stripe = require("stripe")("sk_test_fill", {apiVersion: ""});
/* eslint-disable-next-line */
const endpointSecret = "whsec_bT5Y6xeP16icQiVzQByPa79b1hBSbDz2";
const cors = require("cors")({origin: true});


/* eslint-disable-next-line */
exports.getCheckoutSession = functions.https.onRequest(async (request, response) => {
  const successUrl = request.query.successUrl;
  const cancelUrl = request.query.cancelUrl;
  /* eslint-disable-next-line */

  console.log("Creating Stripe session for sale ${successUrl}");
  const stripeCheckout = {
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_fill",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: successUrl + "?session_id={CHECKOUT_SESSION_ID",
    cancel_url: cancelUrl,
  };

  const session = await stripe.checkout.sessions.create(stripeCheckout);

  cors(request, response, () => {
    response.json({status: "success", sessionId: session.id});
  });
});
