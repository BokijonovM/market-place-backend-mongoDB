import express from "express";
import ProductsModel from "./schema.js";
import createHttpError from "http-errors";


const productsRouter = express.Router();

export default productsRouter