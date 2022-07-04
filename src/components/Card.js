import { Menu } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { CardFormModal } from './CardFormModal';
import { ConfirmationModal } from './ConfirmationModal';

export const Card = ({
  cardIndex,
  card,
  onArchiveCard,
  onCardChange,
  isDragging,
  provided,
}) => {
  const [isArchiveConfirmation, setArchiveConfirmation] = useState(false);
  const [cardForm, setCardForm] = useState(card);
  const [isCardFormModal, setCardFormModal] = useState(false);

  useEffect(() => {
    setCardForm(card);
  }, [card]);

  useEffect(() => {}, [isDragging]);

  const handleOnArchive = () => {
    setArchiveConfirmation(true);
  };
  const handleCloseArchiveConfirmation = () => {
    setArchiveConfirmation(false);
  };
  const handleConfirmArchiveConfirmation = () => {
    onArchiveCard(cardIndex);
    setArchiveConfirmation(false);
  };

  const handleCardFormOpen = () => {
    setCardFormModal(true);
  };
  const handleCardFormCancel = () => {
    setCardFormModal(false);
    setCardForm(card);
  };
  const handleOnCardNameChange = (formValue) => {
    setCardForm((c) => ({ ...c, ...formValue }));
  };
  const handleCardFormSave = () => {
    onCardChange(cardIndex, cardForm);
    setCardFormModal(false);
  };

  const { name, description, createdAt, status } = card;

  return (
    <div
      className='card'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className='card_item card_name'>{name}</div>
      <div className='card_item card_desc'>{description}</div>
      <div className='card_item card_date'>{`created: ${createdAt}`}</div>
      <div className='card_item card_footer'>
        <div className={`card_status card_status_${status}`}>{status}</div>
        <Menu as='div' className='menu'>
          <Menu.Button className='menu_button'>...</Menu.Button>
          <Menu.Items className='menu_items'>
            <Menu.Item className='menu_item'>
              {() => <div onClick={handleCardFormOpen}>edit</div>}
            </Menu.Item>
            <Menu.Item className='menu_item'>
              {() => <div onClick={handleOnArchive}>archive</div>}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <ConfirmationModal
        isOpen={isArchiveConfirmation}
        onCancel={handleCloseArchiveConfirmation}
        onSave={handleConfirmArchiveConfirmation}
      />
      <CardFormModal
        titleText='Edit Card'
        isOpen={isCardFormModal}
        onSave={handleCardFormSave}
        onCancel={handleCardFormCancel}
        onChange={handleOnCardNameChange}
        formValue={cardForm}
      />
    </div>
  );
};
