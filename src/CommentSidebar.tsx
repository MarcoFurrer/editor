import React, { useState } from 'react';
import { Comment } from './types';

interface CommentSidebarProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  currentUser?: string;
}

const CommentSidebar: React.FC<CommentSidebarProps> = ({
  comments,
  onAddComment,
  currentUser = 'Current User'
}) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    onAddComment(newComment);
    setNewComment('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getInitials = (name: string) => 
    name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="comments">
      <header className="comments-header">
        <h3>Comments ({comments.length})</h3>
      </header>

      <div className="comments-content">
        {comments.length === 0 ? (
          <div className="comments-empty">
            <div>💬</div>
            <p>No comments yet</p>
            <span>Be the first to add a comment!</span>
          </div>
        ) : (
          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-avatar">
                  {comment.avatar ? (
                    <img src={comment.avatar} alt={comment.author} />
                  ) : (
                    <div className="avatar-initials">{getInitials(comment.author)}</div>
                  )}
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-time">{formatTime(comment.timestamp)}</span>
                  </div>
                  <div className="comment-text">{comment.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="comments-footer">
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="comment-input-group">
            <div className="avatar-initials small">{getInitials(currentUser)}</div>
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows={2}
            />
          </div>
          <div className="comment-actions">
            <button 
              type="button" 
              onClick={() => setNewComment('')}
              disabled={!newComment.trim()}
              className="btn-secondary"
            >
              Clear
            </button>
            <button 
              type="submit"
              disabled={!newComment.trim()}
              className="btn-primary"
            >
              Add Comment
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default CommentSidebar;
