import { useNavigate } from "react-router-dom";
import "../css/DetailsView.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CarModel } from "../components/CarModel";

export default function DetailsView() {

    const navigate = useNavigate();

    function backToShop() {
        navigate('/');
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
                <CarModel modelPath={'assets/golf.glb'} />
                <h1 id="caption">Test</h1>
            </figure>
        </div>
    </>)
}