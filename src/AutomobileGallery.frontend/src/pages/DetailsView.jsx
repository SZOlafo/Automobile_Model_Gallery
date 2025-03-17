import { MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import { useNavigate } from "react-router";

import "../css/DetailsView.css"

export default function DetailsView() {

    const navigate = useNavigate();

    function backToShop() {
        navigate('/');
    }

    return (<>
        <MDBContainer>
            <MDBIcon fas icon="arrow-left" className="arrow" onClick={backToShop} />
            <MDBRow className="mt-4">
                <div className='product'>
                    <figure id="image-product" className='bg-image'>
                        <img
                            src='https://img.freepik.com/free-psd/red-isolated-car_23-2151852884.jpg'
                            className='img-fluid rounded shadow-3'
                            alt='...'
                        />
                        <figcaption className="text-start mt-4 h1">Test</figcaption>
                    </figure>
                </div>
            </MDBRow>
        </MDBContainer >
    </>)
}