function displayNotepad() {

}

function displayEditableNote() {

}

//      Update all messages to show in new HTML element for messages instead of error       //

function addNote() {
    let username = document.querySelector("#username").value;
    let note = document.querySelector("#textpad").value;


    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        return;
    }
    else if (note == '') {
        document.querySelector("#error").innerHTML = " Please enter a note";
        return;
    }

    let info = {
        "note": note
    };

    console.log(JSON.stringify(info));
    fetch(`http://localhost:8000/${username}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    .then (function(response) {
        if (response.status == "200")
            document.querySelector("#error").innerHTML = "Your note has been added!";
        else 
            document.querySelector("#error").innerHTML = "There was an issue trying to add your note";
    });

}

function viewNote() {
    let username = document.querySelector("#username").value;

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        return;
    }

    fetch(`http://localhost:8000/${username}`, {
        method: 'GET'
    })
    .then (response => response.json())
    .then (data => {
        document.querySelector("#error").innerHTML = data.text;
    });




}

function editNote() {   //Link this to a save changes button
    let username = document.querySelector("#username").value;
    let note = document.querySelector("#textpad").value;    // Query text box edited note is in


    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        return;
    }
    else if (note == '') { 
        document.querySelector("#error").innerHTML = " Please enter a note";    // Change this for edited note textbox
        return;
    }

    let info = {
        "note": note
    };

    console.log(JSON.stringify(info));
    fetch(`http://localhost:8000/${username}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    })
    .then (function(response) {
        if (response.status == "200")
            document.querySelector("#error").innerHTML = "Note updated!";
        else 
            document.querySelector("#error").innerHTML = "There was an issue trying to update your note";
    });
}

function deleteNote() {
    let username = document.querySelector("#username").value;

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        return;
    }  

    fetch(`http://localhost:8000/${username}`, {
        method: 'DELETE'
    })
    .then (function(response) {
        if (response.status == "200")
            document.querySelector("#error").innerHTML = "Your note has been removed";
        else 
            document.querySelector("#error").innerHTML = "There was an issue trying to delete your note";
    });
}


function start() {
    let newNoteButton = document.querySelector("#newNote");
    let viewButton = document.querySelector("#viewNote");
    let editButton = document.querySelector("#editNote"); // Change to show note in an editable text box
    //let saveChangesButton = document.querySelector("updateNote"); Link to save changes button
    let deleteButton = document.querySelector("#removeNote");
    let noteButton = document.querySelector("#addNote");

    newNoteButton.addEventListener("click", displayNotepad);
    viewButton.addEventListener("click", viewNote);
    editButton.addEventListener("click", editNote); // Change to displayEditableNote function
    //saveChangesButton.addEventListener("click", editNote);
    deleteButton.addEventListener("click", deleteNote);
    noteButton.addEventListener("click", addNote)
}

window.addEventListener("load", start);