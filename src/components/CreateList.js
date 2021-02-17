import React, {useState} from 'react'
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../backend/config';

const Division = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // min-height: 100vh;
        // height: 30vh;
        min-width: 100vw;
        margin-top: 3rem;
    `;

    const Option = styled.button`
        font-size: 1em;
        padding: 0.25em 1em;
        margin: 0.25em;
        border: none;
        border-radius: 3px;
        background: #FF1493;
        color: white;
        &:hover {
            background: #F3AC0A;
        }
    `;

const CreateList = ({ proteinList, setProteinList, proteinType,setProteinType }) => {

    const [meatClicked, setMeatClicked] = useState(false);
    const [veggieClicked, setVeggieClicked] = useState(false);

    const submitProteinList = (e) => {
        e.preventDefault();

        if (e.target.value === 'meat') {
            setMeatClicked(true);
            if (veggieClicked) setVeggieClicked(!veggieClicked);
            setProteinType('meat');
            try {
                db.ref('types-of-protein').on('value', (snapshot) => {
                    let arr = snapshot.val()['meat'].split(",");
                    let objects = [];
                    for (const item of arr) {
                        objects.push({ name: item, id: uuidv4() });
                    }
                    setProteinList(objects);
                })
            } catch (error) {
                console.log("Couldn't submit the meat list yo");
            }
        } else if (e.target.value === 'veggie') {
            setVeggieClicked(true);
            if (meatClicked) setMeatClicked(!meatClicked);
            setProteinType('veggie');
            try {
                db.ref('types-of-protein').on('value', (snapshot) => {
                    let arr = snapshot.val()['veggie'].split(",");
                    let objects = [];
                    for (const item of arr) {
                        objects.push({ name: item, id: uuidv4() });
                    }
                    setProteinList(objects);
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
                    color: 'yellow',
                    fontSize: '2rem',
                    textAlign: 'center'
                }}>Choose your type of sandwich</h2>
                <div style={{margin: '1em', width:'70%', display:'flex',justifyContent:'center'}}>
                    <Option style={ meatClicked ? {background: 'grey', color: 'whitesmoke'} : null} value="meat" onClick={e => submitProteinList(e, "value")}>Meat</Option>
                    <Option style={ veggieClicked ? {background: 'grey', color: 'whitesmoke'} : null} value="veggie" onClick={e => submitProteinList(e, "value")}>Veggie</Option>
                </div>
                
            </Division>
        </div>
    )
}

export default CreateList
