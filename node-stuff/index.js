
// All if statements currently filled with testing data 

const fs = require("fs");
const http = require("http");

// Headers for Access Control to allow requests from our local machine 
// to go through, since they have the same origin as our server
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
    'Content-Type': 'application/json'
  };

const server = http.createServer((req, res) => {
    res.writeHead(200, headers);
    // Get requests don't allow a body, so we use post for both viewing and creating a new note since we need a body to search for an existing note 
    if (req.method === 'POST') { // Use for adding note
        // Code to read data from a message found on nodejs website
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        
        req.on('end', () => {
            let info = JSON.parse(data);
            let username = info.name;
            let filePath = "./Notes/" + username + ".txt";      //Creates the right file path for the notes in our local Notes folder
            let note;

            if (info.type === "Add") {

                note = info.text;     
            
                fs.writeFile(filePath, note, err => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
                
                res.end();
            }
            else if (info.type === "View"){
                
                fs.readFile(filePath, 'utf8', (err, message) => {
                    if (err) {
                        console.error(err);
                        note = {
                            "text": "No note on file for this username"
                        };
                    }
                    else {
                        note = {
                            "text": message
                        };
                    }
                    res.end(JSON.stringify(note)); 
                });  
            }
        })
        
    } 
    else if (req.method === 'PUT') { // Use for updating note
        console.log("put");
    }
    else if (req.method === 'DELETE') { // Use for deleting note
        console.log("delete");
    }
});

server.listen(8000);

//req.query for inputs

//fs.exists to check if username exists