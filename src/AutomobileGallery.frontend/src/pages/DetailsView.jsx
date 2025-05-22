import { useNavigate } from "react-router-dom";
import "../css/DetailsView.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CarModel from "../components/CarModel";
import { useState } from "react";

export default function DetailsView() {
  const navigate = useNavigate();

  const [dirLightColor, setDirLightColor] = useState("#ffffff");
  const [ambientColor, setAmbientColor] = useState("#404040");
  const [dirPositionX, setDirPositionX] = useState(10);
  const [dirPositionY, setDirPositionY] = useState(10);
  const [dirPositionZ, setDirPositionZ] = useState(10);
  const [showLightHelper, setShowLightHelper] = useState(false);

  // state
const [dirLightIntensity, setDirLightIntensity] = useState(1);


  function backToShop() {
    navigate('/');
  }

  return (
    <>
      <ArrowBackIcon id="arrow" onClick={backToShop} />

      <div className="light-controls">
        <h3>🎛️ Ustawienia Światła</h3>

        <label>
          Kolor światła kierunkowego:
          <input
            type="color"
            value={dirLightColor}
            onChange={(e) => setDirLightColor(e.target.value)}
          />
        </label>
        <br />

        <label>
          Kolor ambientu:
          <input
            type="color"
            value={ambientColor}
            onChange={(e) => setAmbientColor(e.target.value)}
          />
        </label>
        <br />

        <label>
          Kierunek X:
          <input
            type="range"
            min="-20"
            max="20"
            value={dirPositionX}
            onChange={(e) => setDirPositionX(Number(e.target.value))}
          />
          <span> {dirPositionX}</span>
        </label>
        <br />

        <label>
          Kierunek Y:
          <input
            type="range"
            min="-20"
            max="20"
            value={dirPositionY}
            onChange={(e) => setDirPositionY(Number(e.target.value))}
          />
          <span> {dirPositionY}</span>
        </label>
        <br />

        <label>
          Kierunek Z:
          <input
            type="range"
            min="-20"
            max="20"
            value={dirPositionZ}
            onChange={(e) => setDirPositionZ(Number(e.target.value))}
          />
          <span> {dirPositionZ}</span>
        </label>
      </div>

      <label>
        Siła światła:
        <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={dirLightIntensity}
            onChange={(e) => setDirLightIntensity(Number(e.target.value))}
        />
            <span> {dirLightIntensity}</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={showLightHelper}
            onChange={(e) => setShowLightHelper(e.target.checked)}
          />
          Pokaż kierunek światła
        </label>


      <div id="product">
        <figure id="image-product" className="bg-image">
          <CarModel
            modelPath={
              "https://atomobilegallery.blob.core.windows.net/cars/3dModels/volkswagen_karman.glb"
            }
            dirLightColor={dirLightColor}
            ambientColor={ambientColor}
            dirPosition={{
              x: dirPositionX,
              y: dirPositionY,
              z: dirPositionZ
            }}
            dirLightIntensity={dirLightIntensity}
            showLightHelper={showLightHelper}
          />
          <h1 id="caption">Test</h1>
        </figure>
      </div>
    </>
  );
}
