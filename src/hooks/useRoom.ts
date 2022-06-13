import { useEffect, useState } from "react";

import { database, ref, onValue } from '../services/firebase';


type FirebaseQuestions = Record<string, {
  author: {
    avatar: string,
    name: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
}>

type QuestionType = {
  id: string;
  author: {
    avatar: string,
    name: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
} 

export function useRoom(roomId: string | undefined) {
  const [ questions, setQuestions ] = useState<QuestionType[]>([]);
  const [ roomTitle, setRoomTitle ] = useState('');

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomId}`);

    //listener que vai atualizar as perguntas a cada vez que a lista alterar no Firebase
    onValue(roomRef, room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      })

      setRoomTitle(databaseRoom.title);
      setQuestions(Array.from(parsedQuestions));
    })
  }, [roomId])

  return {
    questions,
    roomTitle
  }
}