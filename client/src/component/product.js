import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { listProduct, saveProduct, deleteProduct } from '../action/productAction';

function Product(props) {
     const [productVisible, setProductVisible] = useState(false);
     const [id, setId] = useState('');
     const [name, setName] = useState('');
     const [price, setPrice] = useState('');
     const [img, setImg] = useState('');
     const [qty, setQty] = useState('');
     const [total, setTotal] = useState('');
     const [color, setColor] = useState('');
     const [description, setDescription] = useState('');
     const productList = useSelector(state => state.productList);
     const {loading, products, error} = productList;
     const productSave = useSelector(state => state.productSave);
     const { loading: loadingSave, success: successSave, error: errorSave} = productSave;

     const productDelete = useSelector(state => state.productDelete);
     const { loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete;

    const dispatch = useDispatch();


    useEffect(() =>{
        if(successSave) {
            setProductVisible(false);
        }
        dispatch(listProduct());
        return () => {

        }
    }, [successSave, successDelete]);

    const openProductField = (product) => {
        setProductVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImg(product.img);
        setTotal(product.total);
        setColor(product.color);
        setDescription(product.description);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({ _id:id, name, price, img, color, description, qty, total}));

    }
    const deletHandler = (product) => {
        dispatch(deleteProduct)(product._id);
    }

    return (
        <div className="product-content">
            <div className="productHead">
                <h3>Products</h3>
                <button onClick={() =>openProductField({})}>Create Product</button>
                
            </div>
            
{productVisible && 
        <div className="form">  
            <form onSubmit={submitHandler}>
            <h3>
                Create Product
            </h3>
                <ul className="form-container">
                    <li>
                        {loadingSave && <div>Loading..</div>}
                        {errorSave && <div>{errorSave}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                   <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="price">
                            Price
                        </label>
                   <input type="Number" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="image">
                            Image
                        </label>
                   <input type="text" name="image" value={img} id="image" onChange={(e) => setImg(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="qty">
                            Quantity
                        </label>
                   <input type="number" name="qty" value={qty} id="qty" onChange={(e) => setQty(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="total">
                            Total
                        </label>
                   <input type="number" name="total" value={total} id="total" onChange={(e) => setTotal(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="color">
                            Color
                        </label>
                   <input type="text" name="color" value={color} id="color" onChange={(e) => setColor(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="description">
                            Description
                        </label>
                   <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit"> { id ? "Update" : "Create"}</button>
                    </li>
                    <li>
                    <button onClick={() => setProductVisible(false)}>Close</button>
                    </li>
                    
                </ul>
            </form>
        </div>
}
        <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>img</th>
                            <th>color</th>
                            <th>Descreption</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => ( <tr key={product._id}> 
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.img}</td>
                        <td>{product.color}</td>
                        <td>{product.description}</td>
                        <td>
                            <button onClick={()=> openProductField(product)}>Edit</button>
                            <button onClick={() => deletHandler(product)}>Delete</button>
                        </td>
                    </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product