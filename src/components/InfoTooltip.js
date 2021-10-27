import fail from '../images/fail.svg';
import success from '../images/success.svg';

function InfoTooltip(props) {

    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="reset" onClick={props.onClose} aria-label="Закрыть окно" className="popup__close-btn"></button>
                <img src={`${props.isAuthorized ? success : fail}`} alt="иллюстрация" className="popup__entrance" />
                <h2 className="popup__text-entrance">{`${props.isAuthorized ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</h2>
            </div>
        </div>
    );
}
export default InfoTooltip;