import React from 'react'

function HackerNews(props){
  return (
    <div>
      <ul>{
        props.topNews.map((item, index)=>{ 
          return (
            <li key ={index}>
              <div className="news">
                <div className="score">
                  {item.score}
                </div>
                <div className="content">
                  <div className="news-title">
                    <a className="title-link" href={item.url}>{item.title}</a>
                  </div>
                
                  <div className="info">  
                    <div>author: {item.author}</div>
                    <div>karma: {item.authorKarma} </div>
                    <div>timestamp: {item.time}</div>
                  </div>

                </div> 
              </div>
            </li>
          )
        }) 
      }      
      </ul>
    </div>
  )
}

export default HackerNews