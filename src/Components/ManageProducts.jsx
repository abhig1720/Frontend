import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManageProducts.css";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://myntraclone-backend-pcv6.onrender.com/products/all");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://myntraclone-backend-pcv6.onrender.com/products/delete/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product");
      }
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: null
    });
    setPreviewImage(`https://myntraclone-backend-pcv6.onrender.com/uploads/${product.image}`);
    setEditModal(true);
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }
    try {
      await axios.put(`https://myntraclone-backend-pcv6.onrender.com/products/${selectedProduct._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setEditModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Failed to update product");
    }
  };

  const handleBack = () => {
    navigate("/admindashboard");
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="manage-products-container">
      <div className="manage-header">
        <h2>Manage Products</h2>
        <button onClick={handleBack} className="back-button">Back to Dashboard</button>
      </div>
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td><img src={`https://myntraclone-backend-pcv6.onrender.com/uploads/${product.image}`} alt={product.name} width="50" /></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>Rs   {product.price}</td>
                <td>{product.description.substring(0, 50)}...</td>
                <td>
                  <button onClick={() => handleEdit(product)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editModal && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h3>Edit Product</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="Beauty">Beauty</option>
                  <option value="HomeLiving">Home & Living</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Image (optional)</label>
                {previewImage && <img src={previewImage} alt="preview" width="120" style={{marginBottom: '10px', borderRadius: '5px'}} />}
                <input type="file" name="image" accept="image/*" onChange={handleChange} />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="submit-button">Update</button>
                <button type="button" onClick={() => setEditModal(false)} className="cancel-button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageProducts;
