import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';


const PreferenceBar = ( {preferences, setPreferences, preferenceList, setPreferenceList, chosenProtein, chosenCheese, chosenSauce } ) => {
    // const [fixedPosition, setFixedPosition] = useState(true);
    // console.log(preferenceList);

    const [show, setShow] = useState(false);

    const getPreference = () => {
        let tempState = preferenceList;
        tempState.protein = chosenProtein;
        tempState.cheeses = chosenCheese;
        tempState.sauces = chosenSauce;
        setPreferenceList(tempState); // include an object of arrays

        for (let i = 0; i < chosenProtein.length; i++) {
            const item = chosenProtein[i];
            if (!preferences.includes(item)) setPreferences([...preferences, item]);
        }
        for (let i = 0; i < chosenCheese.length; i++) {
            const item = chosenCheese[i];
            if (!preferences.includes(item)) setPreferences([...preferences, item]);
        }
        for (let i = 0; i < chosenSauce.length; i++) {
            const item = chosenSauce[i];
            if (!preferences.includes(item)) setPreferences([...preferences, item]);
        }

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
            <div style={{ display: 'flex', padding: '1rem', flexDirection:'row'}}>
                {preferences.map((item) => {
                    return <Option>{item}</Option>
                })}
            </div>
            {/* <Button onClick={buttonShowHandler}>{show ? 'Close list' : 'Show list'}</Button>
            {show ? <div>
                {preferenceList.protein.map((item) => { return <p>{item}</p>})}
                {preferenceList.cheeses.map((item) => { return <p>{item}</p>})}
                {preferenceList.sauces.map((item) => { return <p>{item}</p>})}
            </div> : null} */}
        </List>
    )
}

const List = styled.div`
    display: flex;
    flex-direction: row;
    z-index: 1;
    position: fixed;
    bottom: 0;
    background: #9932CC;
    width: 100%;
    height: 5rem;
    color: white;
    overflow: contain;
    // ${props => props.fixed && css`
    // position: fixed;
    // top: 0;
    // `}
`;

const Option = styled.button`
    font-size: 0.75em;
    padding: 0.25em 1em;
    margin: 0.25em;
    border: none;
    border-radius: 3px;
    // height: 40px;
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
