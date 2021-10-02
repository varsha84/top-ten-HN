import React from 'react'
import { context } from './themeContext'

function HackerNews(props){
    //const contextValue = React.useContext(context);
    return (
        <div>
            <ul>{
                 props.topNews.map((item, index)=>{
                    return (<li key ={index}>{item.title} </li>)
                 }) 
                }
                
            </ul>
        </div>
    )

}

export default HackerNews