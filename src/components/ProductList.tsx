import { ProductListProps } from "../types/product.types"
import { Product } from "../types/product.types";
import { useState, useEffect } from "react";

const ProductList: React.FC<ProductListProps> = ({ onDelete, onEdit }) => {

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

  return (
    <table>
    {error && <span className="errorMessage">{error}</span>}
    <thead>
      <tr>
        <th>Produktnamn</th>
        <th>Varumärke</th>
        <th>Beskrivning</th>
        <th>Pris</th>
        <th>Antal</th>
        <th>Åtgärder</th>
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
          <td>
            {onEdit && <button onClick={() => onEdit(product._id)}>Redigera</button>}
            {onDelete && <button onClick={() => onDelete(product._id)}>Radera</button>}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default ProductList