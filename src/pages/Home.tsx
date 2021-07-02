import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import { useHistory } from "react-router-dom";

import "../styles/auth.scss";
import { Button } from "../components/Button";

export function Home() {
  const history = useHistory();

  function navigateToNewRoom() {
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
          <button className="create-room" onClick={navigateToNewRoom}>
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
