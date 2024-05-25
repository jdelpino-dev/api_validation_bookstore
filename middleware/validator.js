import { Validator } from "jsonschema";
import {
  bookCreationSchema,
  bookUpdateSchema,
} from "../schemas/bookSchemas.js";

const validator = new Validator();

const schemas = {
  bookCreationSchema,
  bookUpdateSchema,
};

function validateSchema(schemaName) {
  return function (req, res, next) {
    try {
      const schema = schemas[schemaName];
      if (!schema) {
        throw new Error(`Schema not found: ${schemaName}`);
      }
      const result = validator.validate(req.body, schema);
      if (!result.valid) {
        const errors = result.errors.map((error) => error.stack);
        throw new Error(`Validation failed: ${errors.join(", ")}`);
      }
      next();
    } catch (error) {
      console.error(`${schemaName} validation error:`, error);
      return res.status(400).json({ errors: error.message });
    }
  };
}

const validateBookCreation = validateSchema("bookCreationSchema");
const validateBookUpdate = validateSchema("bookUpdateSchema");

export { validateBookCreation, validateBookUpdate };
