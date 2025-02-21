import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types/product.types";
import "./css/UpdateProductPage.css"

const UpdateProductPage = () => {
    //hämta produktens id från URL 
    const { id } = useParams();
    const navigate = useNavigate();

    //states för att hantera produkt och fel
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

    //hämta produkt baserat på id
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5000/product/${id}`, {
                    method: "GET",
                    credentials: "include"
                });

                if (!res.ok) {
                    throw new Error;
                }

                const data = await res.json();
                setProduct(data);
            } catch (error) {
                setError("Fel vid hämtning av produkt");
            }
        }

        fetchProduct();
    }, [id])

    const inputChange = (e: any) => {
        const { name, value } = e.target;

        //tar in hela produktobjektet och uppdaterar endast det som ändras
        setProduct((prevProduct) => ({
            ...prevProduct!,
            [name]: value,
        }));
    }


    const updateProduct = async (e: any) => {
        e.preventDefault();

        if (!product) {
            return;
        }
        //skicka put-förfrågan
        try {
            const res = await fetch("http://localhost:5000/product/" + product?._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(product)
            });

            if (!res.ok) {
                throw new Error;
            }

            navigate("/manageproducts")

        } catch (error) {
            setError("Det blev ett fel vid uppdatering av poster.");
        }
    }


    return (
        <div className="updateContainer">
            <div className="updateBox">
                <h1>Uppdatera produkt</h1>
                {error && <span className="errorMessage">{error}</span>}

                {product ? (
                    <form onSubmit={updateProduct}>
                        <label htmlFor="name">Namn:</label><br />
                        <input type="text" name="name" value={product?.name} onChange={inputChange} />
                        <br />

                        <label htmlFor="brand">Varumärke:</label><br />
                        <input type="text" name="brand" value={product?.brand} onChange={inputChange} />
                        <br />

                        <label htmlFor="description">Beskrivning:</label><br />
                        <textarea name="description" value={product?.description} onChange={inputChange} />
                        <br />

                        <label htmlFor="price">Pris:</label><br />
                        <input type="number" name="price" value={product?.price} onChange={inputChange} />
                        <br />

                        <label htmlFor="units">Antal:</label><br />
                        <input type="text" name="units" value={product?.units} onChange={inputChange} />
                        <br />

                        <input id="updateBtn" type="submit" value="Uppdatera" />
                    </form>
                ) : (
                    <p className="loading" >Laddar produkt...</p>
                )}
            </div>
        </div>
    )
}

export default UpdateProductPage