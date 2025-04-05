import { Request, Response } from "express";
import mysql from "mysql";
import puppeteer from "puppeteer";
import dotenv from "dotenv"

dotenv.config();

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "Scrape",
});

const queryAsync = (sql: string, values?: any[]) =>
    new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });

export async function getProducts(req: Request, res: Response) {
    try {
        const result: any = await queryAsync("SELECT * FROM amazon_product");
        if (result.length === 0) {
            return res.json({ message: "No products found" });

        }
        const parsed = result.map((item: any) => ({
            ...item,
            bullet_points: JSON.parse(item.bullet_points),
            images: JSON.parse(item.images),
        }));
        return res.json(parsed);

    } catch (err) {
        console.error("Query error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export async function insertProducts(req:Request,res:Response){
    const { url } = req.body;
      if (!url) {
        res.status(400).json({ error: "url is required" });
        return;
      }
      const browser = await puppeteer.launch();
      try {
        const page = await browser.newPage();
        await page.setUserAgent(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        );
        await page.goto(url,{waitUntil: "domcontentloaded",timeout:10000});
        await page.waitForSelector("#productTitle", { timeout: 10000 });
        const title = await page.$eval("#productTitle",(el)=>el.textContent?.trim() || "");
        const bullet_points = await page.$$eval(
          "#feature-bullets ul li span",
          (items) =>
            items
              .map((el) => el.textContent?.trim())
              .filter((text) => text && text.length > 0) as string[]
        );
        const price =(await page.$eval(".a-price .a-offscreen", (el) => el.textContent?.trim()).catch(() => null)) || "Price not found";
        const images = await page.$$eval("#altImages img", (imgs) =>
          imgs
            .map((img) => img.getAttribute("src"))
            .filter((src) => src)
            .map((src) => src!.replace(/_US\d+_.*/, "_SL1500_.jpg"))
        );
        const scraped_at = new Date().toISOString();
        await queryAsync(
          `INSERT INTO amazon_product (url, title, bullet_points, price, images, scraped_at) VALUES (?, ?, ?, ?, ?, ?)`,
          [url, title, JSON.stringify(bullet_points), price, JSON.stringify(images), scraped_at]
        );
        return res.json({ message: "Data has been inserted" });
        
      } catch (error) {
        console.error("Scraping error:", error);
        return res.status(500).json({ error: "Failed to scrape the product page" });
      } finally {
        await browser.close();
      }
}

