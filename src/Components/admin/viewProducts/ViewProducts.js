import { useEffect, useState } from 'react';
import styles from './ViewProducts.module.scss';
import { toast } from 'react-toastify';
import { FaUserEdit, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { db, storage } from '../../../fireBase/Config';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import Loader from '../../loader/Loader';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../../../Redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';





const ViewProducts = () => {
  const {data, isLoading} = useFetchCollection('products')
  const products = useSelector(selectProducts)
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_PRODUCTS({products: data}))

  },[dispatch, data])

  // useEffect(() => {
  //   getProducts()
 
  // }, [])

  // deleate pro
  const delPro = (id, imageURL) => {
    try{
      deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      deleteObject(storageRef)
      toast.success('Product deleted Success')
      
    } catch(error){toast.error(error.message)}
  }

  // Confirm delete dialog
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product?',
      'Do you want to delete this particular product',
      'Delete',
      'Cancel',
      function okCb() {
        delPro(id, imageURL)
      },
      function cancelCb() {
        alert('Delete Canceled');
      },
      {
        width: '320px',
        borderRadius: '8px',
        titleColor: '#800000',
        okButtonBackground: '#800000',
        cssAnimationStyle: 'fade',
        // etc...
      },
    );
  } 
  
  // getpro from database
//   const getProducts = () => {
//     setIsLoading(true)
//     try{
//       const productsRef = collection(db, 'products')
//       const q = query(productsRef, orderBy('createdAt', 'desc'))

//       // const q = query(collection(db, "cities"), where("state", "==", "CA"));
//      onSnapshot(q, (Snapshot) => {
//       const allProducts = Snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }))
//       setProducts(allProducts);
//       setIsLoading(false);
//       dispatch(STORE_PRODUCTS({products: allProducts}))

// });
   

//     }catch(error){
//       setIsLoading(false)
//       toast.error(error.message)
//     }
//   }

  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.table}>
      <h2>All Products</h2>

      {products.length === 0 ? (
        <p>No Product found.</p>
      ): (
        <table>
          <thead> 
          <tr>
            <th>#Sn:</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody> 
          {products.map((product, index) => {
            const{id, name, price, imageURL, category} = product;
            return(
            
              <tr key={id}>
                <td>
                  {index + 1}
                </td>
                <td>
                  <img src={imageURL} alt={name} style={{width: '6.5rem'}} />
                </td>
                <td>
                  {name}
                </td>
                <td>
                  {category}
                </td>
                <td>
                  {`$${price}`}
                </td>
                <td className={styles.icons}>
                  <Link to= {`/admin/add-products/${id}`} >
                  <FaUserEdit  size={25} color='Teal'/>
                  </Link>
                  &nbsp; &nbsp;
                  <FaTrash  size={22} color='Tomato'
                  onClick={() => confirmDelete(id,imageURL)}/>
                </td>

              </tr>
             
            )
          })}
           </tbody>
        </table>
      )}

    </div>

    </>
  )

}

export default ViewProducts