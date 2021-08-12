import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";

import { useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");

  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trimEnd() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in to send a question");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHigthlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala{title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        <div className="question-list">
          {questions.map((question, index) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}