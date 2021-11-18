function displayNotepad() {

}





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
    .then (data => obj = data)
    .then (() => document.querySelector("#error").innerHTML = obj.text)

}

function editNote() {
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
    });
}


function start() {
    let newButton = document.querySelector("#newNote");
    let viewButton = document.querySelector("#viewNote");
    let editButton = document.querySelector("#editNote");
    let deleteButton = document.querySelector("#removeNote");
    let noteButton = document.querySelector("#addNote");

    newButton.addEventListener("click", displayNotepad);
    viewButton.addEventListener("click", viewNote);
    editButton.addEventListener("click", editNote);
    deleteButton.addEventListener("click", deleteNote);
    noteButton.addEventListener("click", addNote)
}

window.addEventListener("load", start);