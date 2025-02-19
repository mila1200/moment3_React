import { useState, useEffect } from "react"
import { Product } from "../types/product.types"


const HomePage = () => {

  //state för produkter
  const [products, setProducts] = useState<Product[]>([])
  //state för error
  const [error, setError] = useState("");

  //hämtar listan 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products", {
          method: "GET",
          credentials: "include"
        });

        if(!res.ok) {
          throw new Error;
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError("Fel vid inhämtning av produkter.")
      }
    };
    fetchProducts();
  }, []);

  //loopar igenom produkter och skriver ut dem i en tabell
  return (
    <div>
      <h1>Välkommen</h1>
      <h2>Produkter i lager</h2>
      <div className="errorMessage">{error && <p>{error}</p>}</div>
      <table>
        <thead>
          <tr>
            <th>Produktnamn</th>
            <th>Varumärke</th>
            <th>Beskrivning</th>
            <th>Pris</th>
            <th>Antal</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.units}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage