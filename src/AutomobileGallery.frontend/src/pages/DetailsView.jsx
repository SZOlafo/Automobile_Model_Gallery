import { useNavigate, useParams } from "react-router-dom";
import "../css/DetailsView.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CarModel from "../components/CarModel";
import { useState } from "react";
import { Button } from "@mui/material";

export default function DetailsView() {
  const navigate = useNavigate();

  const hdrBackgrounds = [
    "/assets/docklands_01_2k.hdr",
    "/assets/cos.hdr"
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  function prevBackground() {
    setCurrentBgIndex((prev) => (prev === 0 ? hdrBackgrounds.length - 1 : prev - 1));
  }

  function nextBackground() {
    setCurrentBgIndex((prev) => (prev === hdrBackgrounds.length - 1 ? 0 : prev + 1));
  }

  const [dirLightColor, setDirLightColor] = useState("#ffffff");
  const [ambientColor, setAmbientColor] = useState("#404040");
  const [dirPositionX, setDirPositionX] = useState(10);
  const [dirPositionY, setDirPositionY] = useState(10);
  const [dirPositionZ, setDirPositionZ] = useState(10);
  const [showLightHelper, setShowLightHelper] = useState(false);

  const { carId } = useParams();
  const [model, setModel] = useState(null);

  // state
  const [dirLightIntensity, setDirLightIntensity] = useState(1);

  useState(() => {
  getModel();
  }, [])

  function backToShop() {
    navigate('/');
  }

  function getModel() {
    fetch(`/api/carDetails/${carId}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        setModel(data);
    })
  }

    if (!model) {
        return <div></div>; // Albo spinner, albo pusty div
    }

  return (
    <>
      <ArrowBackIcon id="arrow" onClick={backToShop} />

      <div className="light-controls">
        <h3>🎛️ Light settings</h3>

        <label>
          Direction light color:
          <input
            type="color"
            value={dirLightColor}
            onChange={(e) => setDirLightColor(e.target.value)}
          />
        </label>
        <br />

        <label>
          Ambient color:
          <input
            type="color"
            value={ambientColor}
            onChange={(e) => setAmbientColor(e.target.value)}
          />
        </label>
        <br />

        <label>
          X:
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
          Y:
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
          Z:
          <input
            type="range"
            min="-20"
            max="20"
            value={dirPositionZ}
            onChange={(e) => setDirPositionZ(Number(e.target.value))}
          />
          <span> {dirPositionZ}</span>
        </label>
        <label>
          Light strength:
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
          Show light visualisation
        </label>
        {/* <label>
          <Button onClick={prevBackground}>Previous</Button>
          <Button onClick={nextBackground}>Next</Button>
          Change background
        </label> */}
      </div>

      <div id="product" style={{
    width: "80%",     // lub dowolna stała/liczba px
    margin: "0 auto",  // ← to właśnie centruje w osi X
  }}>
        <figure id="image-product" className="bg-image">
          <CarModel
            modelPath={model.carModelUrl}
            dirLightColor={dirLightColor}
            ambientColor={ambientColor}
            dirPosition={{
              x: dirPositionX,
              y: dirPositionY,
              z: dirPositionZ
            }}
            dirLightIntensity={dirLightIntensity}
            showLightHelper={showLightHelper}
            hdrBackground={hdrBackgrounds[currentBgIndex]}
          />
          <h1 id="caption">{model.carName}</h1>
          <p>{model.carDescription}</p>
        </figure>
      </div>
    </>
  );
}
