import React, { useState } from "react";
import { INote } from "../Interfaces";

interface Props {
    note: INote;
    deleteNote(noteIDToDelete: number): void;
}

const Note = ({ note, deleteNote }: Props) => {

    const [textareaHeight, setTextareaHeight] = useState<number>(note.height);
    const [textareaWidth, setTextareaWidth] = useState<number>(note.width);
    const [background, setBackground] = useState<string>("");

    const onContentChange = (event: any) => {
        setTextareaHeight(event.target.clientHeight);
        setTextareaWidth(event.target.clientWidth);
    }

    const handleClick = (color: string) => {
        setBackground(color);
    }

    const elemStyle = {
        width: `${textareaWidth + 16}px`,
        height: `${textareaHeight + 36}px`,
        top: `${note.top}px`,
        left: `${note.left}px`,
        background: `${background}`,
        zIndex: `${note.layer}`
    };

    return (
        <div className="note" draggable style={elemStyle}>
            <div className="note-header">
                <div className="color-picker">
                    <span onClick={() => handleClick("#f2bbc0")} className="circle red"></span>
                    <span onClick={() => handleClick("#e5e047")} className="circle yellow"></span>
                    <span onClick={() => handleClick("#b2d94a")} className="circle green"></span>
                </div>
            </div>
            <textarea onMouseMove={onContentChange} style={{ 'height': textareaHeight, 'width': textareaWidth, 'background': background }} spellCheck="false" defaultValue={note.description} />
        </div>
    );
};

export default Note;