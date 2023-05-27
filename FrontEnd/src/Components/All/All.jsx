import React, { useState } from "react";
import Footer from "../Footer/Footer";
import "./All.css";

function All() {
  const [figurines, setFigurines] = useState("");
  const allFigurines = async (event) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:3001/api/all",
        requestOptions
      );
      if (response.ok) {
        const respuesta = await response.json();
        setFigurines(respuesta.figurines);
      } else {
        const respuesta = await response.json();
        alert(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };

  return (
    <div>
      <header className="NavContainer">
        <h2>NBA Figurines Trade</h2>
        <div className="buttonContainer">
          <button className="NavButton" onClick={allFigurines}>
            All
          </button>
          <button className="NavButton">Need</button>
          <button className="NavButton">Repeated</button>
        </div>
      </header>
      {figurines &&
        figurines.map((figurines) => {
          return (
            <section>
              {figurines.id}
              {figurines.nombre}
              <img src={figurines.imagen} alt="" />
              {figurines.album_nombre}
              <img src={figurines.album_imagen} alt="" />
              {figurines.tengo}
            </section>
          );
        })}

      <section>
        <Footer />
      </section>
    </div>
  );
}

export default All;
