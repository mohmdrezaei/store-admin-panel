import React, { useEffect, useState } from "react";
import styles from "./AddModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "services/mutations";
import { updateProduct } from "services/mutations";
import { toast } from "react-toastify";
function AddModal({ setAddModal, product }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });

  const mutationFn = product ? updateProduct : addProduct;
  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      setAddModal({ show: false, product: null });
      toast.success(
        product ? "محصول با موفقیت ویرایش شد!" : "محصول با موفقیت افزوده شد!"
      );
    },
    onError: (error) => {
      toast.error("مشکلی پیش آمده است:", error.response.data.message);
    },
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.price) return;
    if (product) {
      mutate({ id: product.id, ...form });
    } else {
      mutate(form);
    }
  };

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      });
    }
  }, [product]);
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>{product ? "ویرایش اطلاعات" : "ایجاد محصول جدید"}</h2>
          <form onSubmit={submitHandler}>
            <div className={styles.formControl}>
              <label htmlFor="name">نام کالا</label>
              <input
                type="text"
                name="name"
                placeholder="نام کالا"
                value={form.name}
                onChange={changeHandler}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="quantity">تعداد موجودی</label>
              <input
                type="number"
                name="quantity"
                placeholder="تعداد موجودی"
                value={form.quantity}
                onChange={changeHandler}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="price">قیمت</label>
              <input
                type="text"
                name="price"
                placeholder="قیمت"
                value={form.price}
                onChange={changeHandler}
              />
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.add} disabled={isPending}>
                {product ? "ثبت اطلاعات جدید" : "ایجاد"}
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
