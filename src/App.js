import './App.css';
import {useState} from 'react';

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
  for(let i=0; i<props.topics.length; i++)
  {let t = props.topics[i];
    lis.push(
    <li id={t.id} key={t.id}><a href="{'/read/'+t.id}" 
      onClick={event=>{event.preventDefault();
                props.onChangeMode(Number(t.id));
                 // props.onChangeMode(Number(event.target.id));
                }}>{t.title}</a>
                </li>)
  }
  return <nav>
            <ol>
              {lis}
            </ol>
  </nav>
  }
// ---------------------------------------------------
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>}
  // ---------------------------------------------------
  function Update(props){
    return <article>
      <h2>Update</h2>
  <form onSubmit={event=>{
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    props.onCreate(title, body);
  }}></form>
  </article>
}
// ---------------------------------------------------
function Create(props){
  return <article>
  <h2>Create</h2>
  <form onSubmit={event=>{
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    props.onCreate(title, body);
  }}>
    <p><input type ="text" name ="title" placeholder='title'/></p>
    <p><input type ="text" name ="body" placeholder='body' /></p>
    <p><input type="submit" value ="create"></input></p>

  </form>
  </article>
}

// Main-----------------------------------------------
function App() {
  // topics
  const [topics, setTopics] = useState([
    {id:1, title:'html' , body:'html is...'},
    {id:2, title:'css' , body:'css is...'},
    {id:3, title:'js' , body:'js is...'}])
  // use State
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
   
  // content
  let content =null;
  let contextControl =null;


  if (mode==='WELCOME'){//----------------------------------------------------------WELCOME 모드
    content = <Article title="Welcome" body="Hello,React"></Article>
  }else if(mode==='READ'){//----------------------------------------------------------READ 모드
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      // console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
      
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <li><a href ={ "/update" +id} onClick={(event)=>{event.preventDefault();
    setMode('UPDATE')}}>Update</a></li>
  }else if(mode==='CREATE'){ //----------------------------------------------------------CREATE 모드
    content = <Create onCreate={(_title, _body)=>{
        const newTopic = {id:nextId, title:_title, body:_body}
        // topics.push(newTopics)
        // setTopics(topics); 객체, 배열은 이 방법이 아닌 복제해서 넣는 방법을 사용해야 정상 동작함
        const newTopics = [...topics]
        newTopics.push(newTopic);
        setTopics(newTopics);

        
        setMode('READ');        
        
        setId(nextId);
        setNextId(nextId+1);
    }}></Create>
  }else if(mode==='UPDATE'){
    <Update></Update>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
       <Nav topics={topics} onChangeMode={(_id)=>{
       setMode('READ');
       setId(_id);
       }}></Nav>
       {content}
       <ul>
      <li><a href="/create" onClick={event=>{
        event.preventDefault();
        setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
        </ul>
    </div>
  );}

  
export default App;
