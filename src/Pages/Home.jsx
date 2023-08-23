import { Avatar, Button, Dropdown, Modal, Typography } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechSynthesis } from "react-speech-kit";
import { toast } from "react-toastify";
import { useVoice, useTimer } from "../Hooks";

const Home = () => {
  const navigate = useNavigate()
  const items = [
    {
      key: "1",
      label: <p onClick={() => setOpen(true)}>View profile</p>,
    },
    {
      key: "2",
      danger: true,
      label: (
        <p
          onClick={() => {
            localStorage.removeItem("widerai-token");
            navigate('/signin')
          }}
        >
          Log out
        </p>
      ),
    },
  ];

  let answer = useRef()
  let [open, setOpen] = useState(false);
  let [startExam, setStartExam] = useState(false);
  let [currentQuestion, setCurrentQuestion] = useState("");
  let [part, setPart] = useState(1);
  let [questions, setQuestions] = useState([]);
  let [answered, setAnswered] = useState(false);
  let [editedAnswer, setEditedAnswer] = useState("");
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

  useEffect(()=>{
    if(part === 2){
      // console.log(remainingSeconds);
      start()
    }
  },[part])

  async function startTest() {
    setStartExam(true);
    let { data } = await axios.get("/mockexam/sartMockExam");
    await speak({ text: data?.message });
    setCurrentQuestion(data?.message);
    questions.push(data);
  }

  if (!startExam) {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <Button onClick={startTest} type="primary" className="bg-blue-500">
          Start the test
        </Button>
      </div>
    );
  }

  async function handleEditAnswer(text) {
    setEditedAnswer(text);
  }

  async function getNextQuestion() {
    let { data, status } = await axios
      .get("/mockexam/getRandQuestion")
      .catch((err) => {
        if (err?.response?.data?.message === "Finished exam") {
          toast("Exam is finished!", { type: "info" });
          setCurrentQuestion(null);
          return;
        }
      });
    if (status === 200) {
      clearText()
      if(data?.defaultMessage) {
        await speak({ text: data?.defaultMessage });
      }
      speak({ text: data?.mock_questions });
      setCurrentQuestion(data?.mock_questions);
      setPart(data?.mock_part)
      setAnswered(false)
      questions.push(data?.mock_questions)
    }
  }

  async function submitAnswer() {
    let answer = editedAnswer ? editedAnswer : text.join(" ");
    let { data, status } = await axios.post("/mockexam/acceptUserAnswer", {
      text: answer,
    });
    if (status === 201) {
      setAnswered(true)
      clearText()
      return toast(data?.message, { type: "success" })
    };
  }

  return (
    <div className="h-screen relative flex items-center justify-center gap-32">
      <nav className="homeNav fixed top-0 z-20 flex items-center justify-end text-white p-5">
        <Dropdown menu={{ items }}>
          <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
            U
          </Avatar>
        </Dropdown>
      </nav>
      <div className="text-white">
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
          {part === 2 ? <div className="flex items-center gap-3">
            <p>Preparation time:</p>
            <span>
              {minutes}:{seconds < 10 ? "0" : ""}
              {seconds}
            </span>
          </div> : <></>}
        </div>
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
      <Modal
        open={open}
        title="Profile"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Close
          </Button>,
        ]}
      >
        <p>Name...</p>
        <p>Email...</p>
        <p>Password...</p>
        <p>Country...</p>
      </Modal>
    </div>
  );
};

export default Home;
