import close from "../assets/close.png";
import styles from "./DeleteModal.module.css";

function DeleteModal({setModal}) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <img src={close} alt="" />
          <p>آیا از حذف محصول مطمئن هستسد؟</p>
          <button className={styles.delete}>حذف</button>
          <button
            className={styles.cancel}
            onClick={() => setModal({ show: false, id: "" })}
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
