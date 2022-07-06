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
  const [searchTerm,setSearchTerm] = useState("Ecuador");
  const [searchResults,setSearchResults] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
      });
  }, [refresh]);

  function updateSearchTerm(e){
    setSearchTerm(e.target.value);
  };

  function search(){
    const results = [];
    for (let i = 0; i < articles.length;i++){
      if (articles[i].title.includes(searchTerm) || articles[i].content.includes(searchTerm) ){
        results.push(articles[i]);
      }
    };
    setSearchResults(results);
    return results;
  }

  return (
    <div>
      <NavBar />
      <div>
        <input onChange={updateSearchTerm} value={searchTerm}></input>
        <button onClick={search}>Submit</button>
      </div>
      <div>
      {searchResults.length > 0 ? <h2>Search Results</h2>:null}
        {searchResults.length > 0 ? searchResults.map((index,key)=><p key={key}>{index.title}</p>):null}
      </div>
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