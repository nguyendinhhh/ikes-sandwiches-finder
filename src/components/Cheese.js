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

const Cheese = ( { chosenCheese, setChosenCheese } ) => {

    const [cheeseList, setCheeseList] = useState([]);
    

    const getCheese = () => {
        db.ref('types-of-cheese').on('value', (snapshot) => {
            let arr = snapshot.val().split(",");
            let objects = [];
            for (const item of arr) {
                objects.push({ name: item, id: uuidv4() });
            }
            setCheeseList(objects);
        });
    }

    useEffect(() => {
        getCheese();
    }, []);

    const chooseCheeseHandler = (name, id) => {
        if (!chosenCheese.includes(name)) setChosenCheese([...chosenCheese, name]);

        // console.log(chosenCheese.length + 1); // see reason why @ https://stackoverflow.com/questions/61081227/my-array-is-not-empty-but-array-length-returns-0
        if ((chosenCheese.length + 1) > 3) {
            // something in here
        }

    
    }
    
    return (
            <Division id="cheese">
                <h2 style={{
                    color: 'white',
                    fontSize: '2rem',
                }}>Choose your cheese(s)</h2>
                <div style={{margin: '1em'}}>
                    {cheeseList.map((item, i) => {
                        // console.log(item);
                        return <Option
                            key={item.id}
                            name={item.name}
                            // clicked={clicked}
                            onClick={()=> chooseCheeseHandler(item.name, item.id)}
                        >{item.name}</Option>
                    })}
                </div>
                
            </Division>
    )
}

export default Cheese;
