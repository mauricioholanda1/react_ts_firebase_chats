import { FormEvent, useState } from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import { useHistory } from "react-router-dom";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();

  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleCreateRoomWithInvite(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      alert("Please enter a room code");
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert(`Room code ${roomCode} does not exist`);
      return;
    }

    if (roomRef.val().endedAt) {
      alert(`Room code ${roomCode} has ended`);
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="illustrationImg" />
        <strong>Crie salas de Q&amp;a ao vivo</strong>
        <p>Tire suas duvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="logo google" />
            Crie sua sala com Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleCreateRoomWithInvite}>
            <input
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
