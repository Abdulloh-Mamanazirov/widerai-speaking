import { Avatar, Button, Dropdown, Modal, Typography } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechSynthesis } from "react-speech-kit";
import { toast } from "react-toastify";
import { useVoice, useTimer } from "../Hooks";

const Home = () => {
  const navigate = useNavigate();
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
            navigate("/signin");
          }}
        >
          Log out
        </p>
      ),
    },
  ];

  let answer = useRef();
  let [me, setMe] = useState();
  let [open, setOpen] = useState(false);
  let [countdown, setCountdown] = useState(3);
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

  useEffect(() => {
    // const token = localStorage.getItem("widerai-token");
    // if (!token) return navigate("/signup");

    if (part === 2) {
      start();
    }

    async function getMe() {
      let { data } = await axios.get("/users/getSelfInfo");
      setMe(data);
    }
    getMe();
  }, [part]);

  async function startTest() {
    setStartExam(true);
    let { data } = await axios.get("/mockexam/sartMockExam", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("widerai-token")}`,
      },
    });
    await speak({ text: data?.message });
    setCurrentQuestion(data?.message);
    questions.push(data);
  }

  useEffect(() => {
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000);
    if (countdown === 0) {
      setCountdown("Start!");
      setTimeout(() => startTest(), 1000);
    }
  }, [countdown]);

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
      clearText();
      if (data?.defaultMessage) {
        await speak({ text: data?.defaultMessage });
      }
      speak({ text: data?.mock_questions });
      setCurrentQuestion(data?.mock_questions);
      setPart(data?.mock_part);
      setAnswered(false);
      questions.push(data?.mock_questions);
    }
  }

  async function submitAnswer() {
    let answer = editedAnswer ? editedAnswer : text.join(" ");
    let { data, status } = await axios.post("/mockexam/acceptUserAnswer", {
      text: answer,
    });
    if (status === 201) {
      setAnswered(true);
      clearText();
      return toast(data?.message, { type: "success" });
    }
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
            <p className="[line-height:16px] font-thin">We always <br /> dominate!</p>
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
          <div className="listening-animation">
            <img
              onClick={listen}
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
        <div className="font-medium">
          <div className="flex gap-3">
            <p className="font-semibold">Name:</p>
            <p>
              {me?.user_firstname} {me?.user_lastname}
            </p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold">Email:</p>
            <p>{me?.user_email}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold">Country:</p>
            <p>{me?.user_country}</p>
          </div>
          <div className="flex gap-3">
            <p className="font-semibold">Registered date:</p>
            <p>{me?.user_created_at}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
