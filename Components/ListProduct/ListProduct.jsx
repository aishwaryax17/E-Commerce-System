import React, { useState, useEffect } from "react";
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/allproducts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAllProducts(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const removeProduct = async (id) => {
        try {
            const response = await fetch('http://localhost:4000/removeproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            });
            const data = await response.json();
            if (data.success) {
                // Refresh the list after removing the product
                fetchInfo();
            }
        } catch (error) {
            console.error('There was a problem with the remove operation:', error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className="list-product">
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allProducts.map((product, index) => (
                    <React.Fragment key={index}>
                        <div className="listproduct-format-main listproduct-format">
                            <img src={product.image} alt={product.name} className="listproduct-product-icon" />
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={() => { removeProduct(product.id) }} className="listproduct-remove-icon" src={cross_icon} alt="Remove" />
                        </div>
                        <hr />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ListProduct;
