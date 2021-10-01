import React from 'react'
import { context } from './themeContext'

function HackerNews(){
    const contextValue = React.useContext(context);
    return (
        <div>
            <ul>{
                 contextValue.authorStories.map((item, index)=>{
                    return (<li key ={index}>{item.title} </li>)
                 }) 
                }
                
                <span></span>
            </ul>
        </div>
    )

}

export default HackerNews