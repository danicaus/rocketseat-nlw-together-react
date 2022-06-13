import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { database, ref, push } from '../../services/firebase';

import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import '../Room/style.scss';

type RoomParams = {
  id: string
}

export function AdminRoom() {
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
          <div className="room-header__options">
            <RoomCode code={id || ''} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="room-content">
        <div className="room-title">
          <h1>{roomTitle}</h1>
          {questions.length > 0 && (
            <span>{questions.length} pergunta{questions.length > 1 ? 's' : ''}</span>
          )}
        </div>

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
