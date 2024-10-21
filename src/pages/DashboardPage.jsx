import { useQuery } from "@tanstack/react-query";

import styles from "./DashboardPage.module.css";
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";

function DashboardPage() {
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/products");
    return response.json();
  };
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return "An error has occurred: " + error.message;

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
        <GiSettingsKnobs/>
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
          <tr>
            <td>تیشرت</td>
            <td>293</td>
            <td>4534etrdgfgdfgdf6e45e</td>
            <td className={styles.oprations}>
            <a href="">
                <BsPencilSquare color="#4ADE80" />
              </a>
              <a href="">
                <BsTrash color="#F43F5E" />
              </a>
            </td>
          </tr>
          <tr>
            <td>تیشرت</td>
            <td>293</td>
            <td>4534etrdgfgdfgdf6e45e</td>
            <td className={styles.oprations}>
            <a href="">
                <BsPencilSquare color="#4ADE80" />
              </a>
              <a href="">
                <BsTrash color="#F43F5E" />
              </a>
            </td>
          </tr>
          <tr>
            <td>تیشرت</td>
            <td>293</td>
            <td>4534etrdgfgdfgdf6e45e</td>
            <td className={styles.oprations}>
            <a href="">
                <BsPencilSquare color="#4ADE80" />
              </a>
              <a href="">
                <BsTrash color="#F43F5E" />
              </a>
            </td>
          </tr>
          <tr>
            <td>تیشرت</td>
            <td>293</td>
            <td>4534etrdgfgdfgdf6e45e</td>
            <td className={styles.oprations}>
              <a href="">
                <BsPencilSquare color="#4ADE80" />
              </a>
              <a href="">
                <BsTrash color="#F43F5E" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DashboardPage;
