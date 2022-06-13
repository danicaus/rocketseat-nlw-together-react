import { ReactNode } from 'react';
import './style.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode,
}

export function Question({content, author, children }: QuestionProps) {
  
  return (
    <div className="question">
      <p className="question-content">{content}</p>
      <footer className="question-info">
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className="question-options">
          {children}
        </div>
      </footer>
    </div>
  );
}