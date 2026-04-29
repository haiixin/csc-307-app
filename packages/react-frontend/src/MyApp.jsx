// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

// const characters = [
//   {
//     name: "Charlie",
//     job: "Janitor"
//   },
//   {
//     name: "Mac",
//     job: "Bouncer"
//   },
//   {
//     name: "Dee",
//     job: "Aspring actress"
//   },
//   {
//     name: "Dennis",
//     job: "Bartender"
//   }
// ];

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function deleteUser(id) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
      });
    return promise;
  }

  function removeOneCharacter(index) {
    const characterId = characters[index]._id;
    deleteUser(characterId)
      .then((res) => {
        if (res.status === 204 || res.status === 200) {
          const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
        }
        
      }).catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
      })
      .then((newUser) => {
        setCharacters([...characters, newUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
