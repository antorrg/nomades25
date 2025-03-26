import style from './GenericButton.module.css'


const GenericButton = ({onClick, buttonText, type='button', disabled, className}) => {
  let customClass = className? className : style.button 

  return (
    <button type={type} onClick={onClick} className={customClass} disabled= {disabled}>
      {buttonText}
    </button>
  );
};

export default GenericButton;
