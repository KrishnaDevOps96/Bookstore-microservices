import React, { useEffect, useState } from "react";
import { listBooks } from "./api";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listBooks()
      .then(setBooks)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Bookstore Catalog</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {books.map((b) => (
            <li key={b.id}>
              {b.title} - ${b.price} ({b.stock} in stock)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;