import { useState} from 'react';
function Article(props){
    const { index, refresh, setRefresh } = props;
    const [content,setContent] = useState(index.content)

    function handleContentChange(event) {
        setContent(event.target.value);
    }
  function handleUpdate(e,index) {
    fetch(`http://localhost:3000/articles/${index.id}`, {
        method: "PATCH",
        headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content
    }),
  })
    .then((r) => r.json())
    .then((updatedItem) => console.log(updatedItem));
    setRefresh(!refresh);
  }
  function handleDelete(){
    fetch(`http://localhost:3000/articles/${index.id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then(() => console.log("deleted!"));
    setRefresh(!refresh);
  }

    return (<div className="article">
         <h2>{index.title}</h2>
        <p>{index.content}</p>
        <div className="edit">
          <label><p>Want to correct something? </p></label>
          <input placeholder={'edit'} type="text" value={content} onChange={handleContentChange} />
         < button onClick={(e)=>handleUpdate(e,index)}>Update</button>
        </div>
         
        <button onClick={handleDelete}>Delete</button> 
      </div>)
}
export default Article;