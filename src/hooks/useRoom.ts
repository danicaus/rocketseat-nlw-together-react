import { useEffect, useState } from "react";

import { database, ref, onValue } from '../services/firebase';
import { useAuth } from "./useAuth";


type FirebaseQuestions = Record<string, {
  author: {
    avatar: string,
    name: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean,
  likes: Record<string, {
    authorId: string,
  }>
}>

type QuestionType = {
  id: string,
  author: {
    avatar: string,
    name: string,
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean,
  likeCount: number,
  likeId: string | undefined,
} 

export function useRoom(roomId: string | undefined) {
  const { user } = useAuth();
  const [ questions, setQuestions ] = useState<QuestionType[]>([]);
  const [ roomTitle, setRoomTitle ] = useState('');

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`);

    //listener que vai atualizar as perguntas a cada vez que a lista alterar no Firebase
    const unsubscribe = onValue(roomRef, room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value]) => {
        console.log(Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id))

        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      })

      setRoomTitle(databaseRoom.title);
      setQuestions(Array.from(parsedQuestions));
    })

    return () => {
      unsubscribe()
    }
  }, [roomId, user?.id])

  return {
    questions,
    roomTitle
  }
}