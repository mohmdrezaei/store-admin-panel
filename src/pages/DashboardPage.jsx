import { useQuery } from "@tanstack/react-query";
import { getProducts } from "services/queries";

import styles from "./DashboardPage.module.css";
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import close from "../assets/close.png";
import { useState } from "react";

function DashboardPage() {
  const [modal, setModal] = useState({ show: false, id: "" });
  const showModal = (e) => {
    e.preventDefault();
    setModal({ show: true, id: "" });
  };
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + error.message;
  const products = data.data.data;

  console.log(data);
  return (
    <div className={styles.container}>
      <header>
        <div>
          <BsSearch />
          <input type="text" placeholder="جستحو کالا" />
        </div>

        <div className={styles.user}>
          <img src="src/assets/profile.png" alt="" />
          <div>
            <p>محمد رضایی</p>
            <span>مدیر</span>
          </div>
        </div>
      </header>

      <div className={styles.add}>
        <div className={styles.title}>
          <GiSettingsKnobs />
          <span>مدیریت کالا</span>
        </div>

        <div>
          <button>افزودن محصول</button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th> موجودی</th>
            <th> شناسه کالا</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.id}</td>
              <td className={styles.oprations}>
                <a href="" >
                  <BsPencilSquare color="#4ADE80" />
                </a>
                <a onClick={showModal}>
                  <BsTrash color="#F43F5E" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal.show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <img src={close} alt="" />
              <p>آیا از حذف محصول مطمئن هستسد؟</p>
              <button className={styles.delete} >حذف</button>
              <button className={styles.cancel} onClick={()=>setModal({ show: false, id: "" })}>لغو</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
