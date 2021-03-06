// ActionProvider starter code
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleLinuxQuiz = () => {
    const message = this.createChatBotMessage(
      "Sure! Here's your Linux QUIZ !",
      {
        widget: "linux"
      }
    );
    this.setChatbotMessage(message);
  };
  handleDockerQuiz = () => {
    const message = this.createChatBotMessage(
      "Sure! Here's your Docker QUIZ !",
      {
        widget: "docker"
      }
    );
    this.setChatbotMessage(message);
  };
  handleSqlQuiz = () => {
    const message = this.createChatBotMessage("Sure! Here's your SQL QUIZ !", {
      widget: "sql"
    });
    this.setChatbotMessage(message);
  };
  handleContinue = () => {
    const message = this.createChatBotMessage(
      "Which quiz you want to try again?",
      {
        widget: "options"
      }
    );
    this.setChatbotMessage(message);
  };
  handleUnknown = () => {
    const message = this.createChatBotMessage(
      "Please type continue to try again"
    );
    this.setChatbotMessage(message);
  };
  handleGreeting = () => {
    const message = this.createChatBotMessage(
      "Thanks for trying QuizBot! We hope you had a great learning experience"
    );
    this.setChatbotMessage(message);
  };
  messageHandler = () => {
    const message = this.createChatBotMessage(
      "Hello,what do you want to learn",
      {
        widget: "options"
      }
    );
    this.setChatbotMessage(message);
  };
  setChatbotMessage = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages]
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages]
      }));
    }
  };
}
export default ActionProvider;
