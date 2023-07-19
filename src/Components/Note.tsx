import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { INote } from "../Interfaces";

interface Props {
    note: INote;
    deleteNote(noteIDToDelete: number): void;
}

const Note = ({ note, deleteNote }: Props) => {

    const elementRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [left, setLeft] = useState(note.left);
    const [top, setTop] = useState(note.top);
    const [textareaHeight, setTextareaHeight] = useState<number>(note.height);
    const [textareaWidth, setTextareaWidth] = useState<number>(note.width);
    const [background, setBackground] = useState<string>("");
    const [layer, setLayer] = useState<number>(note.layer);

    const handleDragStart = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        setIsDragging(true);

        const element = elementRef.current;
        const handle = handleRef.current;

        const clientRect = element?.getBoundingClientRect();
        const handleRect = handle?.getBoundingClientRect();

        const x = event.clientX - (handleRect?.left ?? 0);
        const y = event.clientY - (handleRect?.top ?? 0);

        setOffsetX(x);
        setOffsetY(y);
        setLeft(clientRect?.left ?? 0);
        setTop(clientRect?.top ?? 0);
        setLayer(layer+100)
    }, []);

    const handleDrag = useCallback(
        (event: MouseEvent) => {
          event.preventDefault();
          if (!isDragging) return;
    
          const x = event.clientX - offsetX;
          const y = event.clientY - offsetY;
    
          setLeft(x);
          setTop(y);
        },
        [isDragging, offsetX, offsetY]
    );

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
          handleDrag(event);
        };
    
        const handleMouseUp = () => {
          handleDragEnd();
        };
    
        if (isDragging) {
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
        }
    
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleDrag, handleDragEnd, isDragging]);

    const onContentChange = (event: any) => {
        setTextareaHeight(event.target.clientHeight);
        setTextareaWidth(event.target.clientWidth);
    }

    const handleClick = (color: string) => {
        setBackground(color);
    }

    const elemStyle = useMemo(
        () => ({
          width: `${textareaWidth + 16}px`,
          height: `${textareaHeight + 36}px`,
          background: `${background}`,
          left: left + 'px',
          top: top + 'px',
          zIndex: `${layer}`    
        }),
        [isDragging, left, top, background]
      );

    return (
        <div className="note" ref={elementRef} style={elemStyle} >
            <div className="note-header">

                <div className="handle" style={{cursor: 'grabbing'}} onMouseDown={handleDragStart} ref={handleRef}>Handle</div>
                <div className="color-picker">
                    <span onClick={() => handleClick("#f2bbc0")} className="circle red"></span>
                    <span onClick={() => handleClick("#e5e047")} className="circle yellow"></span>
                    <span onClick={() => handleClick("#b2d94a")} className="circle green"></span>
                </div>
                <div className="delBtn" onClick={() => deleteNote(note.id)}>Delete</div>
            </div>
            <textarea onMouseMove={onContentChange} style={{ 'height': textareaHeight, 'width': textareaWidth, 'background': background }} spellCheck="false" defaultValue={note.description} />
        </div>
    );
};

export default Note;