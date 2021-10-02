import './App.css';
import React, {useState} from 'react';
import HackerNews from './hackerNews';
import {
  ContextProvider
} from './themeContext';

function App() {
  //const [stories, setStories]= useState([])
  const [topStories, setTopStories] = useState([])
  /*const [authorStories, setAuthorStories] = useState([]) 
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }*/
  let newTopTenStrories = []

  //const buketContent = {topStories:topStories, authorStories:authorStories}

  React.useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        //const index = getRandomInt(200)
        //console.log(index)
        const topNews = data.slice(0, 10)
        console.log(topNews)
        topNews.map(async stroryId => {
          let newsItem = {}
          try {
            const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${stroryId}.json`);
            const data = await response.json();
            //console.log(data);
            
            newsItem = {
              "storyId": data.id,
              "title": data.title,
              "url": data.url,
              "timestamp": data.time,
              "scope": data.score,
              "authorId": data.by
            };
            newTopTenStrories.push(newsItem);
          } 
          catch (e) {
            console.error(e);
          }
          return newsItem
        });
        console.log(newTopTenStrories);
        setTopStories(newTopTenStrories)

      })

    }, []
  )

/* React.useEffect(()=>{
console.log(topStories)

setAuthorStories(newTopTenStrories); 
},[topStories])
*/
    /* useEffect(()=>{
      authorStories.map((story)=>{
      fetch(`https://hacker-news.firebaseio.com/v0/user/${story.by}.json`)
      .then((response)=>response.json())
      .then((data)=>{
      console.log(data)})
      
      .catch((e)=>{
        console.error(e)
      })
    })
    },[authorStories]) */

  return ( 
    <div>
      <h1> Top 10 hacker news </h1> 
      <HackerNews topNews={newTopTenStrories}/>

    </div>
  );
}

export default App;
