import React , {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
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

const Sauce = ( { chosenSauce, setChosenSauce, chosenProtein } ) => {
    
    const [sauceList, setSauceList] = useState([]);

    const getSauce = () => {
        db.ref('sauces').on('value', (snapshot) => {
            let arr = snapshot.val().split(",");
            let objects = [];
            for (const item of arr) {
                objects.push({ name: item, id: uuidv4() });
            }
            setSauceList(objects);
        });
    }

    useEffect(() => {
        getSauce();
    }, []);

    const chooseSauceHandler = (name, id) => {
        if (!chosenSauce.includes(name)) setChosenSauce([...chosenSauce, name]);
    }
    
    return (
        <Division id="sauce">
            <h2 style={{
                color: 'yellow',
                fontSize: '2rem',
            }}>Choose your sauce(s)</h2>
            {chosenProtein.length > 0 ? <div style={{margin: '1em', width:'70%'}}>
                {sauceList.map((item, i) => {
                    return <Option
                        key={item.id}
                        name={item.name}
                        onClick={()=> chooseSauceHandler(item.name, item.id)}
                    >{item.name}</Option>
                })}
            </div> : <p style={{margin: '0.5em', fontWeight: 'bold', color: 'white'}}>Scroll up and choose your protein first!</p>}
                
            
            
        </Division>
    )
}

export default Sauce;
