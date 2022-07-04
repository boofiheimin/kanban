import { Menu } from '@headlessui/react';
import { useEffect, useState } from 'react';

import { Card } from './Card';
import { ConfirmationModal } from './ConfirmationModal';
import { ColumnFormModal } from './ColumnFormModal';
import { CardFormModal } from './CardFormModal';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getDateString, keyGen } from '../util';

const initCardForm = {
  name: '',
  description: '',
  status: 'open',
  isArchived: false,
};

export const Column = ({
  columnIndex,
  column,
  onRemoveColumn,
  onColumnChange,
  provided,
  mode,
}) => {
  const [isRemoveConfirmation, setRemoveConfirmation] = useState(false);
  const [isColumnFormModal, setColumnFormModal] = useState(false);
  const [columnForm, setColumnForm] = useState(column);
  const [isCardFormModal, setCardFormModal] = useState(false);
  const [newCard, setNewCard] = useState(initCardForm);

  useEffect(() => {
    setColumnForm(column);
  }, [column]);

  const handleOnRemove = () => {
    setRemoveConfirmation(true);
  };
  const handleCloseRemoveConfirmation = () => {
    setRemoveConfirmation(false);
  };
  const handleConfirmRemoveConfirmation = () => {
    onRemoveColumn(columnIndex);
    setRemoveConfirmation(false);
  };
  const handleColumnFormOpen = () => {
    setColumnFormModal(true);
  };
  const handleColumnFormCancel = () => {
    setColumnFormModal(false);
    setColumnForm(column);
  };
  const handleOnColumnNameChange = (event) => {
    setColumnForm((c) => ({ ...c, name: event.target.value }));
  };
  const handleColumnFormSave = () => {
    onColumnChange([{ index: columnIndex, column: columnForm }]);
    setColumnFormModal(false);
  };

  const handleCardFormOpen = () => {
    setCardFormModal(true);
  };
  const handleCardFormCancel = () => {
    setCardFormModal(false);
    setNewCard(initCardForm);
  };
  const handleOnColumnCardsAdd = () => {
    const timeStamp = getDateString(new Date());
    onColumnChange([
      {
        index: columnIndex,
        column: {
          ...columnForm,
          cards: [
            ...columnForm.cards,
            {
              ...newCard,
              createdAt: timeStamp,
              id: `card_${keyGen(newCard.name, timeStamp)}`,
            },
          ],
        },
      },
    ]);
    setCardFormModal(false);
    setNewCard(initCardForm);
  };
  const handleNewCardChange = (formValue) => {
    setNewCard((c) => ({ ...c, ...formValue }));
  };

  const handleArchiveCard = (index) => {
    const clone = [...columnForm.cards];
    clone[index] = {
      ...clone[index],
      isArchived: true,
    };
    onColumnChange([
      {
        index: columnIndex,
        column: {
          ...columnForm,
          cards: clone,
        },
      },
    ]);
  };
  const handleCardChange = (index, card) => {
    const clone = [...columnForm.cards];
    clone[index] = card;
    onColumnChange([
      {
        index: columnIndex,
        column: {
          ...columnForm,
          cards: clone,
        },
      },
    ]);
  };

  const { name, cards } = column;

  return (
    <div ref={provided.innerRef} {...provided.draggableProps}>
      <Droppable
        droppableId={column.id}
        type='card'
        isDropDisabled={mode === 'column'}
      >
        {(dropProvided) => (
          <div className='column' {...dropProvided.droppableProps}>
            <div className='column_inner'>
              <div className='column_header' {...provided.dragHandleProps}>
                <div className='column_header_length'>{cards.length}</div>
                <div className='column_header_name'>{name}</div>
                <div
                  className='button column_header_add_button'
                  onClick={handleCardFormOpen}
                >
                  +
                </div>
                <div className='column_header_option_button'>
                  <Menu as='div' className='menu'>
                    <Menu.Button className='menu_button'>...</Menu.Button>
                    <Menu.Items className='menu_items'>
                      <Menu.Item className='menu_item'>
                        {() => <div onClick={handleColumnFormOpen}>edit</div>}
                      </Menu.Item>
                      {cards.length === 0 && (
                        <Menu.Item className='menu_item'>
                          {() => <div onClick={handleOnRemove}>remove</div>}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
              <div className='cards_container' ref={dropProvided.innerRef}>
                {cards
                  .filter((card) => !card.isArchived)
                  .map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                      isDragDisabled={mode === 'column'}
                    >
                      {(dragProvided, dragSnapshot) => (
                        <Card
                          cardIndex={index}
                          card={card}
                          onArchiveCard={handleArchiveCard}
                          onCardChange={handleCardChange}
                          isDragging={dragSnapshot.isDragging}
                          provided={dragProvided}
                        />
                      )}
                    </Draggable>
                  ))}
                {dropProvided.placeholder}
              </div>
            </div>
            <ConfirmationModal
              isOpen={isRemoveConfirmation}
              onCancel={handleCloseRemoveConfirmation}
              onSave={handleConfirmRemoveConfirmation}
            />
            <ColumnFormModal
              titleText='Edit Column'
              isOpen={isColumnFormModal}
              onSave={handleColumnFormSave}
              onCancel={handleColumnFormCancel}
              onChange={handleOnColumnNameChange}
              formValue={columnForm}
            />
            <CardFormModal
              titleText='Add New Card'
              isOpen={isCardFormModal}
              onSave={handleOnColumnCardsAdd}
              onCancel={handleCardFormCancel}
              onChange={handleNewCardChange}
              formValue={newCard}
            />
          </div>
        )}
      </Droppable>
    </div>
  );
};
