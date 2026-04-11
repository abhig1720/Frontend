import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProducts.css";
import axios from "axios";

function AddProducts(){
    const [formData,setFormData] = useState({
        name:"",
        category:"",
        price:"",
        description:"",
        image:null,
    });

    const [previewImage,setPreviewImage] = useState(null);
    const navigate = useNavigate();

    const handleChange=(e)=>{
        if(e.target.type==="file"){
            const file = e.target.files[0];
            setFormData({...formData,image:file});
            setPreviewImage(URL.createObjectURL(file));
        }
        else{
            setFormData({...formData,[e.target.name]:e.target.value});
        }
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const data  = new FormData();
        data.append("name",formData.name);
        data.append("category",formData.category);
        data.append("price",formData.price);
        data.append("description",formData.description);
        data.append("image",formData.image);
        try{
            await axios.post("http://localhost:5000/products/add",data,{
                headers:{"Content-Type":"multipart/form-data"}
            });
            alert("products added");

        }
        catch(error){
            console.log(error);
            alert("Failed to add product");
        }
    };

    const handleBack = () => {
      navigate("/admindashboard");
    };

    return(
        <div className="add-products-Container">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h2 className = "add-products-heading"> Add A Product</h2>
              <button onClick={handleBack} className="back-button" style={{padding: '10px 20px', background: '#455a98', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Back</button>
            </div>

            <form className = "add-products-form" onSubmit={handleSubmit}>
                <div className ="form-group">
                    <label> product Name</label>
                    <input type="text" name="name" placeholder="Enter product name" onChange={handleChange} required/>
                </div>
                <div className ="form-group">
                    <label> Category </label>
                    <select name= "category" onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                        <option value="Beauty">Beauty</option>
                        <option value="HomeLiving">Home & Living</option>
                    </select>
                </div>
                <div className ="form-group">
                    <label> Price </label>
                    <input type="number" name="price" placeholder="Enter price" onChange={handleChange} required/>
                </div>
                <div className ="form-group">
                    <label> Description </label>
                    <textarea name="description" placeholder="Enter description" onChange={handleChange} required></textarea>
                </div>
                <div className="form-group">
                    <label> Product Image</label>
                    {previewImage && (
                    <img src={previewImage} alt="preview" style={{width:"120px",marginBottom:"10px",borderRadius:"5px"}}/>
                    )}
                    <input type="file" name="image" accept="image/*" onChange={handleChange} required/>
                </div>
                <div className = "form-group">
                    <button type = "submit" className="submit-button"> Add Product</button>
                </div>
            </form>
        </div>

    );

}

export default AddProducts;
