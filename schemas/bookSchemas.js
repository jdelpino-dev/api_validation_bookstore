const bookCreationSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "internal:schemas/bookCreationSchema.json",
  type: "object",
  title: "Book Creation Schema",
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
  properties: {
    isbn: { type: "string" },
    amazon_url: { type: "string", format: "uri" },
    author: { type: "string" },
    language: { type: "string" },
    pages: { type: "integer", minimum: 1 },
    publisher: { type: "string" },
    title: { type: "string" },
    year: { type: "integer", minimum: 0 },
  },
};

const bookUpdateSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "internal:schemas/bookUpdateSchema.json",
  type: "object",
  title: "Book Update Schema",
  properties: {
    isbn: { type: "string" },
    amazon_url: { type: "string", format: "uri" },
    author: { type: "string" },
    language: { type: "string" },
    pages: { type: "integer", minimum: 1 },
    publisher: { type: "string" },
    title: { type: "string" },
    year: { type: "integer", minimum: 0 },
  },
};

export { bookCreationSchema, bookUpdateSchema };
