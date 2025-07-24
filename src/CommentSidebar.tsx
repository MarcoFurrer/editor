import React, { useState } from 'react';
import { Comment, CommentSidebarProps } from './commentTypes';
import './CommentSidebar.css';

const CommentSidebar: React.FC<CommentSidebarProps> = ({
  comments,
  onAddComment,
  isLoading = false,
  currentUser = 'Current User'
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
      onAddComment(newComment);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="comment-sidebar">
      <div className="comment-sidebar-header">
        <h3 className="comment-sidebar-title">
          Comments ({comments.length})
        </h3>
      </div>

      <div className="comment-sidebar-content">
        {isLoading ? (
          <div className="comment-loading">
            <div className="comment-loading-spinner"></div>
            <span>Loading comments...</span>
          </div>
        ) : comments.length === 0 ? (
          <div className="comment-empty">
            <div className="comment-empty-icon">💬</div>
            <p>No comments yet</p>
            <span>Be the first to add a comment!</span>
          </div>
        ) : (
          <div className="comment-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-avatar">
                  {comment.avatar ? (
                    <img src={comment.avatar} alt={comment.author} />
                  ) : (
                    <div className="comment-avatar-initials">
                      {getInitials(comment.author)}
                    </div>
                  )}
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-timestamp">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <div className="comment-text">{comment.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="comment-sidebar-footer">
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="comment-input-container">
            <div className="comment-current-user">
              <div className="comment-avatar-initials small">
                {getInitials(currentUser)}
              </div>
            </div>
            <textarea
              className="comment-input"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows={2}
              disabled={isSubmitting}
            />
          </div>
          <div className="comment-form-actions">
            <button
              type="button"
              className="comment-button comment-button-secondary"
              onClick={() => setNewComment('')}
              disabled={!newComment.trim() || isSubmitting}
            >
              Clear
            </button>
            <button
              type="submit"
              className="comment-button comment-button-primary"
              disabled={!newComment.trim() || isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Comment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSidebar;
