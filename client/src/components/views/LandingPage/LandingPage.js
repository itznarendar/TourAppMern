import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import Axios from 'axios';
import { Row, Col, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './sections/CheckBox'
import RadioBox from './sections/RadioBox';
import SearchFilter from './sections/SearchFilter';
function LandingPage() {
    const [Products,setProducts]=useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);
    const [filters, setfilters] = useState({continent:[],price:[]})
    const [SearchTerm, setSearchTerm] = useState("")
    useEffect(() => {
        const variables={
            skip:Skip,
            limit:Limit
        }
        console.log(variables);
        getProducts(variables);

    },[])
const getProducts=(variables)=>{

    Axios.post('api/product/getProducts',variables).then(response=>{

        console.log(response);
         
        if(response.data.success){
            if(variables.loadMore){
                setProducts([...Products,...response.data.products])

            }
            else{
                setProducts(response.data.products)

            }
            
setPostSize(response.data.postSize)
console.log(response.data.products)
        }
        else{
            alert('failed to fetch')
        }
    })
}
    const RenderCard=Products.map((product,index)=>{
return <Col lg={6} md={8} xs={24}>
<Card hoverable={true} cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}></ImageSlider></a>}>
<Meta title={product.title} description={`${product.price}`}>
</Meta>
</Card>
</Col>
    })
    const onLoadmore=()=>{
let skip=Skip+Limit;

setSkip(skip)
const variables={
    skip:skip,
    limit:Limit,
    loadMore:true
}
getProducts(variables);
    }
    const handlePrice=(filters)=>{
        console.log(filters.array)

        
    }
    const handleFilters=(filter,catagory)=>{
        console.log(filter,catagory);
        
        if(catagory==='price'){
            console.log(filter.array,"fArray ");

            let priceValues=filter.array;
           
            const newFilters={...filters};
        newFilters[catagory]=priceValues;
        setfilters(newFilters)
        showFilterResults(newFilters)
 
        //  setSkip(0);
         //   getProducts(variables);

        }
      else   if(catagory==='clear'){
            setfilters(filter)
        }
      else{  const newFilters={...filters};
        newFilters[catagory]=filter;
        setfilters(newFilters)
        showFilterResults(newFilters)}
    }
    const showFilterResults = (filters) => {
        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
      setSkip(0);
        getProducts(variables);
    }
    const handleSearch=(term)=>{
        const variables = {
            skip: 0,
            limit: Limit,
            filters: "",
            seachTerm:term
        }
      setSkip(0);
      getProducts(variables);
let filter={continent:[],price:[]};
handleFilters(filter,"clear");
        setSearchTerm(term);
    }
    return (
        
        <div style={{width:'75%',margin:'3rem auto'}}>
            <div style={{textAlign:'center'}}>
            <h2>Lets travel any where </h2>
            </div>
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                <CheckBox handleFilters={filters=>handleFilters(filters,"continent")}/>

                </Col>
                <Col lg={12} xs={24}>
                <RadioBox handleFilters={filters=>handleFilters(filters,"price")}/>

                </Col>
            </Row>
            <div style={{display:'flex' ,justifyContent:'flex-end',margin:'1rem auto'}}>
<SearchFilter handleSearch={term=>handleSearch(term)}/>

            </div>
            {Products.length===0?<div style={{display:'flex'}}>
           <h2>No Products available</h2> 
            </div>:
        <div>
            <Row gutter={[16,16]}>
    
{RenderCard}
            </Row>
            </div>}
            <br></br>
           {PostSize>=Limit&&<div style={{display:'flex',justifyContent:'center'}}>
<button onClick={onLoadmore}>Load More</button>
            </div>} 
        </div>
    )
}

export default LandingPage
