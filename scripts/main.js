let storedUsername;

// Clears pages inputs when new notes are added
function clearPage() { 
    storedUsername = '';

    document.querySelector("#textpad").style.display = "none";
    document.querySelector("#textpad").value = '';

    document.querySelector("#note").style.display = "none";
    document.querySelector("#note").innerHTML= '';

    document.querySelector("#addNote").style.display = "none";
    document.querySelector("#editNote").style.display = "none";
    document.querySelector("#removeNote").style.display = "none";
    document.querySelector("#updateNote").style.display = "none";
    document.querySelector("#clear").style.display = "none";

    document.querySelector("#error").style.display = "none";
    document.querySelector("#display").style.display = "none";
}

function displayNotepad() {
    let username = document.querySelector("#username").value;
    clearPage();

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        document.querySelector("#error").style.display = "block";
        return;
    }

    document.querySelector('#textpad').style.display = "block";
    document.querySelector('#addNote').style.display = "inline-block";
    document.querySelector('#clear').style.display = "inline-block";
    document.querySelector("#error").style.display = "none";
}

function displayEditableNote() {
    let username = document.querySelector("#username").value;
    document.querySelector('#textpad').value = document.querySelector('#note').innerHTML;
    document.querySelector('#textpad').style.display = "block";

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        document.querySelector("#error").style.display = "block";
        return;
    }

    document.querySelector('#textpad').style.display = "block";
    document.querySelector('#updateNote').style.display = "inline-block";
    document.querySelector("#error").style.display = "none";
}

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
    username = document.querySelector("#username").value;
    document.querySelector("#textpad").style.display = "none";
    document.querySelector("#addNote").style.display = "none";
    document.querySelector("#display").style.display = "none";
    document.querySelector("#error").style.display = "none";

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        document.querySelector("#error").style.display = "block";
        return;
    }

    fetch(`http://localhost:8000/${username}`, {
        method: 'GET'
    })
    .then (function(response) {
        if (response.status == "200") {
            document.querySelector("#note").style.display = "block";
            document.querySelector("#editNote").style.display = "inline-block";
            document.querySelector("#removeNote").style.display = "inline-block";
            document.querySelector("#error").style.display = "none";
        }
        return response.json();
    })
    .then (data => {
        document.querySelector("#note").innerHTML = data.text;
        document.querySelector("#note").style.display = "block";
    });

    storedUsername = username; // Used for editing and deleting note once it's being viewed so th eusername can't be changed
    document.querySelector("#clear").style.display = "inline-block"
}

function editNote() { 
    username = storedUsername;
    let note = document.querySelector("#textpad").value;    

    if (note == '') { 
        document.querySelector("#error").innerHTML = "Please enter a new note or select remove if you want to delete this note";    
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
    username = storedUsername;

    fetch(`http://localhost:8000/${username}`, {
        method: 'DELETE'
    })
    .then (function(response) {
        if (response.status == "200") {
            document.querySelector("#display").innerHTML = "Your note has been removed";
            document.querySelector("#display").style.display = "block";
            document.querySelector("#note").innerHTML = "Note no longer available";
            document.querySelector("#editNote").style.display = "none";
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
    let clearButton = document.querySelector("#clear");

    newNoteButton.addEventListener("click", displayNotepad);
    viewButton.addEventListener("click", viewNote);
    editButton.addEventListener("click", displayEditableNote); // Change to displayEditableNote function
    saveChangesButton.addEventListener("click", editNote);
    deleteButton.addEventListener("click", deleteNote);
    noteButton.addEventListener("click", addNote);
    clearButton.addEventListener("click", clearPage);
}

window.addEventListener("load", start);