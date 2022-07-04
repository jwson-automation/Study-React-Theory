import logo from './logo.svg';
import './App.css';

// 1comfonent
function Header(props){
  // console.log('props',props,props.title);
  return <header>
  <h1><a href="/">{props.title}</a></h1>
 </header>}

// 3comfonent
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>}

// 2comfonent
function Nav(props){
  
const lis = []
for(let i=0; i<props.topics.length; i++)
{let t = props.topics[i];
  lis.push(<li key={t.id}><a href="{'/read/'+t.id}">{t.title}</a></li>)
}
return <nav>
          <ol>
            {lis}
          </ol>
</nav>}

// Main
function App() {
  const topics = [
    {id:1, title:'html' , body:'html is...'},
    {id:2, title:'css' , body:'css is...'},
    {id:3, title:'js' , body:'js is...'}
  ]
  return (
    <div>
      <Header title="REACT"></Header>
       <Nav topics={topics} ></Nav>
       <Article title="Welome" body="Hello,React"></Article>
       <Article body="Yorosiku"></Article>
    </div>
  );
}

export default App;