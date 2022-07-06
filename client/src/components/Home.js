// src/components/Home.js
import React, {useState} from "react";
import { Link, Route } from "react-router-dom"
import Article from "./Article";

function Home(props) {
  const { articles, refresh, setRefresh } = props;

  return (<div className = "home">
    <h1> The Latest in Animal News</h1>
    <div className="articles-container">
      {articles.map((index,key)=>{return <Article key={key} index={index} refresh={refresh} setRefresh={setRefresh}/>})}
    </div>
   
    </div>)
}

export default Home;