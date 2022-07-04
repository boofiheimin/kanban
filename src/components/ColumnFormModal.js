import ReactModal from 'react-modal';

export const ColumnFormModal = ({
  isOpen,
  onChange,
  onSave,
  onCancel,
  formValue,
  titleText,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className='modal'
      overlayClassName='overlay'
    >
      <div className='modal_title'>{titleText}</div>
      <div className='form_label_value_wrapper'>
        <div>column name :</div>
        <input type='text' onChange={onChange} value={formValue.name}></input>
      </div>
      <div className='new_column_button_row'>
        <button className='button save_button' onClick={onSave}>
          save
        </button>
        <button className='button cancel_button' onClick={onCancel}>
          cancel
        </button>
      </div>
    </ReactModal>
  );
};
