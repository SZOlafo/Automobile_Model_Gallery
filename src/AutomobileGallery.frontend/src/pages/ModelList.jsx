import { MDBContainer, MDBRow, MDBCol, MDBSpinner } from "mdb-react-ui-kit"
import { useState } from "react"
import "../css/ModelList.css"
import ProductCard from "../components/ProductCard";

export default function ModelList() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    async function getModelList() {
        const response = await fetch('localhost:8080/get-model-list');
        const data = response.json();
        setProducts(data);
        setIsLoading(false);
    }

    return (<>
        <MDBContainer fluid>
            <h1 id="title">Welcome in CarVault3D!</h1>
            <p>Here you are able to find 3D models scanned by Wroclaw University of Science's students</p>

            <MDBRow className="h-100">
                <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                    <MDBCol>
                        <ProductCard />
                    </MDBCol>
                    <MDBCol>
                        <ProductCard />
                    </MDBCol>
                    <MDBCol>
                        <ProductCard />
                    </MDBCol>
                    <MDBCol>
                        <ProductCard />
                    </MDBCol>
                </MDBRow>

                {!isLoading ?
                    products.length === 0 ?
                        <p>Currently, we are out of stock</p>
                        :
                        <MDBRow className='row-cols-1 row-cols-md-3 g-4 mt-2'>
                            {products.map(element => (
                                <MDBCol key={element.id}>
                                    <ProductCard element={element} />
                                </MDBCol>
                            ))}
                        </MDBRow>
                    :
                    <article id='loading'>
                        <MDBSpinner role='status'>
                            <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                    </article>
                }

            </MDBRow >
        </MDBContainer>
    </>)
}