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
          const figuritaStyle = figurines.tengo
            ? {}
            : { backgroundColor: "gray" };
          return (
            <section className="conteiner">
              <div className="eachFigurines" style={figuritaStyle}>
                <div className="topFigururin">
                  <p> {figurines.id}</p>
                  <p> {figurines.album_nombre}</p>
                  <img
                    className="albumImage"
                    src={figurines.album_imagen}
                    alt=""
                  />
                </div>
                <img className="figurinesImage" src={figurines.imagen} alt="" />
                <div className="bottonFigurin">
                  <p> {figurines.nombre}</p>
                  {/*  {figurines.tengo}
                  <p> {figurines.cantidad}</p> */}
                  {figurines.tengo ? (
                    <span className="cantidad">{figurines.cantidad}</span>
                  ) : (
                    <button className="addButton">Add</button>
                  )}
                </div>
              </div>
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
