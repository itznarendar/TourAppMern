import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const continents = [
    {
        "_id": 1,
        "name": "Africa"
    },
    {
        "_id": 2,
        "name": "Europe"
    },
    {
        "_id": 3,
        "name": "Asia"
    },
    {
        "_id": 4,
        "name": "North America"
    },
    {
        "_id": 5,
        "name": "South America"
    },
    {
        "_id": 6,
        "name": "Australia"
    },
    {
        "_id": 7,
        "name": "Antarctica"
    }
]
const { Panel } = Collapse
function CheckBox(props) {
    const [checked, setChecked] = useState([])

    const handleToggle = (id) => {
        const currentIndex = checked.indexOf(id);
        console.log("curre index",currentIndex," id is ",id)
        const newchecked = [...checked];
        if (currentIndex ===-1) {
            console.log("add cindex" ,currentIndex,"id  ",id)
            newchecked.push(id)
        } else {
            console.log("remove cindex" ,currentIndex,"id  ",id)

            newchecked.splice(currentIndex, 1)
            console.log(newchecked)
        }

        setChecked(newchecked)
        props.handleFilters(newchecked)

    }
    const renderCheckboxList = () => (
        continents.map((value, index) =>
            (
                <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked={checked.indexOf(value._id) === -1 ? false : true}
            />&nbsp;&nbsp;
            <span>{value.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </React.Fragment>
       ))
    )

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="continent" key="1">
                    {renderCheckboxList()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
