import React,{useState} from 'react';
import {Typography,Button,Form,message,Input,Icon} from 'antd';
import FielUpload from '../../utils/FielUpload';
import Axios from 'axios';

const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" }
]

const {Title}=Typography
const {TextArea}=Input

function UploadProductPage(props){
    const [TitleValue, setTitleValue] = useState("");
const [DescriptionValue,setDescriptionValue]=useState("");
const[Price,SetPrice]=useState(0);
const [continent, setContinent] = useState(1);
const [images, setImages] = useState([]);

    const onTitleChange=(event)=>{

        setTitleValue(event.currentTarget.value)
    }
    const OnDescriptionValue=(event)=>{
        setDescriptionValue(event.currentTarget.value)
    }
    const OnPriceChange=(event)=>{
        SetPrice(event.currentTarget.value)
    }
    const OnContinentChange=(event)=>{
        setContinent(event.currentTarget.value)
    }
    const updateImages=(newImages)=>{
        console.log(newImages)
setImages(newImages)
    }
  const  onSubmit=(event)=>{
event.preventDefault();
if(!TitleValue||!DescriptionValue||!Price||!images||!continent)
{
  return  alert('all the fileds are mandatory')
}
const varibales={
    writer:props.user.userData._id,
    title:TitleValue,
    description:DescriptionValue,
    price:Price,
    images:images,
    continent:continent

}
Axios.post('/api/product/uploadProduct',varibales).then(response=>{
    if(response.data.success){
alert('product uploaded ')
props.history.push('/')
    }
    else{
        alert('failed load')
    }
})
    }
    return (<div style={{maxWidth:'700px' ,margin:'2rem auto'}}>
    <div style={{textAlign:'centre',marginBottom:'2rem'}}></div>
    <Title level={2}>Travel upload</Title>
    <Form onSubmit={onSubmit}>
    <FielUpload refreshFunction={updateImages} />
    <br>
    </br>
    <br>
    </br>
    <label>Title</label>
    <Input onChange={onTitleChange} value={TitleValue}/>
    <br>
    </br>
    <label>Description</label>
    <TextArea onChange={OnDescriptionValue} value={DescriptionValue}></TextArea>
    <br></br>
    <br></br>
    <label>price</label>
    <Input type="number"onChange={OnPriceChange} value={Price}/>
    <select onChange={OnContinentChange}>
        {Continents.map(item=>(
                    <option key={item.key} value={item.key}>{item.value}</option>
        ))}

    </select>
    <br></br>

    <br></br>
<Button  onClick={onSubmit}>submit</Button>
    </Form>
    
    </div>)
}
export default UploadProductPage