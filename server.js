const express = require('express');
const app = express();
const fetch = require('node-fetch');
const http = require('http');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const cheerio = require('cheerio');


const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

server.on("listening", () => {
    console.log(`server is listening for requests on port ${server.address().port}`);
});

// Define routes
app.post('/data/retrieve', (req, res) => {
    const url = req.body.paperURL;
    const papers = [];
    rp(url)
        .then(html => {
            const paper = [];
            // Push title into paper array
            paper.push(req.body.row)
            paper.push(cheerio('.large-text > h1:nth-child(1)', html).text());
            // Push authors into paper array
            paper.push(" " + cheerio("[title='Author Profile Page']", html).text());            
            // Push journal into paper array                
            paper.push(cheerio('table.medium-text:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1)', html).text())

            // Push full pdf URL into paper array
            paper.push(cheerio('#divmain > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(2)', html).attr('href'));

            papers.push(paper);
            console.log("Here's paper " + paper)
            console.log("Here's papers array " + papers)
            res.send(paper)
        })        
        .catch(err => {
            console.log(err)
        })
});