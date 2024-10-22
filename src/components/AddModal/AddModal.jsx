import React, { useState } from "react";
import styles from "./AddModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "services/mutations";
function AddModal({ setAddModal }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });
  const { mutate, isPending, error ,data } = useMutation({mutationFn : addProduct ,
    onSuccess: () => {
      queryClient.invalidateQueries("products")
      setAddModal(false);
      console.log("محصول با موفقیت افزوده شد");
    },
    onError: (error) => {
      console.log("مشکلی پیش آمده است:", error.response.data.message);
    },
  });


  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.price) return;
    mutate(form)
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>ایجاد محصول جدید</h2>
          <form onSubmit={submitHandler} onChange={changeHandler}>
            <div className={styles.formControl}>
              <label htmlFor="name">نام کالا</label>
              <input type="text" name="name" placeholder="نام کالا" />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="quantity">تعداد موجودی</label>
              <input type="number" name="quantity" placeholder="تعداد موجودی" />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="price">قیمت</label>
              <input type="text" name="price" placeholder="قیمت" />
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.add} disabled={isPending}>
                ایجاد
              </button>
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
