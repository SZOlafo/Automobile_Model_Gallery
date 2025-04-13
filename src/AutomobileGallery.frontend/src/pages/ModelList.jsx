import TitlebarImageList from "../components/TitlebarImageList";

import "../css/ModelList.css"

export default function ModelList() {
    return (
        <div>
            <h1 id="title">Welcome to CarVault3D!</h1>
            <p id="description">Here you can find 3D car models scanned by students of Wroclaw University of Science</p>
            <TitlebarImageList />
        </div>
    );
}