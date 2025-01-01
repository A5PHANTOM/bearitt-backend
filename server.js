import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import dotenv from 'dotenv';
import { sequelize } from "./config/dbConfig.js";
import testRoutes from "./routes/testRoutes.js";
import userRoutes from './routes/userRoutes.js';

dotenv.config()
    const app = express();
    app.use(cors())
    app.use(morgan("dev"));
    app.use(express.json());
    async function main() {
        const port = process.env.PORT || 8080;
      
  
        try {
          await sequelize.sync({ force: false });
          app.listen(port, () => {
            console.log(`listening on port ${port}`);
          });
        } catch (error) {
          console.error("Unable to connect to the database:", error);
        }
      }
      main();

      app.use("/api/test", testRoutes);
      app.use("/api/user", userRoutes);
