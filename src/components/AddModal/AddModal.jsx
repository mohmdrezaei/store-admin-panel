import React from "react";
import styles from "./AddModal.module.css";
function AddModal({ setAddModal }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>ایجاد محصول جدید</h2>
          <form >
            <div className={styles.formControl}>
              <label htmlFor="name">نام کالا</label>
              <input type="text" name="name" placeholder="نام کالا"/>
            </div>
            <div className={styles.formControl}>
              <label htmlFor="quantity">تعداد موجودی</label>
              <input type="number" name="quantity" placeholder="تعداد موجودی"/>
            </div>
            <div className={styles.formControl}>
              <label htmlFor="price">قیمت</label>
              <input type="text" name="price" placeholder="قیمت"/>
            </div>
            <div className={styles.buttons}>
            <button className={styles.add}>ایجاد</button>
            <button
              className={styles.cancel}
              onClick={() => setAddModal(false)}
            >
              انصراف
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
