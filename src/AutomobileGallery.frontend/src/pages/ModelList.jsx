import TitlebarImageList from "../components/TitlebarImageList";

import "../css/ModelList.css"

export default function ModelList() {
    return (
        <div>
            <h1 id="title">Welcome in CarVault3D!</h1>
            <p id="description">Here you are able to find 3D models scanned by Wroclaw University of Science's students</p>
            <TitlebarImageList />
        </div>
    );
}