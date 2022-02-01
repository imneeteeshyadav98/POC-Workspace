import logo from './logo.svg';
import './App.css';

function Button() {
  return (
    <div className="App">
        <button onclick="http://13.88.57.107:5000/healthcheckup">Custom Button 1</button>
        <button onclick="http://13.87.204.208:5000/hello">Custom Button 2</button>
    </div>
  );
}

export default Button;
