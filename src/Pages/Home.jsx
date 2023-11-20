import axios from "axios";
import { toast } from "react-toastify";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useVoice, useTimer } from "../Hooks";

const Home = () => {
  const navigate = useNavigate();

  let answer = useRef();
  let [countdown, setCountdown] = useState(3);
  let [startExam, setStartExam] = useState(false);
  let [currentQuestion, setCurrentQuestion] = useState("");
  let [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  let [part, setPart] = useState(1);
  let [questions, setQuestions] = useState([]);
  let [answered, setAnswered] = useState(false);
  let [editedAnswer, setEditedAnswer] = useState("");
  let [answers, setAnswers] = useState([]);
  let [minutes, seconds, start] = useTimer(60);
  let { text, listen, clearText, isListening, voiceSupported } = useVoice();
  const { speak } = useSpeechSynthesis();

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

  useEffect(() => {
    const token = sessionStorage.getItem("widerai-token");
    if (!token) return navigate("/signup");

    if (part === 2) {
      setTimeout(() => {
        setTimeout(() => {
          start();
        }, 3000);
      }, 4000);
    }
  }, [part]);

  useEffect(() => {
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000);
    if (countdown === 0) {
      setCountdown("Start!");
      setTimeout(() => startTest(), 1000);
    }
  }, [countdown]);

  async function startTest() {
    setStartExam(true);
    let { data, status } = await axios.get("/mock-questions", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("widerai-token")}`,
      },
    }).catch((err)=>{if (err.response.status === 401) {
      sessionStorage.removeItem("widerai-token")
      window.location.replace('/')
    }});
    if (status === 200) {
      setQuestions(data?.[0]);
      setCurrentQuestion(data?.[0]?.questionPart1?.question1);
      await speak({ text: data?.[0]?.questionPart1?.question1 });
    }
  }

  if (!startExam) {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <p className="text-white text-4xl font-medium">{countdown}</p>
      </div>
    );
  }

  async function handleEditAnswer(text) {
    setEditedAnswer(text);
  }

  async function getNextQuestion() {
    clearText();
    setCurrentQuestionNumber(currentQuestionNumber+1)
    if(currentQuestionNumber !== 4){
      switch (currentQuestionNumber) {
        case  1:
          await speak({ text: questions?.questionPart1?.question1 });
          setCurrentQuestion(questions?.questionPart1?.question1);
          break;
        case  2:
          await speak({ text: questions?.questionPart1?.question2 });
          setCurrentQuestion(questions?.questionPart1?.question2);
          break;
        case  3:
          await speak({ text: questions?.questionPart1?.question3 });
          setCurrentQuestion(questions?.questionPart1?.question3);
          break;
        case  4:
          await speak({ text: questions?.questionPart1?.question4 });
          setCurrentQuestion(questions?.questionPart1?.question4);
          break;
  
        default:
          break;
      }
    }
    if(currentQuestionNumber === 5){
      setPart(2)
      await speak({ text: questions?.questionPart2?.mainQuestion });
      setCurrentQuestion(questions?.questionPart2?.mainQuestion);
    }
    if (currentQuestionNumber > 5) {
      setPart(3)
      switch (currentQuestionNumber) {
        case 6:
          await speak({ text: questions?.questionPart3?.question1 });
          setCurrentQuestion(questions?.questionPart3?.question1);
          break;
        case 7:
          await speak({ text: questions?.questionPart3?.question2 });
          setCurrentQuestion(questions?.questionPart3?.question2);
          break;
        case 8:
          await speak({ text: questions?.questionPart3?.question3 });
          setCurrentQuestion(questions?.questionPart3?.question3);
          break;
        case 9:
          await speak({ text: questions?.questionPart3?.question4 });
          setCurrentQuestion(questions?.questionPart3?.question4);
          break;

        default:
          break;
      }
    }
  }

  async function submitAnswer() {
    let answer = editedAnswer ? editedAnswer : text.join(" ");
    answers.push(answer)
    setAnswered(false);
    return getNextQuestion()
  }

  return (
    <div className="test h-screen relative flex items-center justify-center gap-32 max-[700px]:flex-col max-[700px]:gap-20">
      <div className="absolute inset-0 backdrop-blur-sm" />
      {/* <nav className="homeNav fixed top-0 z-20 flex items-center justify-end text-white p-5 max-[700px]:justify-start">
        <Dropdown menu={{ items }}>
          <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
            {me ? (
              me?.user_firstname?.split("")[0] + me?.user_lastname?.split("")[0]
            ).toUpperCase() : ""}
          </Avatar>
        </Dropdown>
      </nav> */}
      <nav className="absolute top-0 bg-gradient-to-r from-[#aaaaaa50] w-full h-20">
        <div className="flex items-center gap-5 ml-10 mt-1 text-white">
          <img
            width={70}
            className="rounded-3xl"
            src="logo-min.png"
            alt="Logo"
          />
          <div>
            <p className="text-xl font-semibold">WIDERAI</p>
            <p className="[line-height:16px] font-thin">
              We always <br /> dominate!
            </p>
          </div>
        </div>
      </nav>
      <div className="text-white bg-slate-700 bg-opacity-50 backdrop-blur-lg rounded-lg p-3">
        <p className="text-3xl font-bold text-white mb-5">Part {part}</p>
        {currentQuestion ? (
          <p className="p-3 mb-5 max-w-prose w-96 rounded-md text-white bg-gray-400 bg-opacity-40">
            {currentQuestion}
          </p>
        ) : (
          ""
        )}
        <Button
          disabled={!answered}
          onClick={getNextQuestion}
          style={{ color: "white" }}
          type="primary"
          className=" bg-blue-500"
        >
          Next Question
        </Button>
        <Button type="link" onClick={() => speak({ text: currentQuestion })}>
          Read again
        </Button>
        <div>
          {part === 2 ? (
            <div className="flex items-center gap-3">
              <p>Preparation time:</p>
              <span>
                {minutes}:{seconds < 10 ? "0" : ""}
                {seconds}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="z-10">
        <div className="flex items-end mb-5">
          <div onClick={listen} role={"button"} className="listening-animation">
            <img
              hidden={isListening}
              src="mic.png"
              width={120}
              className="mic"
            />
            <div hidden={!isListening} className="lis-col lis-col-1" />
            <div hidden={!isListening} className="lis-col lis-col-2" />
            <div hidden={!isListening} className="lis-col lis-col-3" />
            <div hidden={!isListening} className="lis-col lis-col-4" />
            <div hidden={!isListening} className="lis-col lis-col-5" />
          </div>
          {/* <Button onClick={()=>{ answer.current.textContent = ''; return clearText()}} type="primary" danger>
            Clear text
          </Button> */}
        </div>
        <div>
          {text.length > 0 ? (
            <div>
              <Typography.Paragraph
                ref={answer}
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
                disabled={answered}
                onClick={submitAnswer}
                style={{ color: "white" }}
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
