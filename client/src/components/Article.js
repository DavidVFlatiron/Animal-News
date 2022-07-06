import { useState} from 'react';
function Article(props){
    const { index, refresh, setRefresh, articles, setArticles } = props;
    const [content,setContent] = useState(index.content)
    const [score,setScore] = useState(0);
    

    function upvote(){
      setScore(score+1);
    }

    function handleContentChange(event) {
        setContent(event.target.value);
    }

    function updateArticle(updatedItem){
      return articles.map((index1)=>index1.id == index.id ? index.content = updatedItem : index1)
    }

    function postDeletedArticle(){
      return articles.filter((index1)=>index1.id !== index.id);
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
    .then((updatedItem) => {
         setArticles(updateArticle(updatedItem));
      });
    // setRefresh(!refresh);
  }
  function handleDelete(){
    fetch(`http://localhost:3000/articles/${index.id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then((deletedItem) => setArticles(postDeletedArticle()));
  }


    return (<div className="article">
         <h2>{index.title}</h2>
        <p>{index.content}</p>
        <div className="upvote">
           <p>{score} upvotes</p>
           <button onClick={upvote}>Upvote</button>
        </div>
        <div className="edit">
          <label><p>Want to correct something? </p></label>
          <input placeholder={'edit'} type="text" value={content} onChange={handleContentChange} />
         < button onClick={(e)=>handleUpdate(e,index)}>Update</button>
        </div>
         
        <button onClick={handleDelete}>Delete</button> 
      </div>)
}
export default Article;