const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add note with POST request
app.post('/:username', (req, res) => {
    let username = req.params.username;
    let filePath = "./Notes/" + username + ".txt";
    let note = req.body.note;

    fs.writeFile(filePath, note, err => {
        if (err) {
            console.error(err);
            res.status(404).send('Unable to add note');
            return;
        }
    });
    
    res.send('Note successfully added');
})

// View note with GET request
app.get('/:username', (req, res) => {
    let username = req.params.username;

    let filePath = "./Notes/" + username + ".txt";      //Creates the right file path for the notes in our local Notes folder
    let note;

    fs.readFile(filePath, 'utf8', (err, message) => {
        if (err) {
            console.error(err);
            note = {
                "text": "No note on file for this username"
            };
            res.statusCode = 404;
        }
        else {
            note = {
                "text": message
            };
            res.statusCode = 200;
        }
        res.json(note);
    });

})

// Update note with PUT request
app.put('/:username', (req, res) => {
    let username = req.params.username;
    let filePath = "./Notes/" + username + ".txt";
    let note = req.body.note;

    // Replace note by writing the updated note to the same file, similar to adding a not
    fs.writeFile(filePath, note, err => {
        if (err) {
            console.error(err);
            res.status(404).send('Unable to update note');
            return;
        }
    });
    
    res.send('Note updated successfully');
})

// Delete note with DELETE request
app.delete('/:username', (req, res) => {
    let username = req.params.username;

    let filePath = "./Notes/" + username + ".txt";      //Creates the right file path for the notes in our local Notes folder

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('No note to remove');
            return;
        }
        else
        res.status(200).send('Note successfully deleted');
    });

})

app.listen(port, () => console.log(`Server running on port ${port}`));
