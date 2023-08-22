import { useEffect, useState } from "react";

let speech;
if (window.webkitSpeechRecognition) {
  const SpeechRecognition = webkitSpeechRecognition;
  speech = new SpeechRecognition();
  speech.continuous = true;
} else {
  speech = null;
}

const useVoice = () => {
  let [text, setText] = useState([]);
  let [isListening, setIsListening] = useState(false);
  const listen = () => {
    setIsListening(!isListening);
    if (isListening) {
      speech.stop();
    } else {
      speech.start();
    }
  };
  useEffect(() => {
    if (!speech) {
      return;
    }
    speech.onresult = (event) => {
      text.push(event.results[event.results.length - 1][0].transcript);
      setIsListening(false);
      speech.stop();
    };
  }, []);

  const clearText = () => {
    // setText([])
    text.length = 0
    text = []
  }
  
  return {
    text,
    isListening,
    listen,
    clearText,
    voiceSupported: speech !== null,
  };
};
export default useVoice;
