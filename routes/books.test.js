import "dotenv/config"; // read .env files and make changes to env variables
import request from "supertest";
import app from "../app";
import db from "../db";

let originalNODE_ENV;

describe("Book Routes", () => {
  let bookIsbn = `1234567890`;
  let bookIsbn1 = `1111111111`;
  let bookIsbn2 = `2222222222`;
  let bookIsbn3 = `3333333333`;

  beforeAll(async () => {
    // Load environment variables for testing
    originalNODE_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = "test";

    // Ensure the database is connected and clean up before tests
    if (!db._connected) {
      await db.connect();
      db._connected = true;
    }

    // Clean up any pre-existing data in the database
    const response = await request(app).get("/books");
    const bookIsbns = response.body.books
      ? response.body.books.map((book) => book.isbn)
      : [];

    await Promise.all(
      bookIsbns.map(async (isbn) => {
        await request(app).delete(`/books/${isbn}`).expect(200);
      })
    );
  });

  afterAll(async () => {
    // Cleanup the books created during the tests
    const response = await request(app).get("/books");
    const bookIsbns = response.body.books
      ? response.body.books.map((book) => book.isbn)
      : [];

    await Promise.all(
      bookIsbns.map(async (isbn) => {
        await request(app).delete(`/books/${isbn}`).expect(200);
      })
    );

    // Close the database connection
    await db.end();
    // Restore the original NODE_ENV
    process.env.NODE_ENV = originalNODE_ENV;
  });

  describe("GET /books", () => {
    it("should return an empty array initially", async () => {
      const res = await request(app).get("/books");
      expect(res.status).toBe(200);
      expect(res.body.books).toEqual([]);
    });
  });

  describe("POST /books", () => {
    it("should create a new book", async () => {
      const newBook = {
        isbn: bookIsbn,
        amazon_url: "http://a.co/eobPtX2",
        author: "Author1",
        language: "English",
        pages: 200,
        publisher: "Publisher1",
        title: "Book1",
        year: 2020,
      };

      const res = await request(app).post("/books").send(newBook);
      expect(res.status).toBe(201);
      expect(res.body.book).toEqual(newBook);
    });

    it("should create three new books", async () => {
      const newBook1 = {
        isbn: bookIsbn1,
        amazon_url: "http://a.co/eobPtX1",
        author: "Author1",
        language: "English",
        pages: 150,
        publisher: "Publisher1",
        title: "Book1",
        year: 2019,
      };

      const newBook2 = {
        isbn: bookIsbn2,
        amazon_url: "http://a.co/eobPtX2",
        author: "Author2",
        language: "Spanish",
        pages: 250,
        publisher: "Publisher2",
        title: "Book2",
        year: 2020,
      };

      const newBook3 = {
        isbn: bookIsbn3,
        amazon_url: "http://a.co/eobPtX3",
        author: "Author3",
        language: "French",
        pages: 350,
        publisher: "Publisher3",
        title: "Book3",
        year: 2021,
      };

      const responses = await Promise.all([
        request(app).post("/books").send(newBook1).expect(201),
        request(app).post("/books").send(newBook2).expect(201),
        request(app).post("/books").send(newBook3).expect(201),
      ]);

      responses.forEach((res) => console.log(res.body)); // Debugging information
    });
  });

  describe("GET /books –PART 2–", () => {
    it("should return all books added so far", async () => {
      const res = await request(app).get("/books");
      console.log(res.body); // Debugging information
      expect(res.status).toBe(200);
      expect(res.body.books.length).toBe(4);
    });
  });

  describe("GET /books/:isbn", () => {
    it("should return the book with the given isbn", async () => {
      const res = await request(app).get(`/books/${bookIsbn}`);
      expect(res.status).toBe(200);
      expect(res.body.book).toEqual({
        isbn: bookIsbn,
        amazon_url: "http://a.co/eobPtX2",
        author: "Author1",
        language: "English",
        pages: 200,
        publisher: "Publisher1",
        title: "Book1",
        year: 2020,
      });
    });
  });

  describe("PUT /books/:isbn", () => {
    it("should update the book with the given isbn", async () => {
      const updatedBook = {
        amazon_url: "http://a.co/eobPtX3",
        author: "Author2",
        language: "Spanish",
        pages: 250,
        publisher: "Publisher2",
        title: "Book2",
        year: 2021,
      };

      const res = await request(app)
        .put(`/books/${bookIsbn}`)
        .send(updatedBook);
      expect(res.status).toBe(200);
      expect(res.body.book).toEqual({
        isbn: bookIsbn,
        ...updatedBook,
      });
    });
  });

  describe("DELETE /books/:isbn", () => {
    it("should delete the book with the given isbn", async () => {
      const res = await request(app).delete(`/books/${bookIsbn}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Book deleted" });

      const getRes = await request(app).get(`/books/${bookIsbn}`);
      expect(getRes.status).toBe(404);
    });
  });

  describe("GET /books –PART 3–", () => {
    it("should return all books left", async () => {
      const res = await request(app).get("/books");
      console.log(res.body); // Debugging information
      expect(res.status).toBe(200);
      expect(res.body.books.length).toBe(3);
    });
  });
});
