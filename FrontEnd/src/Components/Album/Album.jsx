import React, { useEffect, useState } from "react";
import "./Album.css";

function Album() {
  const [albums, setAlbums] = useState([]);
  const [figurines, setFigurines] = useState([]);

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

  const figurinesByAlbums = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `http://localhost:3001/api/albums/${album.id}`,
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

  return (
    <div className="albumContainer">
      {albums &&
        albums.map((album) => (
          <button
            className="albumButton"
            key={album.id}
            onClick={() => figurinesByAlbums(album.id)}
          >
            <img className="imageAlbum" src={album.imagen} alt="" />
          </button>
        ))}
      {figurines.length > 0 && (
        <div>
          {figurines.map((figurin) => (
            <div key={figurin.id}>
              <p>{figurin.id}</p>
              <img src={figurin.imagen} alt="" />
              <p>{figurin.nombre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Album;
