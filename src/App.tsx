import React, { useEffect, useState } from 'react';
import Note from "./Components/Note";
import { INote } from "./interfaces"
import './App.css';

const App: React.FC = () => {
  const [id, setID] = useState<number>(0);
  const [top, setTop] = useState<number>(20);
  const [left, setLeft] = useState<number>(20);
  const [height, setHeight] = useState<number>(150);
  const [width, setWidth] = useState<number>(150);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("This is a new note, you can edit it by clicking here.");
  const [background, setBackground] = useState<string>("");
  const [layer, setLayer] = useState<number>(1);
  const [notes, setNotes] = useState<INote[]>([]);

  const [isMouseOverNote, setIsMouseOverNote] = useState<boolean>(false);

  const onAppMouseDown = (event: React.MouseEvent<HTMLElement>): void => {
    setLeft(event.pageX);
    setTop(event.pageY);
  }

  const onAppMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    setHeight(event.pageY - top)
    setWidth(event.pageX - left)
  }

  const onAppMouseUp = (event: React.MouseEvent<HTMLElement>) => {
    setHeight(event.pageY - top);
    setWidth(event.pageX - left);
    let newLayer = layer + 1;
    setLayer(newLayer)
    if(!isMouseOverNote)
      addNote();
  }

  const onNoteMouseOver = (event: React.MouseEvent<HTMLElement>) => {
    setIsMouseOverNote(true)
  }

  const onNoteMouseOut = (event: React.MouseEvent<HTMLElement>) => {
    setIsMouseOverNote(false)
  }

  const addNote = (): void => {
    const newNote = {
      id: id,
      top: top,
      left: left,
      width: width,
      height: height,
      isDeleted: false,
      background: background,
      description: description,
      layer: layer
    };
    setID(id+1)
    console.log(newNote)
    setNotes([...notes, newNote]);
  };

  const deleteNote = (noteIDToDelete: number): void => {
    console.log(noteIDToDelete)
    setNotes(
      notes.filter((note) => {
        console.log(noteIDToDelete)
        return note.id !== noteIDToDelete;
      })
    );
  };

  return (
    <div className="App"
      onMouseDown={onAppMouseDown}
      onMouseMove={onAppMouseMove}
      onMouseUp={onAppMouseUp}
    >
      <p className="fallback">You should use a screen greater that 1024px to use Sticky Notes</p>
      <p className="tip">Add a Note by drawing it on the blue screen, you should press the left mouse button</p>
      <div className="notes-list" onMouseOver={onNoteMouseOver} onMouseOut={onNoteMouseOut}>
        {notes.map((note: INote, key: number) => {
          return <Note key={note.id} note={note} deleteNote={deleteNote} />;
        })}
      </div>    
    </div>
  );
}

export default App;
