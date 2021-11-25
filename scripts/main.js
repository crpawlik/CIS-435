let storedUsername, notes, editIndex, viewing;

// Clears pages inputs when new notes are added or when resetting the page
function clearPage() { 
    storedUsername = '';
    notes = '';
    editIndex = '';
    viewing = false;

    document.querySelector("#textpad").style.display = "none";
    document.querySelector("#textpad").value = '';
    wordCount();

    document.querySelector("#note").style.display = "none";
    document.querySelector("#note").innerHTML= '';

    document.querySelector("#addNote").style.display = "none";
    document.querySelector("#editNote").style.display = "none";
    document.querySelector("#removeNote").style.display = "none";
    document.querySelector("#updateNote").style.display = "none";
    document.querySelector("#cancelEdit").style.display = "none";
    document.querySelector("#clear").style.display = "none";

    document.querySelector("#error").style.display = "none";
    document.querySelector("#display").style.display = "none";
}

function clearEdit() {
    document.querySelector("#textpad").style.display = "none";
    document.querySelector("#textpad").value = '';

    document.querySelector("#updateNote").style.display = "none";
    document.querySelector("#cancelEdit").style.display = "none";
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
    let username = storedUsername;
    let checkedNotes = document.querySelectorAll('input[name="notes"]:checked');

    if (checkedNotes.length == 0){
        document.querySelector("#error").innerHTML = "You have no notes selected, please select one note to edit";
        document.querySelector("#error").style.display = "block";
        return;
    }
    else if (checkedNotes.length > 1) {
        document.querySelector("#error").innerHTML = "You have more than one note selected, please select only one note to edit";
        document.querySelector("#error").style.display = "block";
        return;
    }
    else
        editIndex = checkedNotes[0].value;

    document.querySelector('#textpad').value = notes[editIndex];
    document.querySelector('#textpad').style.display = "block";

    if (username == '') {
        document.querySelector("#error").innerHTML = "Please enter a username";
        document.querySelector("#error").style.display = "block";
        return;
    }

    document.querySelector('#textpad').style.display = "block";
    document.querySelector('#updateNote').style.display = "inline-block";
    document.querySelector('#cancelEdit').style.display = "inline-block";
    document.querySelector("#error").style.display = "none";
    document.querySelector("#display").style.display = "none";
}

// Adds a new note for a user, if one already exists it will append the note to the end
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

    fetch(`http://localhost:8000/${username}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info)
    }).then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }).then (function(response) {
        if (response.status == "200") {
            document.querySelector("#display").innerHTML = "Your note has been added!";
            document.querySelector("#display").style.display = "block";
            document.querySelector("#error").style.display = "none";
        }
    }).catch(function(error) {
        document.querySelector("#error").innerHTML = "There was an issue trying to add your note";
        document.querySelector("#error").style.display = "block";
        document.querySelector("#display").style.display = "none";
    });
    document.querySelector("#error").style.display = "none";
    document.querySelector("#textpad").value = '';

}

// Tries to get the note on file for the user from the server and dispalys it
function viewNote() {
    let username = document.querySelector("#username").value;
    
    if (username != storedUsername) {   // Removes previous notes if the username is changed to view a different user's notes
        document.querySelector("#note").innerHTML= '';
    }
    else if (viewing) {
        document.querySelector("#error").innerHTML = "You are already viewing your notes";
        document.querySelector("#error").style.display = "block";
        return;
    }
    
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
    .then(function(response) {
        if (response.status == "404") {
            document.querySelector("#error").innerHTML = "There are no notes available for this username";
            document.querySelector("#error").style.display = "block";
            return response;
        }
        else if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }).then (function(response) {
        if (response.status == "200") {
            document.querySelector("#note").style.display = "block";
            document.querySelector("#editNote").style.display = "inline-block";
            document.querySelector("#removeNote").style.display = "inline-block";
            document.querySelector("#error").style.display = "none";
        }
        return response.json();
    }).then (data => {
        notes = data.text.split('&&');   // Creates an array of out notes starting at 1 since the 0 index is empty
        console.log(notes);

        const div = document.querySelector("#note");
        const ul = document.createElement('ul');
        
        for (i = 1; i < notes.length; i++) {
            let note = notes[i];   // Replaces newline characters with line breaks to display properly

            const li = document.createElement('li');
            const input = document.createElement('input');
            const label = document.createElement('label');
            const val = document.createTextNode(note);

            input.type = "checkbox";
            input.name = "notes";
            input.value = i;

            label.appendChild(input);
            label.appendChild(val);
            label.id = "note" + i;

            li.appendChild(label);

            ul.appendChild(li);
        }
        div.appendChild(ul);
        div.style = "white-space: pre";     // Allows multiple lines to be displayed correctly for a note
        div.style.display = "block";
        viewing = true;
    }).catch(function(error) {
        document.querySelector("#error").innerHTML = "There was an issue trying to retrieve your note";
        document.querySelector("#error").style.display = "block";
        document.querySelector("#display").style.display = "none";
    });

    storedUsername = username; // Used for editing and deleting note once it's being viewed so the username can't be changed
    document.querySelector("#clear").style.display = "inline-block";
}

// Submits updated note to server and displays it
function editNote() { 
    let username = storedUsername;
    let editedNote = document.querySelector("#textpad").value;
    let note = '';    

    if (editedNote == '') { 
        document.querySelector("#error").innerHTML = "Please enter a new note or select remove if you want to delete this note";    
        document.querySelector("#error").style.display = "block";
        return;
    }

    notes[editIndex] = editedNote;

    for (i=1; i < notes.length; i++) {
        let text = '&&';        // Our note delimiter

        if (i > 1 && notes[i] == '')    // Skips the last element for when the array of notes has been resized
            continue;
        
        note += (text + notes[i]);
    }

    let info = {
        "note": note
    };

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

            document.querySelector("#updateNote").style.display = "none";
            document.querySelector(`#note${editIndex}`).innerHTML =  `<input type='checkbox' name='notes' value='${editIndex}'></input>` + editedNote;
            document.querySelector("#textpad").style.display = "none";
            document.querySelector("#textpad").value = "";
            document.querySelector("#cancelEdit").style.display = "none";
        }
        else {
            document.querySelector("#error").innerHTML = "There was an issue trying to update your note";
            document.querySelector("#error").style.display = "block";
            document.querySelector("#display").style.display = "none";
        }
    });
}

function deleteNote() {
    let username = storedUsername;
    let checkedNotes = document.querySelectorAll('input[name="notes"]:checked');
    let ids = [];

    document.querySelector("#textpad").value = "";
    document.querySelector("#textpad").style.display = "none";
    document.querySelector("#cancelEdit").style.display = "none";

    if (checkedNotes.length != 0){
        for (i = 0; i < checkedNotes.length; i++) {
            ids[i] = checkedNotes[i].value;
        }
    }
    else {
        document.querySelector("#error").innerHTML = "Please select the notes you want to delete";    
        document.querySelector("#error").style.display = "block";
        return;
    }

    fetch(`http://localhost:8000/${username}/${ids}`, {
        method: 'DELETE'
    })
    .then (function(response) {
        if (response.status == "200") {
            document.querySelector("#display").innerHTML = "Your notes have been removed";
            document.querySelector("#display").style.display = "block";

            const div = document.querySelector("#note");
            const ul = document.createElement('ul');
            let count = 1;

            div.innerHTML = '';
            
            for (i = 1; i < notes.length; i++) {
                if (ids.indexOf(`${i}`) != -1) {
                    notes[i] = '';
                    continue;
                }

                let note = notes[i];   // Replaces newline characters with line breaks to display properly

                const li = document.createElement('li');
                const input = document.createElement('input');
                const label = document.createElement('label');
                const val = document.createTextNode(note);

                input.type = "checkbox";
                input.name = "notes";
                input.value = count;

                label.appendChild(input);
                label.appendChild(val);
                label.id = "note" + count;

                li.appendChild(label);

                ul.appendChild(li);
                notes[count] = note;
                count ++;
            }

            notes[count] = '';

            if (notes[1] == '') {
                div.innerHTML = "";
                div.style.display = "none";

                document.querySelector("#error").style.display = "none";
                document.querySelector("#editNote").style.display = "none";
                document.querySelector("#updateNote").style.display = "none";
                document.querySelector("#removeNote").style.display = "none";
                viewing = false;
            }
            else
                div.appendChild(ul);

            document.querySelector("#error").style.display = "none";      
        }
        else { 
            document.querySelector("#error").innerHTML = "There was an issue trying to delete your notes";
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
    let cancelButton = document.querySelector("#cancelEdit");
    let clearButton = document.querySelector("#clear");

    newNoteButton.addEventListener("click", displayNotepad);
    viewButton.addEventListener("click", viewNote);
    editButton.addEventListener("click", displayEditableNote); // Change to displayEditableNote function
    saveChangesButton.addEventListener("click", editNote);
    deleteButton.addEventListener("click", deleteNote);
    noteButton.addEventListener("click", addNote);
    cancelButton.addEventListener("click", clearEdit);
    clearButton.addEventListener("click", clearPage);

}
window.addEventListener("load", start);