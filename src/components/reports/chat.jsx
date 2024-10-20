import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

// Icons
const MicrophoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48">
    <g
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="4">
      <rect
        width="14"
        height="27"
        x="17"
        y="4"
        rx="7"
      />
      <path
        strokeLinecap="round"
        d="M9 23c0 8.284 6.716 15 15 15s15-6.716 15-15M24 38v6"
      />
    </g>
  </svg>
);

const StopIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 16 16">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.5 1.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z"
      clipRule="evenodd"
    />
  </svg>
);

const escuchandoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 50">
    <rect
      x="0"
      y="22"
      width="10"
      height="6"
      fill="#25D366">
      <animate
        attributeName="height"
        values="6;20;6"
        dur="1s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="22;15;22"
        dur="1s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x="15"
      y="18"
      width="10"
      height="14"
      fill="#25D366">
      <animate
        attributeName="height"
        values="14;30;14"
        dur="1.2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="18;10;18"
        dur="1.2s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x="30"
      y="15"
      width="10"
      height="20"
      fill="#25D366">
      <animate
        attributeName="height"
        values="20;40;20"
        dur="0.8s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="15;5;15"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x="45"
      y="18"
      width="10"
      height="14"
      fill="#25D366">
      <animate
        attributeName="height"
        values="14;30;14"
        dur="1.1s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="18;10;18"
        dur="1.1s"
        repeatCount="indefinite"
      />
    </rect>
    <rect
      x="60"
      y="22"
      width="10"
      height="6"
      fill="#25D366">
      <animate
        attributeName="height"
        values="6;20;6"
        dur="0.9s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="22;15;22"
        dur="0.9s"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
);

const Avatar = ({ children, role }) => (
  <div
    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-gray-500 ${
      role === "user" ? "bg-neutral-300" : "bg-neutral-200"
    }`}>
    {children}
  </div>
);

const Button = ({ children, ...props }) => (
  <button
    className="p-2 bg-neutral-700 text-white rounded-full hover:bg-neutral-900 transition-colors duration-600 hover:scale-110 flex items-center justify-center"
    {...props}>
    {children}
  </button>
);

const Card = ({ children }) => (
  <div className="w-full max-w-2xl h-full mx-auto flex flex-col border rounded-lg shadow-lg bg-white">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-4 bg-gray-50 border-b font-semibold text-lg">
    {children}
  </div>
);

const CardContent = ({ children }) => (
  <div className="relative flex-grow pb-0">{children}</div>
);

const CardFooter = ({ children }) => (
  <div className="p-4 border-t bg-gray-50">{children}</div>
);

const Input = (props) => (
  <input
    className="w-full py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 px-4"
    {...props}
  />
);

const ScrollArea = ({ children }) => (
  <div className="absolute inset-0 p-4 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
    {children}
  </div>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <line
      x1="22"
      y1="2"
      x2="11"
      y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default function Chat({ messages, setMessages, setShowChat }) {
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const sendMessage = async (message) => {
    console.log(message);
    try {
      const response = await fetch("http://127.0.0.1:8080/conversation_text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_message: `${message}`,
          messages: `${messages}`,
          model_choice: "groq",
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      return "Lo siento, hubo un error al procesar tu mensaje.";
    }
    // return "Hola!";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", text: input },
      ]);

      const responseText = await sendMessage(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "model", text: responseText },
      ]);

      setInput("");
    }
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  // MAndar por voz

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Tu navegador no soporta la grabación de audio.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setRecording(true);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        sendAudio(audioBlob);
      };
    } catch (error) {
      console.error("Error al acceder al micrófono:", error);
      alert("No se pudo acceder al micrófono.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      console.log("Stopping recording");
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const sendAudio = async (audioBlob) => {
    console.log("Sending audio, blob size:", audioBlob.size);
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");

    try {
      const response = await fetch("http://localhost:8080/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en la transcripción");
      }

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", text: data.text },
      ]);

      const assistantResponse = await sendMessage(data.text);

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "model", text: assistantResponse },
      ]);
    } catch (error) {
      console.error("Error al transcribir el audio:", error);
      alert("Hubo un error al transcribir el audio.");
    }
  };

  const handleBotonEscuchar = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }

    setRecording(!recording);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <CardHeader>
        <div className="flex space-x-1 items-center justify-between w-full">
          <div className="inline-flex items-center">
            <div>
              Habla con tu{" "}
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-sky-600 inline-flex items-center gap-1">
                Asistente de servicios sociales.
                <svg
                  className="text-sky-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="m19 1l-1.26 2.75L15 5l2.74 1.26L19 9l1.25-2.74L23 5l-2.75-1.25M9 4L6.5 9.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5M19 15l-1.26 2.74L15 19l2.74 1.25L19 23l1.25-2.75L23 19l-2.75-1.26"
                  />
                </svg>
              </div>
            </div>
          </div>
          <button
            className="p-2 rounded-full bg-neutral-200"
            onClick={handleCloseChat}>
            <svg
              className="size-3.5"
              viewBox="-0.5 0 25 25"
              fill="none">
              <g
                id="SVGRepo_bgCarrier"
                strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M3 21.32L21 3.32001"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>{" "}
                <path
                  d="M3 3.32001L21 21.32"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 mb-4 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}>
              {msg.role !== "user" && (
                <Avatar role={msg.role}>
                  {msg.role === "user" ? "U" : "🤖"}
                </Avatar>
              )}
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-neutral-700 text-gray-50"
                    : "bg-gray-100 text-gray-900"
                }`}>
                <div className="text-sm">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
              {msg.role === "user" && (
                <Avatar role={msg.role}>
                  {msg.role === "user" ? "U" : "🤖"}
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <div className="p-4 border-t bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-2">
          {!recording ? (
            <input
              className="w-full py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 px-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
            />
          ) : (
            <p className="w-full py-2  px-4">Escuchando ...</p>
          )}
          <button
            onClick={handleBotonEscuchar}
            type="button">
            {!recording ? <MicrophoneIcon /> : <StopIcon />}
          </button>
          <button
            className="p-2 text-black cursor-pointer rounded-full  transition-colors duration-600 hover:scale-110 flex items-center justify-center"
            type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </Card>
  );
}
