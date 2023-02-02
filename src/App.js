import "./index.css";
import { React, useEffect, useState } from "react";
import Row from "./components/row";

export default function App(props) {

  const [details, getDetails] = useState([]);
  const [name, getName] = useState("");
  const [age, getAge] = useState("");
  const [userId, getID] = useState("");
  const [button,updateButton]=useState("Update");
  const url =
    "http://localhost:9090/students";
  
  useEffect(() => {
    getUsers();
  },[]);
  
  function getUsers(){
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        getDetails(result);
      });
  }
  function deleteId(id) {
    fetch(url + "/" + id, { method: "DELETE" });
    getDetails(
      details.filter((prev) => {
        return id !== prev.id;
      })
    );
    
  }

  function editRow(id) {
    updateButton("Update");
    let y = details.find((element) => {
      return element.id === id;
    });
    getName(y.name);
    getAge(y.age);
    getID(id);
  }

  function handleUpdate(event) {
    let button_name=(event.target.innerHTML);
    if(button_name==="Update"){
    let item = { name, age };

    fetch(url + "/" + userId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    })
      .then((res) => res.json())
      .then((result) => {
        getUsers();
      });
    getName("");
    getAge("");
    }
    else{
      let item = { name, age };

    fetch(url , {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    })
      .then((res) => res.json())
      .then((result) => {
        getUsers();
      });
      getID("");
      getName("");
      getAge("");
    }
  }
  function handleNewRecord(){
    //console.log(event.target.innerHTML);
    getName("");
    getAge("");
    getID(parseInt(details[details.length-1].id)+1);
    updateButton("Insert");
  }
  

  return (
    <div className="App">
      <h1>Basic React App</h1>
      <center>
        <table>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Student Age</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {details.map((detail, index) => {
            return (
              <Row
                key={index}
                id={detail.id}
                name={detail.name}
                age={detail.age}
                onDelete={deleteId}
                onEdit={editRow}
              />
            );
          })}
        </table>
      </center>
      <div>
        <h2>Update Details</h2>
        <center>
          <table>
            <tr>
              <td>New record?</td>
              <td><button onClick={handleNewRecord}>Yes</button></td>
            </tr>
          <tr>
              <td>ID</td>
              <td>
                <input
                  type="text"
                  value={userId}
                  
                />
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => getName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Age</td>
              <td>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => getAge(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <center>
                  <button onClick={handleUpdate} >{button}</button>
                </center>
              </td>
            </tr>
          </table>
        </center>
      </div>
    </div>
  );
}
