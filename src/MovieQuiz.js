import { useEffect, useState } from "react";
import axios from 'axios'

function MovieQuiz() {

    const sampleMovie = {
        quote: "My mama always said life was like a box of chocolates. You never know what you're gonna get.",
        character: "Forrest Gump",
        show: "Forrest Gump"
    }

    const [movieQuote, setMovieQuote] = useState(sampleMovie.quote)
    const [movie, setMovie] = useState(sampleMovie.show)
    const [input, setInput] = useState('')
    const [prompt, setPrompt] = useState('')

    const [buttonText, setButtonText] = useState('Guess')

    const [score, setScore] = useState(0)
    const [scoreText, setScoreText] = useState('')

    const [activity, setActivity] = useState('')

    function handleClick(e) {
        e.preventDefault()
        console.log('clicked')
    }

    function handleChange(e) {
        e.preventDefault()
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(input)

        const tempInput = input.toLocaleLowerCase()
        const tempMovie = movie.toLocaleLowerCase()

        if (tempInput === tempMovie && buttonText === 'Guess') {
            setPrompt('Your guess was correct, it was ' + movie)
            setButtonText('New quote')
        } else if (
            (movie.includes(input) || movie.includes(tempInput) || tempMovie.includes(tempInput) || tempMovie.includes(input))
            && input !== movie && buttonText === 'Guess') {
            setPrompt('Almost!')
        } else if (input !== movie && buttonText === 'Guess') {
            setPrompt('Try again!')
        } else if (buttonText === 'New quote') {
            setInput('')
            setPrompt('')
            setButtonText('Guess')
            setScore(score + 1)
            fetchActivity()
            //fetchMovie()
        }
    }

    useEffect(() => {
        console.log('fetching...')
        fetchNumber()
        //fetchMovie()
    }, [score])

    async function fetchActivity() {
        const options = {
            method: 'GET',
            url: 'https://www.boredapi.com/api/activity'
        }

        axios.request(options)
            .then(function (response) {
                console.log(response.data)
                setActivity(response.data.activity.activity)

            }).catch(function (error) {
                console.log(error)
            })
    }

    async function fetchNumber() {
        const options = {
            method: 'GET',
            url: 'http://numbersapi.com/' + score
        }

        axios.request(options)
            .then(function (response) {
                console.log(response.data)
                setScoreText(response.data)

            }).catch(function (error) {
                console.log(error)
            })
    }

    async function fetchMovie() {
        const options = {
            method: 'GET',
            url: 'https://movies-quotes.p.rapidapi.com/quote',
            headers: {
                'X-RapidAPI-Key': 'c655e8840dmshef15407a7634c7cp1901f7jsn7688f73961c1',
                'X-RapidAPI-Host': 'movies-quotes.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setMovieQuote(response.data.quote)
            setMovie(response.data.show)
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <div>

            <div>MovieQuizer</div>

            <p>{movieQuote}</p>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Type your guess here..."
                    value={input}
                    onChange={(e) => handleChange(e)}></input>
                <input type="button" onClick={(e) => handleClick(e)} value={buttonText}></input>
            </form>

            {buttonText === 'New quote' ?
                <p>Maybe you should {activity}</p>
            :
                <p>{prompt}</p>

            }

            <p>Score: {score}</p>
            <p>{scoreText}</p>


        </div>);
}

export default MovieQuiz;