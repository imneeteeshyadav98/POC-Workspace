// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import React from "react";
import BotAvatar from "../Components/BotAvatar/BotAvatar";
import Options from "../Components/Options/Options";
import Quiz from "../Components/Quiz/Quiz";
import UserAvatar from "../Components/UserAvatar/UserAvatar";

const config = {
  botName: "QuizBot",
  initialMessages: [
    createChatBotMessage(`Hi. I’m here to help you explain how I work.`),
    createChatBotMessage("What do you want to learn", {
      withAvatar: false,
      delay: 500,
      widget: "options"
    })
  ],

  customStyles: {
    botMessageBox: {
      backgroundColor: "#28334AFF"
    },
    chatButton: {
      backgroundColor: "#567572ff"
    }
  },
  customComponents: {
    header: () => (
      <div
        style={{
          backgroundColor: "#567572ff",
          padding: "5px",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          display: "flex",
          fontSize: "0.85rem",
          paddingTop: "12.5px",
          paddingBottom: "12.5px",
          paddingRight: "12.5px",
          paddingLeft: "12.5px",
          fontWeight: "700",
          alignItems: "center"
        }}
      >
        Conversation with QuizBot
      </div>
    ),
    botAvatar: (props) => <BotAvatar {...props} />,
    userAvatar: (props) => <UserAvatar {...props} />
  },

  state: {
    linux: [],
    sql: [],
    docker: []
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />
    },
    {
      widgetName: "linux",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        course: "Linux"
      }
    },
    {
      widgetName: "docker",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        course: "Docker"
      }
    },
    {
      widgetName: "sql",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        course: "Sql"
      }
    }
  ]
};

export default config;
