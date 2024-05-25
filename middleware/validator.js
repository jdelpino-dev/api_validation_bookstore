/** Common config for bookstore. */

import { promises as fs } from "fs";
import { Validator } from "jsonschema";
import path from "path";

// Function to load schema from a file
async function loadSchema(schemaPath) {
  try {
    const data = await fs.readFile(schemaPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Failed to load schema from ${schemaPath}:`, error);
    throw error;
  }
}

// Function to initialize schemas and validator
async function initializeSchemas() {
  const schemaDir = path.join(process.cwd(), "schemas");

  const bookCreationSchema = await loadSchema(
    path.join(schemaDir, "bookCreationSchema.json")
  );
  const bookUpdateSchema = await loadSchema(
    path.join(schemaDir, "bookUpdateSchema.json")
  );

  // Initialize the JSON schema validator
  const validator = new Validator();

  // Load and add the definitions schema for resolving references
  const definitionsSchema = await loadSchema(
    path.join(schemaDir, "definitions.json")
  );
  validator.addSchema(
    definitionsSchema,
    "https://example.com/schemas/definitions.json"
  );

  return { bookCreationSchema, bookUpdateSchema, validator };
}

// Function to validate data against a schema
function validateData(validator, schema) {
  return (req, res, next) => {
    const result = validator.validate(req.body, schema);
    if (!result.valid) {
      const errors = result.errors.map((error) => error.stack);
      return res.status(400).json({ errors });
    }
    next();
  };
}

// Export the initialization function and validateData function
export { initializeSchemas, validateData };
