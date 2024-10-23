import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "services/queries";

import styles from "./DashboardPage.module.css";
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";

import { useState } from "react";

import DeleteModal from "components/DeleteModal/DeleteModal";
import AddModal from "components/AddModal/AddModal";
import { deleteProduct } from "services/mutations";

function DashboardPage() {
  const queryClient = useQueryClient();
  const [deleteModal, setDeleteModal] = useState({ show: false, id: "" });
  const [addModal, setAddModal] = useState({show : false , product : null});
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      setDeleteModal(false);
      console.log("محصول با موفقیت حذف شد");
    },
    onError: (error) => {
      console.log("مشکلی پیش آمده است:", error.response.data.message);
    },
  });
  const deleteHandler = (e, id) => {
    e.preventDefault();
    setDeleteModal({ show: true, id: id });
  };

  const confirmDelete = () => {
    mutate(deleteModal.id);
  };

  const showAddModal = (e) => {
    e.preventDefault();
    setAddModal({show : true , product:null});
  };
  const showEditModal =(e , product)=>{
    e.preventDefault();
    setAddModal({show : true , product:product});
  }
  const { isFetching, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isFetching) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + error.message;
  const products = data.data.data;
  return (
    <div className={styles.container}>
      {deleteModal.show && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          confirmDelete={confirmDelete}
        />
      )}
      {addModal.show && <AddModal setAddModal={setAddModal} product={addModal.product}/>}

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

      {isFetching ? (
        <p>Loding...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>نام کالا</th>
              <th> موجودی</th>
              <th> قیمت</th>
              <th> شناسه کالا</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td >{product.quantity}</td>
                <td>{product.price}</td>
                <td className={styles.id}>{product.id}</td>
                <td className={styles.oprations}>
                  <a onClick={(e) => showEditModal(e, product)}>
                    <BsPencilSquare color="#4ADE80" />
                  </a>
                  <a onClick={(e) => deleteHandler(e, product.id)}>
                    <BsTrash color="#F43F5E" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DashboardPage;
