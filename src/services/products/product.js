import express from "express";
import ProductsModel from "./schema.js";
import createHttpError from "http-errors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "product",
    },
  }),
}).single("cover");

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
    const product = await ProductsModel.find().limit(10).sort({ price: 1 });
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

productsRouter.post(
  "/:productId/cover",
  cloudinaryUploader,
  async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const updatedProduct = await ProductsModel.findByIdAndUpdate(
        productId,
        { imageUrl: req.file.path },
        {
          new: true,
        }
      );
      if (updatedProduct) {
        res.send(updatedProduct);
      } else {
        next(createHttpError(404, `Product with id ${productId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

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

productsRouter.get("/:productId/review", async (req, res, next) => {
  try {
    const product = await ProductsModel.findById(req.params.productId);
    if (product) {
      res.send(product.reviews);
    } else {
      res.status(404).send(`Not found`);
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId/review/:reviewId", async (req, res, next) => {
  try {
    const product = await ProductsModel.findById(req.params.productId);
    const findReview = product.reviews?.find(
      findReview => findReview._id.toString() === req.params.reviewId
    );
    if (findReview) {
      res.send(findReview);
    } else {
      next(
        createHttpError(
          404,
          `Product with Id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/:productId/review/:reviewId", async (req, res, next) => {
  try {
    const product = await ProductsModel.findById(req.params.productId);
    if (product) {
      const index = product.reviews.findIndex(
        reviews => reviews._id.toString() === req.params.reviewId
      );

      if (index !== -1) {
        product.reviews[index] = {
          ...product.reviews[index].toObject(),
        };

        await product.save();
        res.send(product);
      } else {
        next(
          createHttpError(
            404,
            `Review with id ${req.params.commentId} not found!`
          )
        );
      }
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

productsRouter.delete(
  "/:productId/review/:reviewId",
  async (req, res, next) => {
    try {
      const modifiedBlogPost = await ProductsModel.findByIdAndUpdate(
        req.params.productId,
        { $pull: { reviews: { _id: req.params.reviewId } } }, // HOW
        { new: true }
      );
      if (modifiedBlogPost) {
        res.send(modifiedBlogPost);
      } else {
        next(
          createHttpError(
            404,
            `Product with Id ${req.params.productId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default productsRouter;
