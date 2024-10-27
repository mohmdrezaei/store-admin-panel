import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "services/queries";

import styles from "./DashboardPage.module.css";
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

import DeleteModal from "components/DeleteModal/DeleteModal";
import AddModal from "components/AddModal/AddModal";
import { deleteProduct, deleteProducts } from "services/mutations";
import { toast } from "react-toastify";
import Pagination from "components/pagination/Pagination";
import { useSearchParams } from "react-router-dom";

function DashboardPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
 
   
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    message: "",
    ids: [],
  });
  const [addModal, setAddModal] = useState({ show: false, product: null });
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const productSelectHandler = (id) => {
    setSelectedProducts((selected) =>
      selected.includes(id)
        ? selected.filter((productId) => productId !== id)
        : [...selected, id]
    );
  };
  const mutationFn =
    selectedProducts.length > 1 ? deleteProducts : deleteProduct;
  const { mutate } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      setDeleteModal({ show: false, message: "", ids: [] });
      showCheckbox
        ? toast.success("محصولات مورد نظر با موفقیت حذف شدند")
        : toast.success("محصول مورد نظر با موفقیت حذف شد");
    },
    onError: (error) => {
      toast.success("مشکلی پیش آمده است:", error.response.data.message);
    },
  });
  const deleteHandler = (e, id) => {
    e.preventDefault();
    if (showCheckbox && selectedProducts.length === 0) {
      toast.error("هیچ محصولی انتخاب نشده است!");
      return;
    }
    if (showCheckbox && selectedProducts.length > 1) {
      setDeleteModal({
        show: true,
        message: "آیا از حذف  این محصولات اطمینان دارید؟",
        ids: selectedProducts,
      });
    } else {
      setDeleteModal({
        show: true,
        message: "آیا از حذف این محصول مطمئنید؟",
        ids: [id],
      });
    }
  };

  const confirmDelete = () => {
    if (selectedProducts.length > 1) {
      mutate(selectedProducts);
    } else {
      mutate(deleteModal.ids);
    }
  };

  const showAddModal = (e) => {
    e.preventDefault();
    setAddModal({ show: true, product: null });
  };
  const showEditModal = (e, product) => {
    e.preventDefault();
    setAddModal({ show: true, product: product });
  };

  const closeHandler = () => {
    setShowCheckbox(false);
    setSelectedProducts([]);
  };
  const { isFetching, error, data } = useQuery({
    queryKey: ["products", page ],
    queryFn: () => getProducts({ page }),
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
          message={deleteModal.message}
        />
      )}
      {addModal.show && (
        <AddModal setAddModal={setAddModal} product={addModal.product} />
      )}

      <header>
        <div className={styles.search}>
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
              <th>
                {!showCheckbox ? (
                  <FiMoreHorizontal
                    size="25px"
                    onClick={() => setShowCheckbox(true)}
                  />
                ) : (
                  <div className={styles.groupDelete}>
                    <BsTrash
                      size="20px"
                      color="#F43F5E"
                      onClick={(e) => deleteHandler(e, null)}
                    />
                    <IoCloseSharp
                      size="20px"
                      onClick={closeHandler}
                      color="#862b3a"
                    />
                  </div>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td className={styles.id}>{product.id}</td>
                <td className={styles.oprations}>
                  <a onClick={(e) => showEditModal(e, product)}>
                    <BsPencilSquare color="#4ADE80" />
                  </a>
                  <a onClick={(e) => deleteHandler(e, product.id)}>
                    <BsTrash color="#F43F5E" />
                  </a>
                  {showCheckbox && (
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => productSelectHandler(product.id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {data.data.totalPages > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          pages={data.data.totalPages}
        />
      )}
    </div>
  );
}

export default DashboardPage;
