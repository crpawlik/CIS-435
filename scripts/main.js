function displayNotepad() {

}



let username;



function addNote() {
    username = document.querySelector("#username").value;
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
        name: username,
        text: note
    };

    console.log(JSON.stringify(info));

    fetch('http://localhost:8000', {
        method: 'POST',
        body: JSON.stringify(info)
    })

}

function viewNote() {
    username = document.querySelector("#username").value;

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        return;
    }
        
    fetch('http://localhost:8000', {
        method: 'GET'
    })
}

function editNote() {
    username = document.querySelector("#username").value;

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        return;
    }

    fetch('http://localhost:8000', {
        method: 'PUT'
    })
}

function deleteNote() {
    username = document.querySelector("#username").value;

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        return;
    }  

    fetch('http://localhost:8000', {
        method: 'DELETE',
        credentials: "same-origin"
    })
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