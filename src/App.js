import './App.css';
import React, { useState, useEffect } from 'react';
import { db } from './backend/config';
import Protein from './components/Protein';
import CreateList from './components/CreateList';
import Cheese from './components/Cheese';
import Sauce from './components/Sauce';
import styled, { createGlobalStyle } from 'styled-components';
import PreferenceBar from './components/PreferenceBar';
import Sandos from './components/Sandos';
import AddOn from './components/AddOn';
import Footer from './components/Footer';
import myImage from './images/background1.jpg';

const GlobalStyle = createGlobalStyle`
    h1,h2,h3, body {
      // font-family: 'Open Sans Condensed', sans-serif;
      font-family: 'Exo', sans-serif;
    }
`;
  const Slider = styled.div`
    // background: linear-gradient(to top, #e66465, #9198e5);

    // background: #722395;
    background-image: url(${myImage});
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    
  `;
  
function App() {

  const [proteinList, setProteinList] = useState([]);
  const [proteinType, setProteinType] = useState('');

  const [chosenCheese, setChosenCheese] = useState([]);
  const [chosenProtein, setChosenProtein] = useState([]);
  const [chosenSauce, setChosenSauce] = useState([]);
  const [chosenAddOn, setChosenAddOn] = useState([]);

  const [preferenceList, setPreferenceList] = useState({
    protein: [],
    cheeses: [],
    sauces: [],
  });

  const [preferences, setPreferences] = useState([]);


  const [value, setValue] = useState([]);

  const [findSando, setFindSando] = useState(false);


  return (
    <>
      <Slider>
        <GlobalStyle />
        <div style={{
          width: '100%',
          // height: '30vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '1rem'
        }}>
          <h1 className="big-title" style={{
            color: 'yellow',
            fontSize: '3rem',
            marginLeft: '1rem',
            marginRight: '1rem',
            marginTop: '5rem',
            textAlign:'center',
          }}>Ike's Sandwiches Finder</h1>
          <div className="description" style={{
            position: 'relative',
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <p style={{color: 'yellow', textAlign: 'center'}}>This product may not show enough sandwiches as it is still in the developmental phase. <br></br>Sando Recommendo (Ike's Sandwiches Finder) is the intellectual property of Nguyen Dinh</p>
          </div>
        </div>
        <PreferenceBar
          preferences={preferences}
          setPreferences={setPreferences}
          preferenceList={preferenceList}
          setPreferenceList={setPreferenceList}
          chosenProtein={chosenProtein} setChosenProtein={setChosenProtein}
          chosenCheese={chosenCheese} setChosenCheese={setChosenCheese}
          chosenSauce={chosenSauce} setChosenSauce={setChosenSauce}
          chosenAddOn={chosenAddOn} setChosenAddOn={setChosenAddOn}
          value={value}
          setValue={setValue}
          findSando={findSando}
          setFindSando={setFindSando}
        />
        <CreateList
          proteinList={proteinList}
          setProteinList={setProteinList}
          proteinType={proteinType}
          setProteinType={setProteinType}
        />
        <Protein
          proteinList={proteinList}
          chosenProtein={chosenProtein}
          setChosenProtein={setChosenProtein}
          proteinType={proteinType}
          setProteinType={setProteinType}
        />
        <Cheese
          chosenCheese={chosenCheese}
          setChosenCheese={setChosenCheese}
          proteinList={proteinList}
        />
        <Sauce
          chosenSauce={chosenSauce}
          setChosenSauce={setChosenSauce}
          proteinList={proteinList}
        />
        <AddOn
          chosenAddOn={chosenAddOn}
          setChosenAddOn={setChosenAddOn}
          proteinList={proteinList}
        />
        <Sandos
          preferenceList={preferenceList}
          preferences={preferences}
          chosenProtein={chosenProtein}
          chosenCheese={chosenCheese}
          chosenSauce={chosenSauce}
          chosenAddOn={chosenAddOn}
          value={value}
          setValue={setValue}
          findSando={findSando}
          setFindSando={setFindSando}
          proteinType={proteinType}
          setProteinType={setProteinType}
        />
        <Footer />
        </Slider>
      </>
  );
}

export default App;
