import React, {useState} from 'react'
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../backend/config';

const Division = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // background-color: blue;
        min-height: 100vh;
        min-width: 100vw;
    `;

    const Option = styled.button`
        font-size: 1em;
        padding: 0.25em 1em;
        margin: 0.25em;
        border: none;
        border-radius: 3px;
        &:hover {
            background: #F3AC0A;
        }
    `;

const CreateList = ({ proteinList, setProteinList }) => {

    
    const submitProteinList = (e) => {
        e.preventDefault();

        if (e.target.value === 'meat') {
            try {
                db.ref('types-of-protein').on('value', (snapshot) => {
                    // console.log(snapshot.val()['main-veggies']);
                    let arr = snapshot.val()['meat'].split(",");
                    // console.log(arr);
                    // setProteinList([]);
                    // setProteinList(arr)
                    let objects = [];
                    for (const item of arr) {
                        objects.push({ name: item, id: uuidv4() });
                    }
                    setProteinList(objects);
                    // for (const item of arr) {
                    //     proteinList.push({ name: item, id: uuidv4() });
                    // }
                    // console.log(proteinList);
                    
                })
            } catch (error) {
                console.log("Couldn't submit the meat list yo");
            }
        } else if (e.target.value === 'veggie') {
            try {
                db.ref('types-of-protein').on('value', (snapshot) => {
                    // console.log(snapshot.val()['main-veggies']);
                    let arr = snapshot.val()['veggie'].split(",");
                    let objects = [];
                    for (const item of arr) {
                        objects.push({ name: item, id: uuidv4() });
                    }
                    setProteinList(objects);
                    // console.log(arr);
                    // setProteinList(arr);
                    // for (const item of arr) {
                    //     proteinList.push({ name: item, id: uuidv4() });
                    // }
                })
            } catch (error) {
                console.log("Couldn't submit the veggie list yo");
            }
        }
    }
    
    
    return (
        <div>
            <Division>
                <h2 style={{
                    color: 'white',
                    fontSize: '2rem',
                }}>Choose your type of sandwich</h2>
                <div style={{margin: '1em'}}>
                    <Option value="meat" onClick={e => submitProteinList(e, "value")}>Meat</Option>
                    <Option value="veggie" onClick={e => submitProteinList(e, "value")}>Veggie</Option>
                </div>
                
            </Division>
        </div>
    )
}

export default CreateList
