🔗 URL Shortener (live demo-https://url-shortner-5-ag8u.onrender.com/)

A simple URL Shortener web application built using Node.js and Express.js.
This project allows users to convert long URLs into short, easy-to-share links and redirects users to the original URL when the shortened link is accessed.

📌 Features

Generate short URLs from long URLs

Redirect short URLs to the original URL

Prevents duplicate short codes

Displays all shortened URLs

Simple and clean UI

Server-side rendering using HTML templates

🛠 Tech Stack

Backend: Node.js, Express.js

Frontend: HTML, CSS

Data Storage: In-memory object / JSON (can be extended to DB)

📂 Project Structure
url-shortener/
│
├── app.js
├── views/
│   └── index.html
├── public/
│   └── style.css
└── README.md

⚙️ How It Works

User enters a long URL

Server generates a unique short code

Short URL is created and stored

When the short URL is accessed, the server redirects to the original URL


