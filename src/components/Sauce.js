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

const Sauce = ( { chosenSauce, setChosenSauce } ) => {
    
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
                color: 'white',
                fontSize: '2rem',
            }}>Choose your sauce(s)</h2>
            <div style={{margin: '1em'}}>
                {sauceList.map((item, i) => {
                    // console.log(item);
                    return <Option
                        key={item.id}
                        name={item.name}
                        // clicked={clicked}
                        onClick={()=> chooseSauceHandler(item.name, item.id)}
                    >{item.name}</Option>
                })}
            </div>
            
        </Division>
    )
}

export default Sauce;
