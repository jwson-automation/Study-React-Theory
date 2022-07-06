import './App.css';
import {useState} from 'react';

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
  for(let i=0; i<props.topics.length; i++)
  {let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a href="{'/read/'+t.id}" onClick={event=>{
      event.preventDefault();
      // props.onChangeMode(Number(event.target.id));
      // console.log(event.target.id);
      // props.onChangeMode(Number(props.id));
      // console.log(props.id); 왜 안될까
      props.onChangeMode(Number(t.id));
      console.log(t.id);
      }} id={t.id}>{t.title}</a></li>)
  }
  return <nav>
            <ol>
              {lis}
            </ol>
  </nav>}
 



// Main-----------------------------------------------
function App() {
  const topics = [
    {id:1, title:'html' , body:'html is...'},
    {id:2, title:'css' , body:'css is...'},
    {id:3, title:'js' , body:'js is...'}
  ]

  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setMode = _mode[1]
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  let content =null;

  if (mode==='WELCOME'){
    content = <Article title="Welcome" body="Hello,React"></Article>
  }else if(mode==='READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      // console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
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

    </div>
  );}

  
export default App;
