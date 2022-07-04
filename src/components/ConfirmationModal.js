import ReactModal from 'react-modal';

export const ConfirmationModal = ({ isOpen = false, onCancel, onSave }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className='modal'
      overlayClassName='overlay'
    >
      <div className='modal_title'>Are you sure?</div>
      <div className='new_column_button_row'>
        <button className='button save_button' onClick={onSave}>
          confirm
        </button>
        <button className='button cancel_button' onClick={onCancel}>
          cancel
        </button>
      </div>
    </ReactModal>
  );
};
