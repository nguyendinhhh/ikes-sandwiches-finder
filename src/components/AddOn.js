import React , {useState, useEffect} from 'react';
import styled from 'styled-components';
// import { Link } from 'react-scroll';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../backend/config';

const Division = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // min-height: 100vh;
        // height: 30vh;
        margin-top: 3rem;
        min-width: 100vw;
        margin-bottom: 7rem;

        @media screen and (max-width: 400px){
            margin-bottom: 8rem;
        }
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

const AddOn = ( { chosenAddOn, setChosenAddOn, proteinList } ) => {

    const [addOnList, setAddOnList] = useState([]);
    

    const getAddOn = () => {
        db.ref('add-ons').on('value', (snapshot) => {
            let arr = snapshot.val()['others'].split(",");
            let objects = [];
            for (const item of arr) {
                objects.push({ name: item, id: uuidv4() });
            }
            setAddOnList(objects);
        });
    }

    useEffect(() => {
        getAddOn();
    }, []);

    const chooseAddOnHandler = (name, id) => {
        if (!chosenAddOn.includes(name)) setChosenAddOn([...chosenAddOn, name]);
    }
    
    return (
            <Division id="add-on">
                <h2 style={{
                    color: 'yellow',
                    fontSize: '2rem',
            }}>Choose your add-on(s)</h2>
            {proteinList.length > 0 ? <div style={{margin: '1em', width:'70%'}}>
                    {addOnList.map((item, i) => {
                        return <Option
                            key={item.id}
                            name={item.name}
                            onClick={()=> chooseAddOnHandler(item.name, item.id)}
                        >{item.name}</Option>
                    })}
                </div> : <p style={{margin: '0.5em', fontWeight: 'bold', color: 'white'}}>Scroll up and choose your preference first!</p>}
                
                
            </Division>
    )
}

export default AddOn;
