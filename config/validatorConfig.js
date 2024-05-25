import { promises as fs } from "fs";
import { Validator } from "jsonschema";
import path from "path";

class SchemaValidator {
  constructor() {
    this.validator = new Validator();
  }

  async loadSchema(schemaPath) {
    const data = await fs.readFile(schemaPath, "utf8");
    return JSON.parse(data);
  }

  async addSchema(schemaName, schemaPath) {
    const schema = await this.loadSchema(schemaPath);
    this.validator.addSchema(schema, schemaName);
  }

  async loadAndAddSchemas(schemaPaths) {
    for (const [schemaName, schemaPath] of Object.entries(schemaPaths)) {
      await this.addSchema(schemaName, schemaPath);
    }
  }

  validate(data, schema) {
    const result = this.validator.validate(data, schema);
    if (!result.valid) {
      const errors = result.errors.map((error) => error.stack);
      throw new Error(`Validation failed: ${errors.join(", ")}`);
    }
  }
}

const schemaValidator = new SchemaValidator();

export const initializeSchemas = async () => {
  const schemaPaths = {
    "internal:schemas/definitions.json": path.join(
      process.cwd(),
      "schemas",
      "definitions.json"
    ),
    "internal:schemas/bookCreationSchema.json": path.join(
      process.cwd(),
      "schemas",
      "bookCreationSchema.json"
    ),
    "internal:schemas/bookUpdateSchema.json": path.join(
      process.cwd(),
      "schemas",
      "bookUpdateSchema.json"
    ),
  };

  await schemaValidator.loadAndAddSchemas(schemaPaths);
};

export default schemaValidator;
