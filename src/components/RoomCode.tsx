import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string,
}

export function RoomCode({code}: RoomCodeProps) {
  function copyRoomCode() {
    navigator.clipboard.writeText(code)
  }

  return (
      <button className="room-code" onClick={copyRoomCode}>
        <div>
          <img src={copyImg} alt="Copiar código da sala" />
        </div>
        <span>Sala #{code}</span>
      </button>
    )
}