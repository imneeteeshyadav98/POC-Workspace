import React, { useState } from "react";
import {FaRegCommentDots} from 'react-icons/fa'
import { Chatbot } from "react-chatbot-kit";
import './App.css';
import MessageParser from "./chatbot/MessageParser";
import config from "./chatbot/config";
import ActionProvider from "./chatbot/ActionProvider";
function App() {
  const [ showBot , setShowBot ] = useState( false);
  function handleBot(){
    const botState = !showBot;
    setShowBot(botState);
  }
  return (
      <div>
        <div>
      <nav className="navbar">
        <ul>
          <li><a href='#'>HOME</a></li>
          <li><a href="#">ABOUT US</a></li>
          <li><a href="#">SERVICES</a></li>
          <li><a href="#">DOCTORS</a></li>
          <li><a href="#">BLOG</a></li>
          <li><a href="#">CONTACT US</a></li>
        </ul>
      </nav>
      </div>
          <div className="bodyImage">
            {/* <FaRegCommentDots className='Chat' /> */}
           
            {showBot && (
            <div style={{float:'right' , marginRight:'10px' , bottom:'100px'}}>
            <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
         </div>
            // <Chatbot onClick={handleBot} />
            )}
        <button className="app-chatbot-button" onClick={handleBot}>
          <FaRegCommentDots className="app-chatbot-button-icon" />
        </button>
          </div>
      </div>
  );
}
export default App;


