import { useNavigate } from "react-router-dom";

function GameSelect() {

    let navigate = useNavigate();
    const routeChange = (route) => {
        let path = route;
        navigate(path);
    }

    return (<>

        <p>Select your game</p>

        <button type="submit" onClick={() => routeChange("rhymer")}>Rhymer</button>

        <button type="submit" onClick={() => routeChange("movie")}>Quote guesser</button>

    </>);
}

export default GameSelect;