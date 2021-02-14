import React , {useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';


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
    
const Protein = ( { proteinList, chosenProtein, setChosenProtein } ) => {
    
    const chooseProteinHandler = (name, id) => {
        if (!chosenProtein.includes(name)) setChosenProtein([...chosenProtein, name]);
        // setChosenProtein(name);
    }
    
    return (
            <Division id="protein">
                <h2 style={{
                    color: 'white',
                    fontSize: '2rem',
                    textAlign: 'center',
            }}>{proteinList.length > 0 ? 'Choose your protein' : 'Scroll up and choose your preference first!'}</h2>
                <div style={{margin: '1em'}}>
                    {proteinList.map((item) => {
                        // console.log(item);
                        return <Option
                            key={item.id}
                            name={item.name}
                            onClick={()=> chooseProteinHandler(item.name, item.id)}
                        >{item.name}</Option>
                    })}
                </div>
                
            </Division>
    )
}

export default Protein;
