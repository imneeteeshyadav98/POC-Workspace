import logo from './logo.svg';
import './App.css';

function Button() {
  return (
    <div className="App">
        <a href="http://52.160.88.32:5000/api/v2/microservice1/button/button1">Button 1</a><br/>
        <a href="http://52.160.88.32:5000/api/v2/microservice1/button/button2">Button 2</a><br/>
        <a href="http://13.88.28.111:5000/api/v2/microservice2/button/button3">Button 3</a><br/>
        <a href="http://13.88.28.111:5000/api/v2/microservice2/button/button4">Button 4</a><br/>
        <a href="http://13.88.28.111:5000/api/v2/microservice2/button/button5">Button 5</a><br/>
        <a href="http://13.88.28.111:5000/api/v2/microservice2/button/button6">Button 6</a>

    </div>
  );
}

export default Button;
