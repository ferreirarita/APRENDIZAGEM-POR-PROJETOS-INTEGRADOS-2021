import app from "./server";
import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

app.listen(process.env.APP_PORT);

export default app;
