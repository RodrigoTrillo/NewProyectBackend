const { Router, response } = require("express");
const fs = require("fs");
const CartDao = require("../dao/Cart.dao");

const router = Router();
const cart = CartDao;

//obtener el cart

router.get("/", async (req, res) => {
  try {
    const productsList = await cart.getProducts();
    res.json({ message: productsList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al acceder al carrito" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    let cartId = req.params.cid;
    cartId = parseInt(cartId);

    if (isNaN(cartId)) {
      res.send({ status: 404, message: "ID has to be a number" });
    } else {
      let response = await cart.getById(cartId);
      console.log(response);
      if (response != false) {
        if (typeof response === "object") {
          res.send(response.objects);
        } else {
          res.send(response);
        }
      } else {
        res.send({ status: 500, message: "Server cant find the file" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al acceder al carrito" });
  }
});

router.post("/", async (req, res) => {
  try {
    let response = await cart.create();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el carrito" });
  }
});

router.post("/:id/product/:pid", async (req, res) => {
  let total = req.params;
  console.log(total);
  let cartId = req.params.id;
  let productId = req.params.pid;
  let response = await cart.addProductToCart(cartId, productId);

  response == false
    ? res.send({ status: 500, message: "Server cant find the file" })
    : res.send(response);
});

router.delete("/:id", async (req, res) => {
  let cartId = req.params.id;
  res.json({ mensaje: `Metodo delete de Cart Id ${cartId}` });
});

module.exports = router;
