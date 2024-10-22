import React, { useState } from "react";
import styles from "./AddModal.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProduct } from "services/mutations";
import { getProducts } from "services/queries";
function AddModal({ setAddModal }) {
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });
  const { mutate, isPending, error ,data } = useMutation({mutationFn : addProduct ,
    onSuccess: () => {
      
      setAddModal(false);
      console.log("محصول با موفقیت افزوده شد");
    },
  });
  const {refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  console.log({ error ,data})

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.name || !form.quantity || !form.price) return;
    mutate(form)
    refetch()
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
