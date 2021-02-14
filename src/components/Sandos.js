import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { db } from '../backend/config';


const Sandos = ( {preferenceList, chosenProtein, chosenCheese, chosenSauce} ) => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState([]);

    const checkProtein = (array) => {

        for (let i = 0; i < chosenProtein.length; i++){
            const item = chosenProtein[i];
            if (array.includes(item)) return true;
        }

        // if (proteins.indexOf(',') > -1) {
        //     let arr = proteins.split(",");
        //     for (let i = 0; i < chosenProtein.length; i++) {
        //         if (arr.includes(chosenProtein[i]))
        //             return true;
        //     }
        // } else if (chosenProtein.includes(protein)) return true;
        
        return false;
    }

    const checkCheese = (array) => {
        for (let i = 0; i < chosenCheese.length; i++){
            const item = chosenProtein[i];
            if (array.includes(item)) return true;
        }
        // if (cheeses) {
        //     if (cheeses.indexOf(',') > -1) {
        //         let arr = cheeses.split(",");
        //         for (let i = 0; i < chosenCheese.length; i++) {
        //             if (arr.includes(chosenCheese[i]))
        //                 return true;
        //         }
        //     } else if (chosenCheese.includes(cheeses)) return true;
        // }
        
        
        return false;
    }

    const checkSauce = (array) => {
        for (let i = 0; i < chosenSauce.length; i++){
            const item = chosenProtein[i];
            if (array.includes(item)) return true;
        }
        // if (sauces) {
        //     if (sauces.indexOf(',') > -1) {
        //         let arr = sauces.split(",");
        //         for (let i = 0; i < chosenSauce.length; i++) {
        //             if (arr.includes(chosenSauce[i]))
        //                 return true;
        //         }
        //     } else if (chosenSauce.includes(sauces)) return true;
        // }
        
        return false;
    }

    // const checkIngredients = (protein, cheeses, sauces) => {
    //     if (checkProtein(protein) && checkCheese(cheeses) && checkSauce(sauces))
    //         return true;
    //     return false;
    // }

    const getData = () => {
        let query = db.ref('sandwiches').orderByKey();
        query.once('value')
          .then((snapshot) => {
              snapshot.forEach((childSnapshot) => {
                  const key = childSnapshot.key;
                  const childData = childSnapshot.val();

                  let arr = childData.split(',');
                  let objects = []
                    
                  if (checkProtein(arr) && (checkCheese(arr) || checkSauce(arr))) {
                      console.log(key);
                    //   objects.push({ name: key, ingredients: arr });
                      if (!value.includes(key)) setValue([...value, key]);
                  }
                //   if (checkProtein(childData['protein']) && (checkCheese(childData['cheese']) || checkSauce(childData['sauce'])) ) {
                //       console.log(key)
                //       if (!value.includes(key)) setValue([...value, key]);
                // }
          })
        })
      }

    const buttonShowHandler = (e) => {
        e.preventDefault();
        setShow(!show);
        // console.log(show);
    }

    useEffect(() => {
        // console.log(preferenceList);
        getData();
        // console.log(preferenceList)
    }, [chosenProtein,chosenCheese,chosenSauce])

    return (
        <Division>
            {/* <Button onClick={getData}>Generate your sandwich</Button> */}
            {/* <Button onClick={buttonShowHandler}>{show ? 'Close your sandwiches' : 'Show your sandwiches'}</Button> */}
            {/* {show ? <p>{value}</p> : null} */}
            {value.map((item, i) => {
                return <p key={i}>{item}</p>
            })}
        </Division>
    )
}

const Division = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background-color: blue;
    min-height: 100vh;
    min-width: 100vw;
`;

const Button = styled.button`
font-size: 1em;
padding: 0.25em 1em;
margin: 0.25em;
border: none;
border-radius: 3px;
height: 100px;
width: 130px;

&:hover {
    background: dodgerblue;
    color: white
}
`;

export default Sandos
