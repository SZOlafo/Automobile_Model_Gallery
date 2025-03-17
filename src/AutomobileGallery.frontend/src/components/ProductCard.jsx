import { MDBCard, MDBRipple, MDBCardImage, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit"
import { Link } from "react-router"

export default function ProductCard() {
    return (<>
        <MDBCard className="mt-2">
            <Link to={`/1`}>
                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                    <MDBCardImage
                        src='https://img.freepik.com/free-psd/red-isolated-car_23-2151852884.jpg'
                        alt='...'
                        position='top'
                        width='800px'
                    />
                </MDBRipple>
            </Link>

            <MDBCardBody>
                <MDBCardTitle tag='h2' className='mb-4'>Test test</MDBCardTitle>
            </MDBCardBody>
        </MDBCard>
    </>)
}