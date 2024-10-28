import { useState } from "react";

import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import styles from "./ProductsPage.module.css";

import DeleteModal from "components/DeleteModal/DeleteModal";
import AddModal from "components/AddModal/AddModal";
import { toast } from "react-toastify";
import Pagination from "components/pagination/Pagination";
import { useGetProducts } from "services/queries";
import { useDeleteProduct } from "services/mutations";
import { useDeleteProducts } from "services/mutations";

import { deleteCookie } from "utils/cookie";
import { useNavigate } from "react-router-dom";
import Loader from "components/modules/Loader";

function ProductsPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    message: "",
    ids: [],
  });

  const [addModal, setAddModal] = useState({ show: false, product: null });
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { isLoading, error, data , isPending } = useGetProducts(page);
  
  const { mutate } =
    selectedProducts.length > 1
      ? useDeleteProducts(setDeleteModal)
      : useDeleteProduct(setDeleteModal);

  const productSelectHandler = (id) => {
    setSelectedProducts((selected) =>
      selected.includes(id)
        ? selected.filter((productId) => productId !== id)
        : [...selected, id]
    );
  };


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
  const logoutHandler = ()=>{
    deleteCookie("token");
    navigate("/login");
  }

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

  if (isLoading) return <Loader/>;

  if (error) return "An error has occurred: " + error.message;
  const products = data?.data?.data || [];;
  console.log(data?.data)
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
          < CiLogout size="27px" title="خروج" onClick={logoutHandler}/>
          
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

      {isPending ? (
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

export default ProductsPage;