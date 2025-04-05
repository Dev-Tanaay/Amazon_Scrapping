<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Amazon Product Scraper API</h1>
    <h2>Overview</h2>
    <p>This project is a <strong>Node.js & TypeScript-based API</strong> for scraping product details from Amazon 
       and storing the data in a <strong>MySQL database</strong>. It uses <strong>Puppeteer</strong> for web 
       scraping and <strong>Express.js</strong> for handling API requests.</p>
    <h2>Features</h2>
    <ul>
        <li>Fetch stored products from the database using a <strong>GET</strong> request.</li>
        <li>Scrape Amazon product pages and insert data into the database via a <strong>POST</strong> request.</li>
        <li>Extract <strong>bullet points, price, images, and product title</strong> from product pages.</li>
        <li>Uses <strong>async/await</strong> for smooth database queries.</li>
        <li>Secure configuration via <strong>dotenv</strong> for environment variables.</li>
    </ul>
    <h2>Tech Stack</h2>
    <ul>
        <li><strong>Node.js</strong></li>
        <li><strong>TypeScript</strong></li>
        <li><strong>Express.js</strong></li>
        <li><strong>MySQL</strong></li>
        <li><strong>Puppeteer</strong></li>
        <li><strong>Cors</strong></li>
        <li><strong>Dotenv</strong></li>
    </ul>
    <h2>How to Run</h2>
    <ol>
        <li>Clone the repository:
            <pre><code>git clone https://github.com/Dev-Tanaay/Amazon_Scrapping.git </code></pre>
        </li>
        <li>Install dependencies:
            <pre><code>npm install</code></pre>
        </li>
        <li>Set up the <code>.env</code> file with:
            <pre><code>
MYSQL_HOST=&lt;your-mysql-host&gt;
MYSQL_USER=&lt;your-mysql-user&gt;
MYSQL_PASSWORD=&lt;your-mysql-password&gt;
PORT=&lt;desired port&gt;
            </code></pre>
        </li>
        <li>Start the server:
            <pre><code>npm start</code></pre>
        </li>
    </ol>
    <h2>API Endpoints</h2>
    <ul>
        <li><strong>GET `/products`</strong> → Fetch stored products.</li>
        <li><strong>POST `/scrape`</strong> → Scrape Amazon product details (Requires <code>{ "url": "&lt;amazon-product-url&gt;" }</code> in request body).</li>
    </ul>
</body>
</html>
