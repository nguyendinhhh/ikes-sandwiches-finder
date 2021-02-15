import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { db } from '../backend/config';


const Sandos = ({
    preferenceList,
    preferences,
    chosenProtein,
    chosenCheese,
    chosenSauce,
    chosenAddOn,
    value,
    setValue,
    findSando,
    setFindSando,
    proteinType,
    setProteinType}) => {
    const [show, setShow] = useState(false);
    

    const checkProtein = (array) => {

        for (let i = 0; i < chosenProtein.length; i++){
            const item = chosenProtein[i];
            if (!array.includes(item)) {
                return false;
            }
        }

        // if (proteins.indexOf(',') > -1) {
        //     let arr = proteins.split(",");
        //     for (let i = 0; i < chosenProtein.length; i++) {
        //         if (arr.includes(chosenProtein[i]))
        //             return true;
        //     }
        // } else if (chosenProtein.includes(protein)) return true;

        return true;
    }

    const checkCheese = (array) => {
        for (let i = 0; i < chosenCheese.length; i++){
            const item = chosenCheese[i];
            if (!array.includes(item)) {
                return false;
            }
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
        

        return true;
    }

    const checkSauce = (array) => {
        for (let i = 0; i < chosenSauce.length; i++){
            const item = chosenSauce[i];
            if (!array.includes(item)) {
                return false;
            }
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
        return true;
    }

    const checkAddOn = (array) => {
        for (let i = 0; i < chosenAddOn.length; i++){
            const item = chosenAddOn[i];
            if (!array.includes(item)) {
                return false;
            }
        }
        return true;
    }

    // const checkIngredients = (protein, cheeses, sauces) => {
    //     if (checkProtein(protein) && checkCheese(cheeses) && checkSauce(sauces))
    //         return true;
    //     return false;
    // }

    const checker = (array, target) => {
        if (target.every(item => array.includes(item))) return true;
        return false;
    }

    const getData = () => {
        let query = db.ref('sandwiches').orderByKey();
        query.once('value')
            .then((snapshot) => {
                let objects = []
                snapshot.forEach((childSnapshot) => {
                    const key = childSnapshot.key;
                    const childData = childSnapshot.val();

                    let arr = childData.split(',');
                    
                    if (proteinType === arr[1]) {
                        if (checkProtein(arr)) {
                            if (chosenCheese.length > 0 || chosenSauce.length > 0 || chosenAddOn.length > 0) {
                                let side = []

                                for (let i = 0; i < chosenCheese.length; i++){
                                    side.push(chosenCheese[i]);
                                }
                                for (let i = 0; i < chosenSauce.length; i++){
                                    side.push(chosenSauce[i]);
                                }
                                for (let i = 0; i < chosenAddOn.length; i++){
                                    side.push(chosenAddOn[i]);
                                }
                                
                                let tempArr = arr.slice(2);
                                

                                // for (let i = 0; i < side.length; i++){
                                //     if (!tempArr.includes(side[i])) {
                                //         check = false;
                                //         break;
                                //     }
                                //     // if (tempArr.includes(side[i])) {
                                //     //     if (!objects.some(i => i.name === key)) { objects.push({ name: key, number: arr[0], ingredients: arr.slice(2).join(', ') }) }
                                //     // } else (objects = objects.filter(i => i.name !== side[i]))
                                // }
                                
                                if (checker(tempArr, side)) {
                                    if (!objects.some(i => i.name === key)) { objects.push({ name: key, number: arr[0], ingredients: arr.slice(2).join(', ') }) }
                                }
                            } else if (!objects.some(i => i.name === key)) { objects.push({ name: key, number: arr[0], ingredients: arr.slice(2).join(', ') }) }

                            // if (!objects.some(i => i.name === key)) { objects.push({ name: key, number: arr[0], ingredients: arr.slice(2).join(', ') }) }

                            // if (checkCheese(arr) || checkSauce(arr) || checkAddOn(arr)) {
                            //     //   objects.push({ name: key, ingredients: childData });
                            //     //   objects.push({ name: key, ingredients: arr });
                            //     // if (!objects.includes(key)) objects.push(key);
                            //     if (!objects.some(i => i.name === key)){objects.push({name: key, number: arr[0] , ingredients: arr.slice(2).join(', ')})}
                            //     console.log("inside");
                            //     //   if (!value.includes(key)) setValue([...value, key]);
                            // }
                        }
                    }
                    
                    
                    //   if (checkProtein(childData['protein']) && (checkCheese(childData['cheese']) || checkSauce(childData['sauce'])) ) {
                    //       console.log(key)
                    //       if (!value.includes(key)) setValue([...value, key]);
                    // }
                })
                setValue(objects);
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
        
    }, [chosenProtein,chosenCheese,chosenSauce,preferenceList,preferences])

    return (
        <>
            { findSando ? <Popup>
                <PopupInner>
                    <CloseButton onClick={() => setFindSando(false)}>Close</CloseButton>
                    <h3 style={{marginBottom: '10px'}}>Hurray! Found you some sandwiches!</h3>
                    {value.map((item, i) => {
                        // return <div><h3>{item.name}</h3><p>{item.ingredients}</p></div>
                        return <Card key={i}>
                            <h3>{item.number}. {item.name}</h3>
                            <p>{item.ingredients}</p>
                        </Card>
                    })}
                </PopupInner>
            </Popup> : null }
        </>
        
        // <Division>
        //     {/* <Button onClick={getData}>Generate your sandwich</Button> */}
        //     {/* <Button onClick={buttonShowHandler}>{show ? 'Close your sandwiches' : 'Show your sandwiches'}</Button> */}
        //     {/* {show ? <p>{value}</p> : null} */}
        //     {value.map((item, i) => {
        //         return <p key={i}>{item}</p>
        //     })}
        // </Division>
    )
}

const Card = styled.div`
    // position: absolute;
    width: 100%;
    max-height: 100%;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const Popup = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.2);
    display: flex;
    justify-content:center;
    align-items:center;
    z-index: 3;
`;

const PopupInner = styled.div`
    position: relative;
    padding: 32px;
    width: 100%;
    max-width: 640px;
    // height: 800px;
    max-height: 100%;
    background-color: #fff;
    overflow: scroll;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 0.3rem;
    border-radius: 5px;

    &:hover {
        background: #B8860B;
        color: white;
    }
`;

// const Division = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     // background-color: blue;
//     min-height: 100vh;
//     min-width: 100vw;
// `;

// const Button = styled.button`
// font-size: 1em;
// padding: 0.25em 1em;
// margin: 0.25em;
// border: none;
// border-radius: 3px;
// height: 100px;
// width: 130px;

// &:hover {
//     background: dodgerblue;
//     color: white
// }
// `;

export default Sandos
