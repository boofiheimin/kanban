import { useState } from 'react';
import { Column } from './Column';

import { ColumnFormModal } from './ColumnFormModal';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { reorder } from '../util';

export const Board = ({
  columns,
  onNewColumn,
  onRemoveColumn,
  onColumnChange,
  onColumnReorder,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [mode, setMode] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
    setNewName('');
  };
  const handleOnChange = (event) => {
    setNewName(event.target.value);
  };
  const handleSave = () => {
    onNewColumn(newName);
    setOpen(false);
    setNewName('');
  };

  const onDragStart = (initial) => {
    if (initial.draggableId.startsWith('card')) {
      setMode('card');
    } else {
      setMode('column');
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const { destination, source } = result;
    if (mode === 'card') {
      const currentColumnIndex = columns.findIndex(
        (column) => column.id === source.droppableId
      );
      const nextColumnIndex = columns.findIndex(
        (column) => column.id === destination.droppableId
      );

      const current = [...columns[currentColumnIndex].cards];
      const next = [...columns[nextColumnIndex].cards];
      const target = current[source.index];

      if (source.droppableId === destination.droppableId) {
        const reordered = reorder(current, source.index, destination.index);
        onColumnChange([
          {
            index: nextColumnIndex,
            column: {
              ...columns[currentColumnIndex],
              cards: reordered,
            },
          },
        ]);
      } else {
        current.splice(source.index, 1);
        next.splice(destination.index, 0, target);
        onColumnChange([
          {
            index: currentColumnIndex,
            column: {
              ...columns[currentColumnIndex],
              cards: current,
            },
          },
          {
            index: nextColumnIndex,
            column: {
              ...columns[nextColumnIndex],
              cards: next,
            },
          },
        ]);
      }
    } else {
      const reordered = reorder(columns, source.index, destination.index);
      onColumnReorder(reordered);
    }

    setMode(null);
  };
  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable
        droppableId={'columns_droppable'}
        type='card'
        isDropDisabled={mode === 'card'}
        direction='horizontal'
      >
        {(dropProvided) => (
          <div
            className='column_containers'
            {...dropProvided.droppableProps}
            ref={dropProvided.innerRef}
          >
            {columns.map((column, index) => (
              <Draggable
                key={column.id}
                draggableId={column.id}
                index={index}
                isDragDisabled={mode === 'card'}
              >
                {(dragProvided, dragSnapshot) => (
                  <Column
                    key={column.id}
                    columnIndex={index}
                    column={column}
                    onRemoveColumn={onRemoveColumn}
                    onColumnChange={onColumnChange}
                    isDragging={dragSnapshot.isDragging}
                    provided={dragProvided}
                    mode={mode}
                  />
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
      <div className='column_add_button'>
        <div className='column_add_button_inner' onClick={handleOpen}>
          + Add Column
        </div>
        <ColumnFormModal
          titleText='Add new Column'
          isOpen={isOpen}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={handleOnChange}
          formValue={{ name: newName }}
        />
      </div>
    </DragDropContext>
  );
};
