import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "utils/cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "components/modules/Loader";
import ProductsList from "components/productsList/ProductsList";
import getUserInfoFromToken from "services/userInfo";

import DeleteModal from "components/DeleteModal/DeleteModal";
import AddModal from "components/AddModal/AddModal";
import { toast } from "react-toastify";
import Pagination from "components/pagination/Pagination";
import { useGetProducts } from "services/queries";
import { useDeleteProduct, useDeleteProducts } from "services/mutations";

import { BsTrash } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const token = getCookie("token");
  const userInfo = getUserInfoFromToken(token);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    message: "",
    ids: [],
  });

  const [addModal, setAddModal] = useState({ show: false, product: null });
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { isLoading, data, error, isPending } = useGetProducts(page);

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
  const logoutHandler = () => {
    deleteCookie("token");
    navigate("/login");
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

  if (isLoading) return <Loader />;

  if (error || data?.data?.length === 0) {
    <h2>هیچ محصولی وجود ندارد.</h2>;
    setPage(page - 1);
    setSearchParams({ page: page - 1 });
  }

  const products = data?.data || [];

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
            <p>{userInfo.username}</p>
            <span>مدیر</span>
          </div>
          <CiLogout size="27px" title="خروج" onClick={logoutHandler} />
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
            {products.length > 0 ? (
              products?.map((product) => (
                <ProductsList
                  key={product.id}
                  product={product}
                  selectedProducts={selectedProducts}
                  productSelectHandler={productSelectHandler}
                  showCheckbox={showCheckbox}
                  deleteHandler={deleteHandler}
                  showEditModal={showEditModal}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                  هیچ محصولی وجود ندارد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {data?.totalPages > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          pages={data.totalPages}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      )}
    </div>
  );
}

export default ProductsPage;
