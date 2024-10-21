import { useQuery } from "@tanstack/react-query";
import { getProducts } from "services/queries";

import styles from "./DashboardPage.module.css";
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";

import { useState } from "react";

import DeleteModal from "components/DeleteModal/DeleteModal";
import AddModal from "components/AddModal/AddModal";

function DashboardPage() {
  const [deleteModal, setDeleteModal] = useState({ show: false, id: "" });
  const [addModal, setAddModal] = useState(false);

  const showDeleteModal = (e) => {
    e.preventDefault();
    setDeleteModal({ show: true, id: "" });
  };

  const showAddModal = (e) => {
    e.preventDefault();
    setAddModal(true);
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
      {deleteModal.show && <DeleteModal setDeleteModal={setDeleteModal} />}
      {addModal && <AddModal setAddModal={setAddModal} />}

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
          <button onClick={showAddModal}>افزودن محصول</button>
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
                <a href="">
                  <BsPencilSquare color="#4ADE80" />
                </a>
                <a onClick={showDeleteModal}>
                  <BsTrash color="#F43F5E" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardPage;
