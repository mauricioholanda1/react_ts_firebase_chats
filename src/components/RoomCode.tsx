import copyImg from "../assets/images/copy.svg";
import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function onCopy() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={onCopy}>
      <div>
        <img src={copyImg} alt="Copy room Code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}
