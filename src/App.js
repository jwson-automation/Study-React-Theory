import logo from './logo.svg';
import './App.css';

//Style
const div_root = {'margin':'auto','width':'300px'}
const div1 = {'width':'120px', 'height':'150px', 'float':'left','bacground-color':'white', 'text-align':'center', 'border-style':'solid', 'border-width':'4px', 'border-color':'green', 'vertical-align':'middle'};
const RedboxStyle ={'width':'120px', 'height':'150px','float':'right','justifyContent': 'center','alignItems': 'center','border-style':'solid','border-width':'4px','border-color':'red', 'display':'inline'};
const Middle_align = {}

//source
const topics = [
  {id:1, title:'html' , body:'html is...'},
  {id:2, title:'css' , body:'css is...'},
  {id:3, title:'js' , body:'js is...'}
]

//Style Function
function RedBox(props){
  return <h3 style= {RedboxStyle} >{props.title}</h3> }

 function Divone(props){
   return <h3 style= {div1}>{props.title}</h3> }

// 3comfonent
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>}




 // 1comfonent
function Header(props){
  return <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>
 </header>}

 // 2comfonent
function Nav(props){
  
  const lis = []
  for(let i=0; i<props.topics.length; i++)
  {let t = props.topics[i];
    lis.push(<li key={t.id}><a href="{'/read/'+t.id}" id={t.id}>{t.title}</a></li>)
  }
  return <nav onClick={event=>{
    event.preventDefault();
    props.onChangeMode(event.target.id);
  }}>
            <ol>
              {lis}
            </ol>
  </nav>}

// Main
function App() {
  let content =null;
  const mode = 'READ';
  if (mode==='WELCOME'){
    content = <Article title="Welome" body="Hello,React"></Article>
  }else if(mode==='READ'){
    content = <Article title="Read" body="Hello,Read"></Article>
  }
  return (
    <div>
      <Header title="REACT" onChangeMode={()=>{
        alert('Header');
      }}></Header>
       <Nav topics={topics} onChangeMode={(id)=>{
        alert(id);}} ></Nav>

       {content}
       <Article body="Yorosiku"></Article>
       <RedBox title="jwson"></RedBox>
       <RedBox title="semi"></RedBox>
       <Divone title='jwson, hello oh This is impressive'></Divone>

    </div>
  );
}

export default App;
