let storedUsername;

function displayNotepad() {
    let username = document.querySelector("#username").value;
    document.querySelector('#textpad');

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        document.querySelector("#error").style.display = "block";
        return;
    }

    document.querySelector('#textpad').style.display = "block";
    document.querySelector('#addNote').style.display = "block";
    document.querySelector("#error").style.display = "none";
}

function displayEditableNote() {
    let username = document.querySelector("#username").value;
    document.querySelector('#textpad').innerHTML = document.querySelector('#note').innerHTML;
    document.querySelector('#textpad').style.display = "block";

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        document.querySelector("#error").style.display = "block";
        return;
    }

    document.querySelector('#textpad').style.display = "block";
    document.querySelector('#updateNote').style.display = "block";
    document.querySelector("#error").style.display = "none";
}

//      Update all messages to show in new HTML element for messages instead of error       //

function addNote() {
    let username = document.querySelector("#username").value;
    let note = document.querySelector("#textpad").value;


    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        document.querySelector("#error").style.display = "block";
        return;
    }
    else if (note == '') {
        document.querySelector("#error").innerHTML = " Please enter a note";
        document.querySelector("#error").style.display = "block";
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
        if (response.status == "200") {
            document.querySelector("#display").innerHTML = "Your note has been added!";
            document.querySelector("#display").style.display = "block";
            document.querySelector("#error").style.display = "none";
        }
        else { 
            document.querySelector("#error").innerHTML = "There was an issue trying to add your note";
            document.querySelector("#error").style.display = "block";
            document.querySelector("#display").style.display = "none";
        }
    });
    document.querySelector("#error").style.display = "none";

}

function viewNote() {
    let username = document.querySelector("#username").value;

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        document.querySelector("#error").style.display = "block";
        return;
    }

    fetch(`http://localhost:8000/${username}`, {
        method: 'GET'
    })
    .then (response => response.json())
    .then (data => {
        document.querySelector("#note").innerHTML = data.text;
    });

    storedUsername = username;
    
    document.querySelector("#note").style.display = "block";
    document.querySelector("#editNote").style.display = "block";
    document.querySelector("#removeNote").style.display = "block";

}

function editNote() {   //Link this to a save changes button
    let username = document.querySelector("#username").value;
    let note = document.querySelector("#textpad").value;    // Query text box edited note is in


    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        document.querySelector("#error").style.display = "block";
        return;
    }
    else if (note == '') { 
        document.querySelector("#error").innerHTML = " Please enter a note";    // Change this for edited note textbox
        document.querySelector("#error").style.display = "block";
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
        if (response.status == "200") {
            document.querySelector("#display").innerHTML = "Note updated!";
            document.querySelector("#display").style.display = "block";
            document.querySelector("#error").style.display = "none";
        }
        else {
            document.querySelector("#error").innerHTML = "There was an issue trying to update your note";
            document.querySelector("#error").style.display = "block";
            document.querySelector("#display").style.display = "none";
        }
    });
}

function deleteNote() {
    let username = document.querySelector("#username").value;

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        document.querySelector("#error").style.display = "block";
        return;
    }  

    fetch(`http://localhost:8000/${username}`, {
        method: 'DELETE'
    })
    .then (function(response) {
        if (response.status == "200") {
            document.querySelector("#display").innerHTML = "Your note has been removed";
            document.querySelector("#display").style.display = "block";
            document.querySelector("#error").style.display = "none";
        }
        else { 
            document.querySelector("#error").innerHTML = "There was an issue trying to delete your note";
            document.querySelector("#error").style.display = "block";
            document.querySelector("#display").style.display = "none";
        }
    });
}


function start() {
    let newNoteButton = document.querySelector("#newNote");
    let viewButton = document.querySelector("#viewNote");
    let editButton = document.querySelector("#editNote"); // Change to show note in an editable text box
    let saveChangesButton = document.querySelector("#updateNote"); 
    let deleteButton = document.querySelector("#removeNote");
    let noteButton = document.querySelector("#addNote");

    newNoteButton.addEventListener("click", displayNotepad);
    viewButton.addEventListener("click", viewNote);
    editButton.addEventListener("click", displayEditableNote); // Change to displayEditableNote function
    saveChangesButton.addEventListener("click", editNote);
    deleteButton.addEventListener("click", deleteNote);
    noteButton.addEventListener("click", addNote);

}

window.addEventListener("load", start);