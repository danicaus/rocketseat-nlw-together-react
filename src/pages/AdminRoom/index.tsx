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

const checkImg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

const answerImg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useNavigate();
  
  const { id } = useParams<RoomParams>();
  const { questions, roomTitle } = useRoom(id);

  async function handleCheckQuestionAsAnswered(questionId: string) {
    const questionRef = await get(ref(database, `rooms/${id}/questions/${questionId}`))
    if(questionRef.val().isAnswered){
      await update(ref(database, `rooms/${id}/questions/${questionId}`), {
        isAnswered: false,
      })
    } else {
      await update(ref(database, `rooms/${id}/questions/${questionId}`), {
        isAnswered: true,
      })
    }
  }

  async function handleHighlightQuestion(questionId: string) {
    const questionRef = await get(ref(database, `rooms/${id}/questions/${questionId}`))
    if(questionRef.val().isHighlighted){
      await update(ref(database, `rooms/${id}/questions/${questionId}`), {
        isHighlighted: false,
      })
    } else {
      await update(ref(database, `rooms/${id}/questions/${questionId}`), {
        isHighlighted: true,
      })
    }
  }

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
                isHighlighted={question.isHighlighted}
                isAnswered={question.isAnswered}
              >
                <button
                  type="button"
                  className={`${question.isAnswered ? 'answered' : ''}`}
                  onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >
                  {checkImg}
                </button>
                {!question.isAnswered && (
                  <button
                    type="button"
                    className={`${question.isHighlighted ? 'highlighted' : ''}`}
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    {answerImg}
                  </button>
                )}
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
