import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import RenderQuiz from "./RenderQuiz";
import "./Quiz.css";
function Quiz(props) {
  const [loading, setLoading] = useState(true);
  const [linux, setLinux] = useState([]);
  const [sql, setSql] = useState([]);
  const [docker, setDocker] = useState([]);
  var API_KEY = process.env.REACT_APP_SECRET_NAME;
  const loadLinux = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://quizapi.io/api/v1/questions?apiKey=" +
          API_KEY +
          "&category=linux&limit=5"
      );
      const data = await response.json();
      setLoading(false);
      setLinux(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    loadLinux();
  }, []);
  const loadDocker = async () => {
    try {
      const response = await fetch(
        "https://quizapi.io/api/v1/questions?apiKey=" +
          API_KEY +
          "&category=docker&limit=5"
      );
      const data = await response.json();
      setDocker(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadDocker();
  }, []);
  const loadSql = async () => {
    try {
      const response = await fetch(
        "https://quizapi.io/api/v1/questions?apiKey=" +
          API_KEY +
          "&category=sql&limit=5"
      );
      const data = await response.json();
      setSql(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadSql();
  }, []);
  if (loading === true)
    return (
      <div>
        <Loading />
      </div>
    );
  if (linux.length === 0 || sql.length === 0 || docker.length === 0) {
    if (props.course === "Linux")
      return <button onClick={loadLinux}>Refresh</button>;
    else if (props.course === "Docker")
      return <button onClick={loadDocker}>Refresh</button>;
    else return <button onClick={loadSql}>Refresh</button>;
  }
  if (loading === false) {
    if (props.course === "Linux") {
      return <RenderQuiz data={linux} />;
    } else if (props.course === "Docker") return <RenderQuiz data={docker} />;
    else return <RenderQuiz data={sql} />;
  }
}
export default Quiz;
