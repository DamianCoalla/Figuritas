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
  const updateFigurine = async (id) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(
        `http://localhost:3001/api/figurines/${id}`,
        requestOptions
      );

      if (response.ok) {
        allFigurines();
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };
  const needFigurines = async (event) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/need",
        requestOptions
      );
      if (response.ok) {
        const respuesta = await response.json();
        setFigurines(respuesta.figurines);
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };
  const repeatedFigurines = async (event) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/repeated",
        requestOptions
      );
      if (response.ok) {
        const respuesta = await response.json();
        setFigurines(respuesta.figurines);
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };
  const decrementF = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:3001/api/decrement/${id}`,
        requestOptions
      );
      if (response.ok) {
        allFigurines();
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };

  const incrementF = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:3001/api/increment/${id}`,
        requestOptions
      );
      if (response.ok) {
        allFigurines();
      } else {
        const respuesta = await response.json();
        console.log(respuesta.error);
      }
    } catch (error) {
      alert("An unexpected error has occurred. Please try again.");
    }
  };

  return (
    <div>
      <header className="NavContainer">
        <h2 className="tituloFiguritas">NBA Figurines Trade</h2>
        <div className="buttonContainer">
          <button className="NavButton" onClick={allFigurines}>
            All
          </button>
          <button className="NavButton" onClick={needFigurines}>
            Need
          </button>
          <button className="NavButton" onClick={repeatedFigurines}>
            Repeated
          </button>
        </div>
      </header>
      {figurines &&
        figurines.map((figurines) => {
          const figuritaStyle = figurines.tengo
            ? {}
            : { backgroundColor: "gray" };
          return (
            <section className="conteiner" key={figurines.id}>
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
                  {figurines.tengo ? (
                    <div>
                      <button onClick={() => decrementF(figurines.id)}>
                        -
                      </button>
                      <span className="cantidad">{figurines.cantidad}</span>
                      <button onClick={() => incrementF(figurines.id)}>
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="addButton"
                      onClick={() => updateFigurine(figurines.id)}
                    >
                      Add
                    </button>
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
