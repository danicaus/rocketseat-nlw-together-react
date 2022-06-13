import { useParams } from 'react-router-dom';

// import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { database, ref, remove, update, get } from '../../services/firebase';


import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import '../Room/style.scss';
import { useNavigate } from 'react-router-dom';

type RoomParams = {
  id: string
}

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useNavigate();
  
  const { id } = useParams<RoomParams>();
  const { questions, roomTitle } = useRoom(id);

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await remove(ref(database, `rooms/${id}/questions/${questionId}`))
    }
  }

  async function handleEndRoom() {
    if(window.confirm('Tem certeza que deseja encerrar essa sala?')) {
      await update(ref(database, `rooms/${id}`), {
        endedAt: new Date(),
      })
      history('/')
    }
  }
  
  return (
    <div className="room" >
      <header className="room-header__wrapper">
        <div className="room-header">
          <img src={logoImg} alt="LetMeAsk" />
          <div className="room-header__options">
            <RoomCode code={id || ''} />
            <Button
              onClick={() => handleEndRoom()}
              isOutlined
            >
              Encerrar sala
            </Button>
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
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>

      </main>

    </div>
  )
} 
