import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import ProductImage from './sections/ProductImage';
import ProductInfo from './sections/ProductInfo';
import { Row, Col, Card } from 'antd';
import{addToCart} from '../../../_actions/user_actions';
import {useDispatch} from 'react-redux';
function ProductDetailsPage(props) {
    const productId=props.match.params.productId;
    const [Product, setProduct] = useState([])
    const dispatch=useDispatch();
    useEffect(() => {
        
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
            console.log(response);
            setProduct(response.data[0])
        }) 
    },[])
    const addToCartHandler=(productId)=>{
dispatch(addToCart(productId));
    }
    return (
        <div>
            <div>
                <h1>{Product.title}</h1>
            </div>
            <Row gutter={[16,16]}>
            <Col lg={12} xs={24}><ProductImage details={Product}></ProductImage></Col>
            <Col lg={12} xs={24}><ProductInfo addToCart={addToCartHandler}details={Product}></ProductInfo></Col>

            </Row>
            ProductDetailsPage
ProductDetailsPage
        </div>
    )
}

export default ProductDetailsPage
