# ACM Paper Scraper
This is a tool for scraping journal article landing pages in the ACM Digital Library to retrieve the paper title, author(s), and journal name. It is intended to expeded the process of updating [this web page](https://www.acm.org/publications/practical-content-papers) on the ACM website.

## Getting Started

### Prerequisites
Be sure to have Node.js and Git installed on your machine. 

### Installing
After cloning into a local copy of the repo, run `npm install` to install dependencies. Run `npm install -g nodemon` to install Nodemon globally, then run the `nodemon` command to launch the application on localhost:3000 and automatically refresh the browser when server-side changes are saved. 

## Server
Node and Express handles the request/response cycle and data transfer from server to client. 

## Web Scraping
Once the user enters paper URLs and kicks off a search, the URLs are sent to the server as a POST request via the fetch API. From there, I use the (Request-Promise)[https://www.npmjs.com/package/request-promise] HTTP request client to retrieve the raw HTML from the target page, and (Cheerio)[https://cheerio.js.org/] to parse the HTML to retrieve the desired text.
