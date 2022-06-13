import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { database, ref, push } from '../../services/firebase';

import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import './style.scss';

type RoomParams = {
  id: string
}

export function Room() {
  const { user } = useAuth();
  const [ newQuestion, setNewQuestion ] = useState('');
  
  const { id } = useParams<RoomParams>();
  const { questions, roomTitle } = useRoom(id);
  
  async function handleSubmitQuestion(event: FormEvent) {
    event.preventDefault();
    if(newQuestion.trim() === '') return

    if(!user) throw new Error('Você precisa estar logado');

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await push(ref(database, `rooms/${id}/questions`), question);

    setNewQuestion('');
  }

  return (
    <div className="room" >
      <header className="room-header__wrapper">
        <div className="room-header">
          <img src={logoImg} alt="LetMeAsk" />
          <RoomCode code={id || ''} />
        </div>
      </header>

      <main className="room-content">
        <div className="room-title">
          <h1>{roomTitle}</h1>
          {questions.length > 0 && (
            <span>{questions.length} pergunta{questions.length > 1 ? 's' : ''}</span>
          )}
        </div>

        <form className="room-form"
          onSubmit={handleSubmitQuestion}
        >
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="room-form__footer">
            {user
              ? (
                <div className="room-form__footer__user">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              )
              : (
                <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
              )
            }
            <Button type="submit" disabled={!user} >Enviar pergunta</Button>
          </div>
        </form>

        <div className="room-questions">
            {questions.map(question => {
              return (
                <Question
                  key={question.id} 
                  content={question.content} 
                  author={question.author} 
                />
              )
            })}
        </div>

      </main>

    </div>
  )
} 