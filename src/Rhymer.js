import { useEffect, useState } from "react";
import axios from 'axios'

function Rhymer() {

    const [input, setInput] = useState('')
    const [word, setWord] = useState([])
    const [rhymes, setRhymes] = useState([])


    function handleChange(event) {
        setInput(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(input)
    }

    function printData() {
        console.log(rhymes)
    }

    function filterRhymes() {
        const newList = rhymes.filter((item) => {
            return !item.includes(' ') && !item.includes('-')
        }) 
        console.log(newList)
        //setRhymes(newList)
        setRhymes("hello")
    }

    {/** 
    function filterRhymes() {
        const newList = rhymes.filter((item) => {
            if(!item.includes('-') && !item.includes(' ')){
                console.log(item + " is okay")
                return item;
            }
        });
        setRhymes(newList)
      };
      */}


    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://wordsapiv1.p.rapidapi.com/words/reason/rhymes',
            headers: {
                'X-RapidAPI-Key': 'your key',
                'X-RapidAPI-Host': 'your host'
            }
        };

        axios.request(options).then(function (response) {
            setWord(response.data.word)
            setRhymes(response.data.rhymes.all)

        }).catch(function (error) {
            console.error(error);
        }).finally(() => {
            filterRhymes()
        });
    }, [])

    return (
        <>
            <p>Rhymer Game</p>

            <div>Find single words that rhyme with {word}</div>

            <div>Rhymes are: {rhymes}</div>
            
            <form onSubmit={(event) => handleSubmit(event)}>

                <input type="text" value={input} onChange={(e) => handleChange(e)} />
                <input type="submit" value="Submit"></input>
            </form>


        </>);
}

export default Rhymer;