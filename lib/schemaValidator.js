import { promises as fs } from "fs";
import { Validator } from "jsonschema";

class SchemaValidator {
  constructor() {
    this.validator = new Validator();
    this.schemasLoaded = false;
  }

  async loadSchema(schemaPath) {
    const data = await fs.readFile(schemaPath, "utf8");
    console.log(`Schema loaded from ${schemaPath}`);
    return JSON.parse(data);
  }

  async addSchema(schemaName, schemaPath) {
    const schema = await this.loadSchema(schemaPath);
    this.validator.addSchema(schema, schemaName);
    console.log(`Schema added: ${schemaName}`);
  }

  async loadAndAddSchemas(schemaPaths) {
    for (const [schemaName, schemaPath] of Object.entries(schemaPaths)) {
      await this.addSchema(schemaName, schemaPath);
    }
    this.schemasLoaded = true;
  }

  validate(data, schema) {
    if (!this.schemasLoaded) {
      throw new Error("Schemas not loaded");
    }
    console.log("Validating data against schema:", schema);
    const result = this.validator.validate(data, schema);
    console.log("Validation result:", result);
    if (!result.valid) {
      const errors = result.errors.map((error) => error.stack);
      throw new Error(`Validation failed: ${errors.join(", ")}`);
    }
  }
}

export default new SchemaValidator();
