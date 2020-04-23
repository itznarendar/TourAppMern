import React, { useEffect, useState } from 'react'
import  ImageGallery from 'react-image-gallery'
import _ from 'lodash';

function ProductImage(props) {
    const [Images, setImages] = useState([])
    useEffect(() => {
        if(props.details&&props.details.images&&props.details.images.length>0){
            let images=[]
       props.details.images.map(image=>{
        images.push({original:`http://localhost:5000/${image}`,thumbnail:`http://localhost:5000/${image}`})
       }) 
       if( _.isEqual(images, Images))
       {
    console.log("response      img         ==================>");

       }else{
    console.log("response      img    eeeelse     ==================>");

       setImages(images)
       }
        }
    }, [props.details])
    const images2 = [
        {
          original: 'https://picsum.photos/id/1018/1000/600/',
          thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1015/1000/600/',
          thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1019/1000/600/',
          thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
      ];
    return (
        <div>
            <ImageGallery items={Images}></ImageGallery>
            <img src={Images[0]}></img>
        </div>
    )
}

export default ProductImage
