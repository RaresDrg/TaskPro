import mongoose from "mongoose";
import app from "./app.js";
import { envVariables } from "./config/index.js";

(async () => {
  try {
    await mongoose.connect(envVariables.DB_URI);
    console.log("✅ [MongoDB] Connected successfully");

    app.listen(envVariables.PORT, () =>
      console.log(`✅ [Server] Listening on port: ${envVariables.PORT}`),
    );
  } catch (error) {
    console.error("❌ [Startup] Failed to initialize");
    console.error(error);
    process.exit(1);
  }
})();
