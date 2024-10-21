import close from "assets/close.png";
import styles from "./DeleteModal.module.css";

function DeleteModal({setDeleteModal}) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <img src={close} alt="" />
          <p>آیا از حذف این محصول مطمئنید؟</p>
          <div className={styles.buttons}>
          <button className={styles.delete}>حذف</button>
          <button
            className={styles.cancel}
            onClick={() => setDeleteModal({ show: false, id: "" })}
          >
            لغو
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
