import { Button, Typography } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { toast } from "react-toastify";
import { useVoice } from "../Hooks";

const Home = () => {
  let [startExam, setStartExam] = useState(false)
  let [currentQuestion, setCurrentQuestion] = useState('')
  let [questions, setQuestions] = useState([])
  let [editedAnswer, setEditedAnswer] = useState('')
  let { text, listen, clearText, isListening, voiceSupported } = useVoice();
  const { speak } = useSpeechSynthesis()
  
  if (!voiceSupported) {
    return (
      <div className="app">
        <h1>
          Voice recognition is not supported by your browser, please retry with
          a supported browser e.g. Chrome
        </h1>
      </div>
    );
  }

  async function startTest(){
    setStartExam(true)
    let { data } = await axios.get('/mockexam/sartMockExam')
    await speak({text:data?.message});
    setCurrentQuestion(data?.message)
    questions.push(data)
  }

  if(!startExam){
    return (
      <div className="absolute inset-0 grid place-items-center">
      <Button onClick={startTest} type="primary" className="bg-blue-500">
        Start the test
      </Button>
      </div>
    )
  }

  async function handleEditAnswer(text) {
    setEditedAnswer(text)
  }

  async function getNextQuestion() {
    let { data, status } = await axios.get('/mockexam/getRandQuestion')
    if(status === 200){
      speak({ text: data?.mock_questions });
      setCurrentQuestion(data?.mock_questions)
      questions.push(data?.mock_questions);
    }
  }

  async function submitAnswer(){
    let answer = editedAnswer ? editedAnswer : text.join(" ")
    let { data, status } = await axios.post('/mockexam/acceptUserAnswer', {text:answer})
    if(status === 201) return toast(data?.message, {type:"success"});
  }

  return (
    <div className="h-screen flex items-center justify-center gap-32">
      <div>
        {currentQuestion ? <p className="p-3 mb-5 max-w-prose w-96 rounded-md text-white bg-gray-400 bg-opacity-40">{currentQuestion}</p> : ''}
        <Button onClick={getNextQuestion} type="primary" className="bg-blue-500">
          Next Question
        </Button>
      </div>
      <div className="">
        <div className="flex items-end mb-5">
          <div className="listening-animation">
            <span
              onClick={listen}
              hidden={isListening}
              className="fa-solid fa-microphone text-6xl text-white"
            />
            <div hidden={!isListening} className="lis-col lis-col-1" />
            <div hidden={!isListening} className="lis-col lis-col-2" />
            <div hidden={!isListening} className="lis-col lis-col-3" />
            <div hidden={!isListening} className="lis-col lis-col-4" />
            <div hidden={!isListening} className="lis-col lis-col-5" />
          </div>
          <Button onClick={clearText} type="primary" danger>
            Clear text
          </Button>
        </div>
        <div>
          {text.length > 0 ? (
            <div>
              <Typography.Paragraph
                editable={{
                  onChange: (text) => {
                    handleEditAnswer(text);
                  },
                }}
                copyable
                className="p-3 mt-5 max-w-prose w-96 rounded-md text-white bg-gray-400 bg-opacity-40"
              >
                {editedAnswer ? editedAnswer : text.join(" ")}
              </Typography.Paragraph>
              <Button
                onClick={submitAnswer}
                type="primary"
                className="bg-blue-500"
              >
                Submit answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
