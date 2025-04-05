import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv"
import {getProducts,insertProducts} from "./controller/controls";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/products", async (req: Request, res: Response) => {
  await getProducts(req, res);
});

// POST scrape route
app.post("/scrape", async (req: Request, res: Response) => {
  await  insertProducts(req, res);
})

const PORT=process.env.PORT||8000
app.listen(PORT, (err) => {
  if (err) console.log("Error found out while running " + err);
  else console.log(`Server is running on port ${PORT}`);
});