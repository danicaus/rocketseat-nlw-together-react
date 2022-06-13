import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { database, ref, push } from '../../services/firebase'

import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import '../Home/style.scss';

export function NewRoom() {
  const { user } = useAuth();
  const [ newRoom, setNewRoom ] = useState('');
  const history = useNavigate();
  
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if(newRoom.trim() === ''){
      return
    }
    const refRoom = ref(database, 'rooms')

    const firebaseRoomKey = await push(refRoom, {
      title: newRoom,
      author: user?.id
    }).key

    history(`/rooms/${firebaseRoomKey}`)
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
          <h2 className="main-content__create">Crie uma nova sala</h2>
          <form className="main-content__form" onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p className="main-content__enter">
            Quer entrar em uma sala já existente?
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>

  )

}