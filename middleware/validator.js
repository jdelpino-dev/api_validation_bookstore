import schemaValidator, {
  initializeSchemas,
} from "../config/validatorConfig.js";

let schemasLoaded = false;

const loadSchemas = async () => {
  await initializeSchemas();
  schemasLoaded = true;
};

const loadSchemasPromise = loadSchemas(); // Ensure schemas are loaded before exporting the validation functions

const validate = (schemaName) => {
  return async (req, res, next) => {
    try {
      await loadSchemasPromise; // Ensure schemas are loaded
      if (!schemasLoaded) {
        throw new Error("Schemas not loaded yet");
      }
      const schema = schemaValidator.validator.schemas[schemaName];
      if (!schema) {
        throw new Error(`Schema not found: ${schemaName}`);
      }
      schemaValidator.validate(req.body, schema);
      next();
    } catch (error) {
      console.error(`${schemaName} validation error:`, error);
      return res.status(400).json({ errors: error.message });
    }
  };
};

const validateBookCreation = validate(
  "internal:schemas/bookCreationSchema.json"
);
const validateBookUpdate = validate("internal:schemas/bookUpdateSchema.json");

export { validateBookCreation, validateBookUpdate };
