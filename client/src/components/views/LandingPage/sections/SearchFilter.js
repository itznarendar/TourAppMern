import React, { useState } from 'react'
import {Input} from 'antd'
const {Search}=Input
function SearchFilter(props) {
    const [searchTerm, setsearchTerm] = useState("")
    const onChangeText=(event)=>{
        setsearchTerm(event.currentTarget.value);
        props.handleSearch(event.currentTarget.value)
    }
    return (
        <div>
            <Search onChange={onChangeText} value={searchTerm} placeholder="Search by places "></Search>
        </div>
    )
}

export default SearchFilter
