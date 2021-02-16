import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const PreferenceBar = ({
    preferences,
    setPreferences,
    preferenceList,
    setPreferenceList,
    chosenProtein,
    setChosenProtein,
    chosenCheese,
    setChosenCheese,
    chosenSauce,
    setChosenSauce,
    chosenAddOn,
    setChosenAddOn,
    value,
    setValue,
    findSando,
    setFindSando,
    proteinList}) => {

    const [show, setShow] = useState(false);

    const [disabled, setDisabled] = useState(true);

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
        for (let i = 0; i < chosenAddOn.length; i++) {
            const item = chosenAddOn[i];
            if (!preferences.includes(item)) setPreferences([...preferences, item]);
        }

      }
    
    useEffect(() => {
        
        getPreference();
        if (value.length > 0){    
            setDisabled(false);
        } else setDisabled(true);
        
    }, [chosenProtein, chosenCheese, chosenSauce, chosenAddOn, value])

    useEffect(() => {
        preferences.length > 0 ? setShow(true) : setShow(false);
    }, [preferences]) 

    useEffect(() => {
        clearPreference();
    },[proteinList])
    
    const removeClickHandler = (item) => {
        setValue([]);

        if (chosenProtein.includes(item)) {
            let newProtein = chosenProtein.filter((i) => i !== item);
            setChosenProtein(newProtein);
        }
        
        else if (chosenCheese.includes(item)) {
            let newCheese = chosenCheese.filter((i) => i !== item);
            setChosenCheese(newCheese);
        }
        
        else if (chosenSauce.includes(item)) {
            let newSauce = chosenSauce.filter((i) => i !== item);
            setChosenSauce(newSauce);
        }
        
        else if (chosenAddOn.includes(item)) {
            let newAddOn = chosenAddOn.filter((i) => i !== item);
            setChosenAddOn(newAddOn);
        }

        if (preferences.includes(item)) {
            let newPreferences = preferences.filter(i => i !== item);
            setPreferences(newPreferences);
        }
        
    }

    const clearPreference = () => {
        setChosenProtein([]);
        setChosenCheese([]);
        setChosenSauce([]);
        setChosenAddOn([]);
        setPreferences([]);
    }
    
    return (
        // <List fixed={fixedPosition}>
        <div style={{width: '100%'}}>
            {show ? <List>
            <div style={{ display: 'flex', padding: '0.5rem', flexDirection:'row', overflow: 'scroll'}}>
                {preferences.map((item, i) => { 
                    return <Option
                        key={i}
                        onClick={() => removeClickHandler(item)}
                    >{item}</Option>
                })}
                </div>
            <div style={{display:'flex',width:'100%',flexDirection:'row',justifyContent:'center'}}>
                    <ClearButton onClick={() => clearPreference()}>Clear</ClearButton>
                <Button disabled={disabled} onClick={() => setFindSando(true)}>{disabled ? 'Could not find any sandos!' : `Found ${value.length} sandwiches!`}</Button>
            </div>
            
        </List> : null}
        
    </div>
        
    )
}

const List = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 1;
    position: fixed;
    bottom: 0;
    // background: #9932CC;
    background: #F3AC0A;
    width: 100%;
    height: 8rem;
    color: white;
    overflow: contain;
    
    // ${props => props.fixed && css`
    // position: fixed;
    // top: 0;
    // `}
`;


const Option = styled.button`
    font-size: 1em;
    padding: 0.5em 1em;
    margin: 0.25em;
    margin-top: 1em;
    border: none;
    border-radius: 3px;
    box-shadow: 1px 1px 1px black;
    background: white;
    // height: 40px;

    @media screen and (max-width: 760px) {
        font-size: 0.75em;
      }

    &:hover {
        background:#FD7669;
    }

    &:after {
        content: 'x';
        // content: "\f057";
        // font-family: "Font-Awesome";
        padding-left: 10px;
    }
`;


const Button = styled.button`
font-size: 1em;
padding: 0.5em 1em;
margin: 0.25em;
border: none;
border-radius: 50px;
width: 15rem;
align-self: center;
background: yellow;
// background: #F9A12D;
box-shadow: 1px 1px 1px black;
// height: 40px;
// width: 100px;

&:hover {
    // background: #B8860B;
    background: #FD7669;
    // color: white;
}

&:disabled {
    background: #7C7B7C;
    color: #222122;  
}
`;

const ClearButton = styled.button`
font-size: 1em;
padding: 0.5em 1em;
margin: 0.25em;
border: none;
border-radius: 50px;
// width: 15rem;
align-self: center;
background: white;
box-shadow: 1px 1px 1px black;
// height: 40px;
// width: 100px;

&:hover {
    // background: #B8860B;
    background: grey;
    // color: white;
}


`;
export default PreferenceBar;
