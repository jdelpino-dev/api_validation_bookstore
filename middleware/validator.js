import { Validator } from "jsonschema";

function validateSchema(schema) {
  return (req, res, next) => {
    const v = new Validator();
    const result = v.validate(req.body, schema);
    if (!result.valid) {
      const errors = result.errors.map((error) => error.stack);
      return res.status(400).json({ errors });
    }
    next();
  };
}

export default validateSchema;
