const bookCreationSchema = {
  type: "object",
  properties: {
    isbn: { type: "string" },
    amazon_url: { type: "string" },
    author: { type: "string" },
    language: { type: "string" },
    pages: { type: "integer" },
    publisher: { type: "string" },
    title: { type: "string" },
    year: { type: "integer" },
  },
  required: [
    "isbn",
    "amazon_url",
    "author",
    "language",
    "pages",
    "publisher",
    "title",
    "year",
  ],
};

const bookUpdateSchema = {
  type: "object",
  properties: {
    amazon_url: { type: "string" },
    author: { type: "string" },
    language: { type: "string" },
    pages: { type: "integer" },
    publisher: { type: "string" },
    title: { type: "string" },
    year: { type: "integer" },
  },
};

const DB_URI = "postgresql://localhost/books-test";

module.exports = { DB_URI, bookCreationSchema, bookUpdateSchema };
