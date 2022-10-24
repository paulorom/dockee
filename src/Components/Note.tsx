import React from "react";
import { INote } from "../Interfaces";

interface Props {
    note: INote;
    deleteNote(noteIDToDelete: number): void;
}

const Note = ({ note, deleteNote }: Props) => {
    const elemStyle = {
        width: `${note.width}px`,
        height: `${note.height}px`,
        top: `${note.top}px`,
        left: `${note.left}px`,
        background: `${note.background}`,
        zIndex: `${note.layer}`,
    };
    return (

        <div className="note" style={elemStyle}>
            <span>{note.description}</span>
        </div>
    );
};

export default Note;