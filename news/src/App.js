
import './App.css';
import React, { useEffect, useState } from 'react';
import HackerNews from './hackerNews';
import { ContextProvider } from './themeContext';
function App() {
  //const [stories, setStories]= useState([])
  const [topStories, setTopStories] = useState([])
  const [authorStories, setAuthorStories] = useState([])
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  let newTopTenStrories = []

  const buketContent = {topStories:topStories, authorStories:authorStories}

  React.useEffect(()=>{
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then((response)=>response.json())
    .then((data) =>{
      console.log(data);
      const index = getRandomInt(200)
      console.log(index)
      const topNews = data.slice(index,index+10)
      console.log(topNews)
      setTopStories(topNews)
      console.log(topStories)
    })
    .catch((e)=>{
      console.error(e)
    })
  },[])
  
  React.useEffect(()=>{
    console.log(topStories)
    topStories.map(async stroryId => {
      try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${stroryId}.json`);
        const data = await response.json();
        console.log(data);
        //setAuthorStories(data);
        //const auther = data.by;
        let newsItem = {
          "storyId": data.id,
          "title": data.title,
          "url": data.url,
          "timestamp": data.time,
          "scope": data.score,
          "authorId": data.by
        };
        
        newTopTenStrories.push(newsItem);
        console.log(newsItem);
        setAuthorStories(newTopTenStrories);
        console.log(newTopTenStrories);
      } catch (e) {
        console.error(e);
      }
    });
    setAuthorStories(newTopTenStrories); 
  },[topStories])

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
    <ContextProvider value={buketContent}> 
      <div>
      <h1>Top 10 hacker news </h1>
      <HackerNews/>

    </div>
   </ContextProvider>
  );
}

export default App;
