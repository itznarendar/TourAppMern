import React from 'react'

function UserCardBlock(props) {

    const renderCartImage = (images) => {
        console.log(images);
        if(images.length > 0) {
            let image = images[0]
        console.log(image);

            return `http://localhost:5000/${image}`
        }
    }

    const renderItems1 = () => (
        props.products && props.products.map(product => (
            <tr key={product._id}>
                <td>
                    <img style={{ width: '70px' }} alt="product" 
                    src={renderCartImage(product.images)} />
                </td> 
                <td>{product.quantity} EA</td>
                <td>$ {product.price} </td>
                <td><button 
                onClick={()=> props.removeItem(product._id)}
                >Remove </button> </td>
            </tr>
        ))
    )

    const renderItems=()=>{ return(
props.products && props.products.map(product=>( 
<tr key={product._id}>
    <td><img style={{width:'70px'}} alt='product' src={renderCartImage(product.images)}/></td>
    <td>{product.quantity} EA</td>
    <td>${product.price}</td>
<td><button onClick={()=>props.removeItem(product._id)}>Remove</button></td>
</tr>))
    )

}

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from the Cart</th>

                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
