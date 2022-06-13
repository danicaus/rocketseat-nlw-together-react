import { useNavigate } from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import './style.scss';
import { FormEvent, useState } from 'react';
import { database, ref, get } from '../../services/firebase';

export function Home() {
  const history = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [ roomId, setRoomId ] = useState('');
  
  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle();
    }
    history("/rooms/new");
  }

  async function enterRoom(event: FormEvent) {
    event.preventDefault();

    if(roomId.trim() === ''){
      return
    }

    const roomInfo = await get(ref(database, `rooms/${roomId}`));

    if(!roomInfo.exists()) {
      alert('Sala não existe! Tente novamente');
      return
    }

    history(`rooms/${roomId}`);
  }

  return (
    <div className="homepage">
      <aside className="homepage__left-side">
        <img className="homepage__left-side__image" src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong className="homepage__left-side__title">Crie salas de Q&amp;A ao vivo</strong>
        <p className="homepage__left-side__subtitle">Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main className="homepage__right-side">
        <div className="main-content">
          <img className="main-content__image" src={logoImg} alt="LetMeAsk" />
          <button className="main-content__button" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="main-content__enter">ou entre em uma sala</div>
          <form className="main-content__form" onSubmit={enterRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomId(event.target.value)}
              value={roomId}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>

  )

}