import ReactModal from 'react-modal';

export const CardFormModal = ({
  isOpen,
  onChange,
  onSave,
  onCancel,
  formValue,
  titleText,
}) => {
  const handleChange = (field, event) => {
    onChange({ [field]: event.target.value });
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className='modal'
      overlayClassName='overlay'
    >
      <div className='modal_title'>{titleText}</div>
      <div className='form_label_value_wrapper'>
        <div>name :</div>
        <input
          type='text'
          onChange={(e) => handleChange('name', e)}
          value={formValue.name}
        ></input>
      </div>
      <div className='form_label_value_wrapper'>
        <div>description :</div>
        <input
          type='text'
          onChange={(e) => handleChange('description', e)}
          value={formValue.description}
        ></input>
      </div>
      <div className='form_label_value_wrapper'>
        <div>status :</div>
        <select
          name='status'
          id='status'
          onChange={(e) => {
            handleChange('status', e);
          }}
          value={formValue.status}
        >
          <option value='open'>open</option>
          <option value='closed'>closed</option>
        </select>
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
