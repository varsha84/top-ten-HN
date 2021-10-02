import React from 'react'

function HackerNews(props){
  return (
    <div>
      <ul>{
        props.topNews.map((item, index)=>{
          return (<li key ={index}>{item.title} | {item.authorKarma}</li>)
        }) 
      }      
      </ul>
    </div>
  )
}

export default HackerNews