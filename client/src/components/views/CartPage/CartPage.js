import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {getCartItems,removeCartItem} from '../../../_actions/user_actions'
import UserCardBlock from './sections/UserCardBlock';
import { Result, Empty } from 'antd';
import Paypal from '../../utils/Paypal';

function CartPage(props) {
    const [total, settotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false);
    const [ShowSuccess, setShowSuccess] = useState(false)
const dipatch=useDispatch();

    useEffect(() => {
        let cartItems=[];
if(props.user.userData&&props.user.userData.cart){
    if(props.user.userData.cart.length){
        props.user.userData.cart.forEach(element => {
        cartItems.push(element.id)
        console.log("dispatch ================")
        });
        dipatch(getCartItems(cartItems,props.user.userData.cart))

    }

}
    }    , [props.user.userData])
    useEffect(() => {
        let total=0;
        if(props.user.cartDetail&&props.user.cartDetail.length>0){

            props.user.cartDetail.map(item=>{
                total+=parseInt(item.price,10)*item.quantity
            })
            setShowTotal(true);
            settotal(total);
   
        }
            else{
            setShowTotal(false);

            } 
       
    }, [props.user.cartDetail])
    const removeItem=(productId)=>{
dipatch(removeCartItem(productId))
    }
    return (
        <div style={{width:'85%',margin:'3rem auto'}}>
            <h1>My Cart</h1>
            <div>
                <UserCardBlock products={props.user.cartDetail} removeItem={removeItem}></UserCardBlock>
                {ShowTotal?  <div style={{marginTop:'3rem auto'}}>
     <h2>Total Amount:${total}</h2>
                </div>
                 :
                 ShowSuccess?<Result status="success" title="Purchased package successfully"></Result>:
                <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center'}}>
<br>
</br>
<Empty description={false}></Empty>
<p>No items in the cart </p>
                </div>}
            </div>
            <Paypal/>
        </div>
    )
}

export default CartPage
