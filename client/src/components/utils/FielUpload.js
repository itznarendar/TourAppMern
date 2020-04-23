import { Icon } from 'antd';
import Axios from 'axios';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

 function FielUpload(props) {
     const [images, setImages] = useState([])
     const onDrop=(files)=>{
let formdata=new FormData();
let config= {header:{'content-type':'multipart/form-data'}    }
formdata.append("file",files[0])
Axios.post('/api/product/uploadImage',formdata,config).then(response=>{
    if(response.data.success){
setImages([...images,response.data.image])
props.refreshFunction([...images,response.data.image]);
console.log(images);
/* images.map((image,index)=>{
    console.log(image);  
})
 */    }
    else{
        console.log(response);
        alert('fail')
    }
})}

const onDelete=(image)=>{
const currentIndex=images.indexOf(image)
const newImages=[...images]
newImages.splice(currentIndex,1)
setImages(newImages)
props.refreshFunction(newImages)
}
    return (
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <Dropzone onDrop={onDrop} multiple={false} maxSize={8000000}>{({getRootProps,getInputProps})=>
        (

<div style={{width:'300px',height:'240px', border:'1px solid lightgray',display:'flex',alignItems:'center'}} {...getRootProps()} >
<input {...getInputProps()}></input>
<Icon type="plus" style={{fontSize:'3rem',justifyContent:'center'}}></Icon>
            </div>
        )}</Dropzone> 
<div style={{display:'flex',width:'350px',height:'240px',overflowX:'scroll'}}>
{images.map((image,index)=>( 
    

<div onClick={()=>onDelete(image)} >
        <img  style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`}/>
 </div>
 ))}

</div>
        </div>
    )
}
export default FielUpload 