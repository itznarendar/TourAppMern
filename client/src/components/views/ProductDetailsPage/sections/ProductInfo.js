import React, { useEffect, useState } from 'react'
import { Descriptions, Button } from 'antd';

import { isEmpty, isEqual, xorWith } from 'lodash';
import _ from 'lodash';


function ProductInfo(props) {
    const [Products, setProducts] = useState({})
    useEffect(() => {
       if( _.isEqual(props.details, Products))
{
    console.log("response         stilllll    EEEEEEE  ==================>");

}else{
    console.log("response        wrongggggggggggggggggg       ==================>");

        setProducts(props.details)}
    }, [props.details])
    const addToCartHandler=()=>{
        props.addToCart(props.details._id);
        
    }
    return (
        <div>
            <Descriptions title='ProductInfo'>
            <Descriptions.Item label='Price'>{Products.price}</Descriptions.Item>
            <Descriptions.Item label='Sold'>{Products.sold}</Descriptions.Item>
            <Descriptions.Item label='View'>{Products.views}</Descriptions.Item>
            <Descriptions.Item label='Description'>{Products.description}</Descriptions.Item>

            </Descriptions>
            <br></br>
            <br></br>
            <br></br>
            <div style={{display:'flex',justifyContent:'center'}}>
            <Button size="large" shape="round" type="danger" onClick={addToCartHandler}>Add to Cart</Button></div>
        </div>
    )
}

export default ProductInfo
