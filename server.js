import app from "./app.js";
import { initializeSchemas } from "./config/validatorConfig.js";

const PORT = process.env.PORT || 3300;

const startServer = async () => {
  try {
    await initializeSchemas();
    app.listen(PORT, () => {
      console.log(`Server starting on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize schemas:", error);
    process.exit(1);
  }
};

startServer();
