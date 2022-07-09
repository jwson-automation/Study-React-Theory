import './App.css';
import {useState} from 'react';

// ---------------------------------------------------
function Example_button(){
  const [count, setCount] = useState(0);

  return (
    <div>
      <p> You clicked {count} times </p>
      <button onClick={()=> setCount(count+1)}>Click me</button>
    </div>
  );
}



// ---------------------------------------------------
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>}
// ---------------------------------------------------
function Header(props){
  return <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>
 </header>}
// ---------------------------------------------------
function Nav(props){
    const lis = [] 
// ---------------------------------------------------반복문을 사용해서 topics배열을 lis에 넣어줌
      for(let i=0; i<props.topics.length; i++)
         {let t = props.topics[i];
          lis.push(
          <li key={t.id}>
          <a  href="{'/read/'+t.id}" 
              onClick={event=>{event.preventDefault();
                                props.onChangeMode(Number(t.id)); }} 
          // props.onChangeMode(Number(event.target.id)); 이걸로도 변경 가능

          id={t.id}>{t.title}</a>
          </li>)}
  return <nav>
            <ol>
              {lis}
            </ol>
  </nav>}

  // ---------------------------------------------------
function Create(props){
  return <article> 
  <h2>Create</h2>
  <form onSubmit={event=>{
    event.preventDefault();
    const body = event.target.body.value;
    const title = event.target.title.value;
    
    props.onCreate(title, body);
  }}>
    <p><input type ="text" name = "title" placeholder="title"></input></p>
    <p><textarea name ="body" placeholder ="body"></textarea></p>
    <p><input type ="submit" value ="create"></input></p>
  </form>
  </article>
}

// Main-----------------------------------------------
function App() {
  const [topics, setTopics] = useState([
    {id:1, title:'html' , body:'html is...'},
    {id:2, title:'css' , body:'css is...'},
    {id:3, title:'js' , body:'js is...'}
  ]);
  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setMode = _mode[1]
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  let content =null;
  let contextControl = null;
// ---------------------------------------------------
function Update(props) {
  const [title, setTitle] = useState(props.title)
  const [body, setBody] = useState(props.body)
return <article> 
<h2>Update</h2>
<form onSubmit={event=>{
  event.preventDefault();
  const title = event.target.title.value;
  const body = event.target.body.value;
  props.onUpdate(title, body);
}}>
  <p><input type ="text" name = "title" placeholder="title" value ={title} 
  onChange={event=>{
    setTitle(event.target.value);
    }}></input></p>

  <p><input name ="body" placeholder ="body" value = {body} 
  onChange ={event=>{
    setBody(event.target.value)
    }}></input></p>

  <p><input type ="submit" value ="update"></input></p>
</form>
</article>
}

// ---------------------------------------------------
  if (mode==='WELCOME'){
    content = <Article title="Welcome" body="Hello,React"></Article>
  }//---------------------------------------------------
  else if(mode==='READ'){
    let title, body = null;
            for(let i=0; i<topics.length; i++){
              // console.log(topics[i].id, id);
              if(topics[i].id === id){
                title = topics[i].title;
                body = topics[i].body;}
            }
    content = <Article title={title} body={body}></Article>
    contextControl = <>
       <li><a href ={"/update"+id} onClick={
       event=>{event.preventDefault();
       setMode('UPDATE');
       }}>
        Update
       </a></li>
       <li><input type ="button" value="Delete" onClick={()=>
      {const newTopics = [];
       for (let i=0; i<topics.length; i++){
        if(topics[i].id !== id){
          newTopics.push(topics[i]);
        }
       }
       setTopics(newTopics);
      }}></input></li>
        </>
  }//---------------------------------------------------
  else if(mode==='CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = { id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic)
      setTopics(newTopics)
      setId(nextId);
      setNextId(nextId+1);
    }
    }> </Create>
  }else if (mode ==='UPDATE'){
    let title, body = null;
            for(let i=0; i<topics.length; i++){
              // console.log(topics[i].id, id);
              if(topics[i].id === id){
                title = topics[i].title;
                body = topics[i].body;}
            }
  content= <Update title ={title} body={body} onUpdate = {(title, body) =>{
    console.log(title, body);
    const newTopics =[...topics]
    const updatedTopic ={id:id, title:title, body:body}

    for(let i=0; i < newTopics.length; i++)
    if(newTopics[i].id === id){
      newTopics[i] = updatedTopic;
    }
    setTopics(newTopics);
    setMode('READ');


  }    
  }></Update>}

  // ---------------------------------------------------
  return (
    <div>
      <Example_button></Example_button>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
       <Nav topics={topics} onChangeMode={(_id)=>{
       setMode('READ');
       setId(_id);
       }}></Nav>
{/* --------------------------------------------------- */}
       {content}
{/* --------------------------------------------------- */}
        <li><a href ="/create" onClick={event=>{event.preventDefault()
        setMode('CREATE');}}>Create</a>
        {contextControl}</li>
        
    </div>
  );}

  
export default App;
