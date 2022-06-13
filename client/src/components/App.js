// src/components/App.js
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import NavBar from "./NavBar";
import ItemForm from './ItemForm'
import '../App.css'

function App() {
  const [articles, setArticles] = useState([]);
  const [refresh,setRefresh] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
      });
  }, [refresh]);

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>    
        <Route exact path="/item-form">
          <ItemForm setRefresh={setRefresh} refresh={refresh} />
        </Route>
        <Route exact path="/">
          <Home setRefresh={setRefresh} refresh={refresh}  articles={articles}/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;