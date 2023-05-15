import { useState } from "react";

function Comment({ author, text, timestamp, replies = [] }) {
  const [showReplyForm, setShowReplyForm] = useState(true);
  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyText, setReplyText] = useState("");
  const [nestedReplies, setNestedReplies] = useState([]);
  const [score, setScore] = useState(0);

  const sortedReplies = replies.sort((a, b) => b.timestamp - a.timestamp);

  const handleReplySubmit = (event) => {
    event.preventDefault();
    const newReply = {
      author: replyAuthor,
      text: replyText,
      timestamp: new Date(),
      score: 0,
    };

    setNestedReplies((prevNestedReplies) => [...prevNestedReplies, newReply]);
    setShowReplyForm(false);
    setReplyAuthor("");
    setReplyText("");
  };

  return (
    <div className="comment">
      <div className="comment-text">{text}</div>
      <div className="comment-info">
        <div className="comment-author">{author}</div>
        <div className="comment-timestamp">{timestamp?.toLocaleString()}</div>
        <div className="comment-score">
          <button onClick={() => setScore((prevScore) => prevScore + 1)}>
            Upvote
          </button>
          <span>{score}</span>
          <button onClick={() => setScore((prevScore) => prevScore - 1)}>
            Downvote
          </button>
        </div>
      </div>
      <div className="comment-replies">
        {sortedReplies.map((reply) => (
          <Comment key={reply.timestamp} {...reply} />
        ))}
        {nestedReplies.map((nestedReply) => (
          <Comment key={nestedReply.timestamp} {...nestedReply} />
        ))}
        {showReplyForm ? (
          <form className="comment-form" onSubmit={handleReplySubmit}>
            <input
              type="text"
              placeholder="Name"
              value={replyAuthor}
              onChange={(e) => setReplyAuthor(e.target.value)}
            />
            <textarea
              placeholder="Comment"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowReplyForm(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <button onClick={() => setShowReplyForm(true)}>Reply</button>
        )}
      </div>
    </div>
  );
}

export default Comment;
