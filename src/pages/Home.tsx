import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import { useHistory } from "react-router-dom";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../App";

export function Home() {
  const history = useHistory();

  const { user, signInWithGoogle } = useContext(AuthContext);

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
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
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
