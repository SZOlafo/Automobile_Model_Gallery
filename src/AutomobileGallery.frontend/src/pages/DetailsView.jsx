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
        fetch(`/api/carDetails/${carId}`)
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
                {/* <img
                    src='https://img.freepik.com/free-psd/red-isolated-car_23-2151852884.jpg'
                    className='img-fluid rounded shadow-3'
                    alt='...'
                /> */}
                <CarModel modelPath={'https://atomobilegallery.blob.core.windows.net/cars/3dModels/volkswagen_karman.glb'} />
                <h1 id="caption">Test</h1>
            </figure>
        </div>
    </>)
}