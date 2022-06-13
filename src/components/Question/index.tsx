import './style.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
}

export function Question({content, author}: QuestionProps) {
  
  return (
    <div className="question">
      <p className="question-content">{content}</p>
      <footer className="question-info">
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className="likes"></div>
      </footer>
    </div>
  );
}