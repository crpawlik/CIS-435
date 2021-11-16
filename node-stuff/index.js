// All if statements currently filled with testing data 

const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
      };
    res.writeHead(200, headers);
    
    if (req.method === 'GET') { // Use for view note
        console.log("get");
    }   
    else if (req.method === 'POST') { // Use for adding note
        console.log("post");
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
        console.log(JSON.parse(data)); // 'Buy the milk'
        res.end();
        })
    } 
    else if (req.method === 'PUT') { // Use for updating note
        console.log("put");
    }
    else if (req.method === 'DELETE') { // Use for deleting note
        console.log("delete");
    }
    res.end();
});

server.listen(8000);

//req.query for inputs

//fs.exists to check if username exists