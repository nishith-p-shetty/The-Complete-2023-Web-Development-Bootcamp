import React, { useState } from 'react';

import Header from './Header';
import Note from './Note';
import Footer from './Footer';
import CreateArea from './CreateArea';

import notesfixed from '../notes';

function App() {

    const [notes, insertNotes] = useState([]);

    function addNote(newNote) {
        insertNotes((prevNotes) => {
            return ([...prevNotes, newNote]);
        });
    }

    function deleteNote(id) {
        insertNotes((prevNotes) => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            })
        });
    }

    return (
        <>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((nt, index) => {
                return (
                    <Note
                        key={index}
                        id={index}
                        title={nt.title}
                        content={nt.content}
                        onDelete={deleteNote}
                    />);
            })}
            {/*notesfixed.map(x => <Note key={x.key} title={x.title} content={x.content}/>)*/}
            <Footer />
        </>
    );
}

export default App;