import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';


const PreferenceBar = ( { preferenceList, setPreferenceList, chosenProtein, chosenCheese, chosenSauce } ) => {
    // const [fixedPosition, setFixedPosition] = useState(true);
    // console.log(preferenceList);

    const [show, setShow] = useState(false);

    const getPreference = () => {
        let tempState = preferenceList;
        tempState.protein = chosenProtein;
        tempState.cheeses = chosenCheese;
        tempState.sauces = chosenSauce;
        setPreferenceList(tempState);
      }
    
    useEffect(() => {
    getPreference();
    // console.log(preferenceList);
    }, [chosenProtein, chosenCheese, chosenSauce])

    const buttonShowHandler = (e) => {
        e.preventDefault();
        setShow(!show);
        // console.log(show);
    }
    
    return (
        // <List fixed={fixedPosition}>
        <List>
            <Button onClick={buttonShowHandler}>{show ? 'Close list' : 'Show list'}</Button>
            {show ? <div>
                {preferenceList.protein.map((item) => { return <p>{item}</p>})}
                {preferenceList.cheeses.map((item) => { return <p>{item}</p>})}
                {preferenceList.sauces.map((item) => { return <p>{item}</p>})}
            </div> : null}
        </List>
    )
}

const List = styled.div`
    display: flex;
    flex-direction: row;
    z-index: 1;
    position: fixed;
    top: 0;
    // ${props => props.fixed && css`
    // position: fixed;
    // top: 0;
    // `}
`;

const Button = styled.button`
font-size: 1em;
padding: 0.25em 1em;
margin: 0.25em;
border: none;
border-radius: 3px;
height: 40px;
width: 100px;

&:hover {
    background: dodgerblue;
    color: white
}
`;



export default PreferenceBar;
