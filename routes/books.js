import express from "express";
import {
  validateBookCreation,
  validateBookUpdate,
} from "../middleware/validator.js";
import Book from "../models/book.js";

const router = new express.Router();

router.get("/", async (req, res, next) => {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

router.get("/:isbn", async (req, res, next) => {
  try {
    const book = await Book.findOne(req.params.isbn);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

router.post("/", validateBookCreation, async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json({ book });
  } catch (err) {
    return next(err);
  }
});

router.put("/:isbn", validateBookUpdate, async (req, res, next) => {
  try {
    const book = await Book.update(req.params.isbn, req.body);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:isbn", async (req, res, next) => {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

export default router;
