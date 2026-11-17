
import express from "express";
import {
  paymentMiddleware,
  x402ResourceServer
} from "@x402/express";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";

const app = express();
app.use(express.json());

const payTo = "0xBd6f1d5d1C73bB6D7cdA70982bC95Ab0F6b81C58";

const facilitator = new HTTPFacilitatorClient({
  url: "https://x402.primer.systems"
});

const resourceServer = new x402ResourceServer(facilitator)
  .register("network: "base",", new ExactEvmScheme());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "My Paid API is running!"
  });
});

app.use(
  paymentMiddleware(
    {
      "GET /hello": {
        accepts: [
          {
            scheme: "exact",
            price: "$0.01",
            network: "eip155:8453",
            payTo
          }
        ],
        description: "Access to My Paid API"
      }
    },
    resourceServer
  )
);

app.get("/hello", (req, res) => {
  res.json({
    success: true,
    message: "Hello from my paid API!",
    creator: "sadiarxd"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`My Paid API running on port ${PORT}`);
});
