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
        "name": username,
        "text": note,
        "type": "Add"
    };

    fetch('http://localhost:8000', {
        method: 'POST',
        body: JSON.stringify(info)
    });

}

function viewNote() {
    let username = document.querySelector("#username").value;
    let response;

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        return;
    }
    
    let info = {
        "name": username,
        "type": "View"
    };

    console.log(JSON.stringify(info));
    fetch('http://localhost:8000', {
        method: 'POST',
        body: JSON.stringify(info)
    })
    .then (response => response.json())
    .then (data => obj = data)
    .then (() => document.querySelector("#error").innerHTML = obj.text)

}

function editNote() {
    let username = document.querySelector("#username").value;

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        return;
    }

    fetch('http://localhost:8000', {
        method: 'PUT'
    });
}

function deleteNote() {
    let username = document.querySelector("#username").value;

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        return;
    }  

    fetch('http://localhost:8000', {
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