import React, { useEffect, useState } from "react";
import "./Album.css";

function Album() {
  const [albums, setAlbums] = useState([]);

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
  return (
    <div className="albumContainer">
      {albums.map((albums) => (
        <button className="albumButton" key={albums.id}>
          <img className="imageAlbum" src={albums.image} alt="" />
        </button>
      ))}
    </div>
  );
}

export default Album;
