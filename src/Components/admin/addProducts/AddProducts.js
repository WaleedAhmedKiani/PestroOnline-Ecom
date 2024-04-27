import { useState } from "react";
import styles from "./AddProducts.module.scss";
import Card from "../../card/Card";
import { db, storage } from "../../../fireBase/Config";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Loader from '../../loader/Loader';
import { selectProducts } from "../../../Redux/slice/productSlice";
import { useSelector } from "react-redux";

const stateProduct = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
}
const categories = [
  { id: 1, name: "Women" },
  { id: 2, name: "Men" },
  { id: 3, name: "Foot wear" },
  { id: 4, name: "Electronics" },
];

const AddProducts = () => {


  const detectForm = (id, f1, f2) => {
    if(id === 'ADD'){
      return f1;
    }
    return f2;
  }
 

  const {id} = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const [product, setProduct] = useState(() =>{
    const newState = detectForm(id, {...stateProduct}, productEdit)
    return newState;
  });

 
 


  const [uploadprogress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  



  const InputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const ImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    // const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const storageRef = ref(storage, `PestroOnline/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        setUploadProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error("error.message");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image Upload Successfuly");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true)
    try{
      
      const docRef =  addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate()
      });
     
      toast.success('Product upload sucess.')
      navigate('/admin/all-products')
      setIsLoading(false)
      // setProduct(...stateProduct)
      setUploadProgress(0)

    } catch(error){
      toast.error(error.message)
      setIsLoading(false)

    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if(product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

     try{

      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt:productEdit.createdAt,
        editedAt: Timestamp.now().toDate()
       
      });
      setIsLoading(false);
      toast.success('Product Edited')
      navigate('/admin/all-products')

     } catch(error) {
      setIsLoading(false);
      toast.error(error.message);
     }
  }
  return (
    <> 
    {isLoading && <Loader/>}
    <div className={styles.product}>
      <h1>{detectForm(id, 'Add New Product', 'Edit Product')}</h1>
      <Card cardClass={styles.card}>
        <form onSubmit={detectForm(id, addProduct, editProduct)}>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            required
            value={product.name}
            onChange={(e) => InputChange(e)}
          />

          <label>Product Image:</label>
          <Card cardClass={styles.group}>
            {uploadprogress === 0 ? null : (
              <div className={styles.progress}>
                <div
                  className={styles["progress-bar"]}
                  style={{ width: `${uploadprogress}%` }}
                >
                  {uploadprogress < 100
                    ? `Uploading ${uploadprogress}`
                    : `Upload Complete ${uploadprogress}%`}
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              placeholder="Product Image"
              name="image"
              onChange={(e) => ImageChange(e)}
            />

            {product.imageURL === "" ? null : (
              <input
                type="text"
                required
                name="imageURL"
                disabled
                value={product.imageURL}
              />
            )}

            <label>Product Price:</label>
            <input
              type="text"
              placeholder="Product name"
              name="price"
              required
              value={product.price}
              onChange={(e) => InputChange(e)}
            />

            <label>Product Category:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => InputChange(e)}
            >
              <option value="disabled">Select Product Category</option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label>Product Brand:</label>
            <input
              type="text"
              placeholder="Product brand"
              name="brand"
              required
              value={product.brand}
              onChange={(e) => InputChange(e)}
            />

            <label>Product Description</label>
            <textarea
              name="desc"
              required
              value={product.desc}
              onChange={(e) => InputChange(e)}
              cols="20"
              rows="10"
            ></textarea>

            <button className="--btn --btn-primary">
              {detectForm(id, 'Save Product', 'Edit Product')}
            </button>
          </Card>
        </form>
      </Card>
    </div>
    </>
  );
};

export default AddProducts;
