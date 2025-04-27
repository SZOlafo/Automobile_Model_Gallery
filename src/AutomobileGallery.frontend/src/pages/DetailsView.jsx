import { useNavigate, useParams } from "react-router-dom";
import "../css/DetailsView.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CarModel } from "../components/CarModel";
import { useEffect, useState } from "react";

export default function DetailsView() {

    const { carId } = useParams();
    const [model, setModel] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getModel();
    }, [])

    function backToShop() {
        navigate('/');
    }

    function getModel() {
        fetch(`https://localhost:7227/api/carDetails/${carId}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setModel(data);
        })
    }

    if (!model) {
        return <div>Ładowanie modelu...</div>; // Albo spinner, albo pusty div
    }

    return (<>
        <ArrowBackIcon id="arrow" onClick={backToShop}></ArrowBackIcon>
        <div id='product'>
            <figure id="image-product" className='bg-image'>
                <CarModel modelPath={model.carModelUrl} />
                <h1 id="caption">{model.carName}</h1>
                <p>{model.carDescription}</p>
            </figure>
        </div>
    </>)
}