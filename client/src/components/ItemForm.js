// src/components/ItemForm.js
import React, { useState} from 'react';
import { useHistory } from "react-router-dom";

function ItemForm(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    let history = useHistory();
    const {setRefresh, refresh} = props;
  
    // Add function to handle submissions
    function handleSubmit(e) {
      e.preventDefault();
      const itemData = {
        title: title,
        content: content
      };

      // fetch post request requires headers 

      fetch("http://localhost:3000/articles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(itemData),
      })
      .then((r) => r.json())
     .then((newItem) => console.log(newItem));

        // changing refresh triggers another api call in components/app.js
        setRefresh(!refresh);

        // Can't use Link on a submit button 
        // history.push("/");
    }

    // event listener functions 

    function handleTitleChange(event) {
        setTitle(event.target.value);
      }
      
      function handleContentChange(event) {
        setContent(event.target.value);
      }

  
    return (

      <form className="NewItem" onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={handleTitleChange} />
        <input type="text" value={content}  onChange={handleContentChange} />
         <button>Submit</button>
      </form>
    );
  }

  export default ItemForm;
