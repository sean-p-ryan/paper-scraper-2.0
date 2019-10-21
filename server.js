const connect = require('connect')
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const http = require('http');
const bodyParser = require('body-parser')


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
    console.log(req);
});