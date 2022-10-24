import React, { useEffect, useState } from 'react';
import Note from "./Components/Note";
import { INote } from "./Interfaces"
import './App.css';

const App: React.FC = () => {
  const [id, setID] = useState<number>(1);
  const [top, setTop] = useState<number>(20);
  const [left, setLeft] = useState<number>(20);
  const [height, setHeight] = useState<number>(150);
  const [width, setWidth] = useState<number>(150);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("Use the cursor of the mouse to create new notes");
  const [background, setBackground] = useState<string>("white");
  const [layer, setLayer] = useState<number>(0);

  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    addNote();
  }, [height]);

  const onAppMouseDown = (event: React.MouseEvent<HTMLElement>): void => {
    setLeft(event.pageX)
    setTop(event.pageY)
  }

  const onAppMouseMove = (event: React.MouseEvent<HTMLElement>) => {

  }

  const onAppMouseUp = (event: React.MouseEvent<HTMLElement>) => {
    setHeight(event.pageY - top)
    setWidth(event.pageX - left)
  }

  const addNote = (): void => {
    const newNote = { 
      id: 0, 
      top: top,
      left: left,
      width: width,
      height: height,
      isDeleted: false,
      background: background,
      description: description,
      layer: layer
    };
    setNotes([...notes, newNote]);
    setBackground("yellow")
  };

  const deleteNote = (noteIDToDelete: number): void => {
    setNotes(
      notes.filter((note) => {
        return note.id != id;
      })
    );
  };

  return (
    <div className="App"
      onMouseDown={onAppMouseDown}
      onMouseMove={onAppMouseMove}
      onMouseUp={onAppMouseUp}
    >

      {notes.map((note: INote, key: number) => {
        return <Note key={key} note={note} deleteNote={deleteNote} />;
      })}

    </div>
  );
}

export default App;
