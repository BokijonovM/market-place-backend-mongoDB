import express from "express";
import ProductsModel from "./schema.js";
import createHttpError from "http-errors";

const productsRouter = express.Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductsModel(req.body);
    const { _id } = await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const product = await ProductsModel.find();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  const product = await ProductsModel.findById(req.params.productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send(`Product with id ${req.params.productId} not found!`);
  }
  try {
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const productUpdate = await ProductsModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (productUpdate) {
      res.send(productUpdate);
    } else {
      res
        .status(404)
        .send(`Product with id ${req.params.productId} not found!`);
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const deleteProduct = await ProductsModel.findByIdAndDelete(
      req.params.productId
    );
    if (deleteProduct) {
      res.send("Product deleted!");
    } else {
      res
        .status(404)
        .send(`Product with id ${req.params.productId} not found!`);
    }
  } catch (error) {
    next(error);
  }
});

//
//
//
// reviews *******************************************************************

productsRouter.post("/:productId/review", async (req, res, next) => {
  try {
    const updatedProduct = await ProductsModel.findByIdAndUpdate(
      req.params.productId,
      { $push: { reviews: req.body } },
      { new: true }
    );
    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      next(
        createHttpError(
          404,
          `Product with id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
