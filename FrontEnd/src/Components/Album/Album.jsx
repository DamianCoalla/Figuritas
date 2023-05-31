import React, { useEffect, useState } from "react";
import "./Album.css";

function Album() {
  const [albums, setAlbums] = useState([]);
  const [figurines, setFigurines] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    const showsAlbums = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      try {
        const response = await fetch(
          "http://localhost:3001/api/albums",
          requestOptions
        );
        if (response.ok) {
          const respuesta = await response.json();
          setAlbums(respuesta.albums);
        } else {
          const respuesta = await response.json();
          console.log(respuesta.error);
        }
      } catch (error) {
        alert("An unexpected error has occurred. Please try again.");
      }
    };
    showsAlbums();
  }, []);

  const figurinesByAlbums = async (albumId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `http://localhost:3001/api/albums/${albumId}`,
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

  const albumClick = (albumId) => {
    setSelectedAlbumId(albumId);
    figurinesByAlbums(albumId);
  };

  return (
    <div className="albumContainer">
      {albums &&
        albums.map((album) => (
          <button
            className="albumButton"
            key={album.id}
            onClick={() => albumClick(album.id)}
          >
            <img className="imageAlbum" src={album.imagen} alt="" />
          </button>
        ))}
      {selectedAlbumId && (
        <div className="figurinesContainer">
          {figurines.map((figurines) => {
            const figurinStyle = figurines.tengo
              ? { backgroundColor: "white" }
              : { backgroundColor: "gray" };
            return (
              <section className="conteiner" key={figurines.id}>
                <div className="eachFigurines" style={figurinStyle}>
                  <div className="topFigururin">
                    <p>{figurines.id}</p>
                    <p>{figurines.album_nombre}</p>
                    <img
                      className="albumImage"
                      src={figurines.album_imagen}
                      alt=""
                    />
                  </div>
                  <img
                    className="figurinesImage"
                    src={figurines.imagen}
                    alt=""
                  />
                  <div className="bottonFigurin">
                    <p className="playerName">{figurines.nombre}</p>
                    {figurines.tengo ? (
                      <div className="threeButton">
                        <button
                          className="buttonCount"
                          onClick={() => decrementF(figurines.id)}
                        >
                          -
                        </button>
                        <span className="cantidad">{figurines.cantidad}</span>
                        <button
                          className="buttonCount"
                          onClick={() => incrementF(figurines.id)}
                        >
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
        </div>
      )}
    </div>
  );
}

export default Album;
