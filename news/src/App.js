import './App.css';
import React, {useState, useEffect} from 'react';
import HackerNews from './hackerNews';


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [topIds, setTopIds] = useState([])
  const [topStories, setTopStories] = useState([])
  const [topNews, setTopNews] = useState([])
  
  
  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
    .then((response) => response.json())
    .then((data) => {
      const index = getRandomInt(200)
      const randomIds = data.slice(index, index+10)
      setTopIds(randomIds)
    })
  }, [])

  useEffect(() => {
    Promise.all(
      topIds.map((stroryId) => {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${stroryId}.json`)
        .then((response) => response.json())
        .then((data) => {
          const newsItem = {
            "id": data.id,
            "title": data.title,
            "url": data.url,
            "time": new Date(data.time*1000).toLocaleDateString(),
            "score": data.score,
            "author": data.by,
            "authorKarma" : ""  // this data, we will fetch in next fetch request
            }  
          return newsItem;
        })
      })
    )
    .then((data) => {
      const sortedData = data.sort((a, b)=>b.score-a.score)
      setTopStories(sortedData);
      console.log(sortedData);
    })
  }, [topIds])


  useEffect(()=>{
    Promise.all(
      topStories.map((item) => {
        return fetch(`https://hacker-news.firebaseio.com/v0/user/${item.author}.json`)
        .then((response) => response.json())
        .then((data) => {
          item.authorKarma = data.karma
          return item
        })
      })
    )
    .then((data) => {
      setTopNews(data);
    })
  }, [topStories])


  return ( 
    <div>
      <h3> Top 10 hacker news </h3> 
      <HackerNews topNews={topNews}/>
    </div>
  );
}

export default App;
