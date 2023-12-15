import CloseIcon from '@/components/Icon/Close';
import st from './styles.module.scss';

const Modal = ({ message, onClose }) => (
  <>
    <div className={st.modal_backdrop} onClick={onClose} />
    <div className={st.modal} role="alert">
      <div className={st.modal_body}>{message}</div>
      <span className={st.modal_close}>
        <CloseIcon />
      </span>
    </div>
  </>
);

export default Modal;
