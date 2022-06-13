import { ReactNode } from 'react';
import './style.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children: ReactNode,
  isHighlighted?: boolean,
  isAnswered?: boolean,
}

export function Question({
  content,
  author,
  children,
  isHighlighted = false,
  isAnswered = false,
}: QuestionProps) {
  
  return (
    <div 
      className={`question
        ${(isHighlighted && !isAnswered) ? 'highlighted' : ''}
        ${isAnswered ? 'answered' : ''}
      `}
    >
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