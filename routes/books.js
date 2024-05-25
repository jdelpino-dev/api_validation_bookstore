import express from "express";
import { initializeSchemas, validateData } from "../middleware/validator.js";
import Book from "../models/book.js";

const router = new express.Router();

let bookCreationSchema;
let bookUpdateSchema;
let validator;

// Initialize schemas and validator
initializeSchemas()
  .then((schemas) => {
    bookCreationSchema = schemas.bookCreationSchema;
    bookUpdateSchema = schemas.bookUpdateSchema;
    validator = schemas.validator;
  })
  .catch((error) => {
    console.error("Failed to initialize schemas:", error);
  });

/** GET / => {books: [book, ...]}  */
router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll();
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[isbn]  => {book: book} */
router.get("/:isbn", async function (req, res, next) {
  try {
    const book = await Book.findOne(req.params.isbn);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook}  */
router.post(
  "/",
  (req, res, next) =>
    validateData(validator, bookCreationSchema)(req, res, next),
  async function (req, res, next) {
    try {
      const book = await Book.create(req.body);
      return res.status(201).json({ book });
    } catch (err) {
      return next(err);
    }
  }
);

/** PUT /[isbn]   bookData => {book: updatedBook}  */
router.put(
  "/:isbn",
  (req, res, next) =>
    validateData(validator, bookUpdateSchema)(req, res, next),
  async function (req, res, next) {
    try {
      const book = await Book.update(req.params.isbn, req.body);
      return res.json({ book });
    } catch (err) {
      return next(err);
    }
  }
);

/** DELETE /[isbn]   => {message: "Book deleted"} */
router.delete("/:isbn", async function (req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

export default router;
