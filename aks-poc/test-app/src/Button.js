import logo from './logo.svg';
import './App.css';

function Button() {
  return (
    <div className="App">
        <a href="http://104.42.186.71:5000/api/v1/button/button1">Button 1</a><br/>
        <a href="http://104.42.186.71:5000/api/v1/button/button2">Button 2</a><br/>
        <a href="http://13.87.133.187:5000/api/v1/button/button3">Button 3</a><br/>
        <a href="http://13.87.133.187:5000/api/v1/button/button4">Button 4</a>
    </div>
  );
}

export default Button;
