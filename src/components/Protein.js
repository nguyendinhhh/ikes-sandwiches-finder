import React , {useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';


const Division = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        // min-height: 100vh;
        height: 30vh;
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
    
const Protein = ( { proteinList, chosenProtein, setChosenProtein, proteinType, setProteinType } ) => {
    
    const chooseProteinHandler = (name, id) => {
        if (!chosenProtein.includes(name)) setChosenProtein([...chosenProtein, name]);

        // setChosenProtein(name);
    }
    
    return (
            <Division id="protein">
                <h2 style={{
                    color: 'yellow',
                    fontSize: '2rem',
                    textAlign: 'center',
            }}>Choose your protein(s)</h2>
            {proteinList.length > 0 ? <div style={{margin: '1em', width:'70%'}}>
                    {proteinList.map((item) => {
                        // console.log(item);
                        return <Option
                            key={item.id}
                            name={item.name}
                            onClick={()=> chooseProteinHandler(item.name, item.id)}
                        >{item.name}</Option>
                    })}
                </div> : <p style={{margin: '0.5em', fontWeight: 'bold', color: 'white'}}>Scroll up and choose your preference first!</p>}
                
                
            </Division>
    )
}

export default Protein;
