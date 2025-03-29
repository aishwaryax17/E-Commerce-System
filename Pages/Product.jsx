import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import './CSS/Product.css'
const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((e) => e.id === Number(productId));
    return (
        <div className='product'>
             <Breadcrums product={product} /> 
            <ProductDisplay product={product} />
            <DescriptionBox/>
            <RelatedProducts/>
        </div>
    )
}
export default Product