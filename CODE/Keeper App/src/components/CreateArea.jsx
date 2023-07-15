import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';

function CreateArea(props) {

    const [isExpanded, setExpanded] = useState(false);

    const [note, setNote] = useState({title: "", content: ""});

    function handleChange(event) {
        const {name, value} = event.target;
        
        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            }
        });
    }

    function submitNote(event) {
        event.preventDefault();

        props.onAdd(note);

        setNote({title: "", content: ""});
    }

    return (
        <div>
            <form className="create-note">
                {isExpanded ? <input onChange={handleChange} name="title" placeholder="Title" value={note.title} /> : null}
                <textarea onClick={() => setExpanded(true)} onChange={handleChange} name="content" placeholder="Take a note..." rows={isExpanded ? 3 : 1} value={note.content} />
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea