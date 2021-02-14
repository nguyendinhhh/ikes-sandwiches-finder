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

const GlobalStyle = createGlobalStyle`
    h1,h2,h3, body {
      // font-family: 'Open Sans Condensed', sans-serif;
      font-family: 'Exo', sans-serif;
    }
`;
  const Slider = styled.div`
    background: linear-gradient(to top, #e66465, #9198e5);
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
  
function App() {

  const [proteinList, setProteinList] = useState([]);


  const [chosenCheese, setChosenCheese] = useState([]);
  const [chosenProtein, setChosenProtein] = useState([]);
  const [chosenSauce, setChosenSauce] = useState([]);


  const [preferenceList, setPreferenceList] = useState({
    protein: [],
    cheeses: [],
    sauces: [],
  });


  // const [data, setData] = useState([]);
  // const [testData, setTestData] = useState([]);

  // const getJsonData = () => {
  //   fetch('./backend/data.json', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept' : 'application/json',
  //     }
  //   }).then(function (response) {
  //     console.log(response);
  //     return response.json();
  //   }).then((myJson) => {
  //     console.log(myJson);
  //     setTestData(myJson);
  //   })
  // }

  // const getData = () => {
  //   db.ref('add-ons').on('value', (snapshot) => {
  //     // console.log(snapshot.val()['main-veggies']);
  //     let arr = snapshot.val()['main-veggies'].split(",");
  //     // arr.forEach(element => {
  //     //   setData([...element]);
  //     // });
  //     // setData(arr);
  //     // console.log(data)

  //     // console.log(arr);
  //   })
      
  // };

  
  // useEffect(() => {
  //   getData();
  // },[])


  return (
    <>
      <Slider>
        <GlobalStyle />
        <PreferenceBar
          preferenceList={preferenceList}
          setPreferenceList={setPreferenceList}
          chosenProtein={chosenProtein}
          chosenCheese={chosenCheese}
          chosenSauce={chosenSauce}
        />
        <CreateList
          proteinList={proteinList}
          setProteinList={setProteinList}
        />
        <Protein
          proteinList={proteinList}
          chosenProtein={chosenProtein}
          setChosenProtein={setChosenProtein}
        />
        <Cheese
          chosenCheese={chosenCheese}
          setChosenCheese={setChosenCheese}
        />
        <Sauce
          chosenSauce={chosenSauce}
          setChosenSauce={setChosenSauce}
        />
        <Sandos
          preferenceList={preferenceList}
          chosenProtein={chosenProtein}
          chosenCheese={chosenCheese}
          chosenSauce={chosenSauce}
        />
        </Slider>
      </>
  );
}

export default App;
