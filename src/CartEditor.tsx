import React, { useState, useEffect } from 'react';
import { CartItem, CartEditorProps, Comment } from './types';
import CommentSidebar from './CommentSidebar';
import './CartEditor.css';

const createEmptyItem = (): CartItem => ({
  id: Date.now().toString(),
  title: '',
  description: '',
  complete: false,
  assignedTo: '',
  dueDate: '',
  comments: []
});

const CartEditor: React.FC<CartEditorProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  title = 'Edit Item',
  showComments = false,
  onAddComment,
  currentUser = 'Current User'
}) => {
  const [data, setData] = useState<CartItem>(createEmptyItem);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes or item changes
  useEffect(() => {
    setData(item || createEmptyItem());
    setErrors({});
  }, [item, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!data.title.trim()) newErrors.title = 'Title is required';
    if (!data.description.trim()) newErrors.description = 'Description is required';
    if (!data.assignedTo.trim()) newErrors.assignedTo = 'Assigned to is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API
    onSave(data);
    onClose();
    setIsSubmitting(false);
  };

  const updateField = (field: keyof CartItem, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleAddComment = (content: string) => {
    if (!onAddComment || !data.id) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      author: currentUser,
      content,
      timestamp: new Date().toISOString()
    };
    
    setData(prev => ({
      ...prev,
      comments: [...(prev.comments || []), newComment]
    }));
    
    onAddComment(data.id, content);
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`cart-modal ${showComments ? 'with-comments' : ''}`}>
        
        {/* Header */}
        <header className="cart-header">
          <h2>{title}</h2>
          <button onClick={onClose} aria-label="Close">×</button>
        </header>

        <div className="cart-main">
          {/* Form */}
          <form onSubmit={handleSubmit} className="cart-form">
            <div className="cart-content">
              
              {/* Title */}
              <div className="field">
                <label>Title *</label>
                <input
                  value={data.title}
                  onChange={e => updateField('title', e.target.value)}
                  placeholder="Enter title"
                  className={errors.title ? 'error' : ''}
                />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>

              {/* Description */}
              <div className="field">
                <label>Description *</label>
                <textarea
                  value={data.description}
                  onChange={e => updateField('description', e.target.value)}
                  placeholder="Enter description"
                  rows={3}
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && <span className="error-text">{errors.description}</span>}
              </div>

              {/* Row of fields */}
              <div className="field-row">
                <div className="field">
                  <label>Assigned To *</label>
                  <input
                    value={data.assignedTo}
                    onChange={e => updateField('assignedTo', e.target.value)}
                    placeholder="Enter assignee"
                    className={errors.assignedTo ? 'error' : ''}
                  />
                  {errors.assignedTo && <span className="error-text">{errors.assignedTo}</span>}
                </div>

                <div className="field">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={data.dueDate}
                    onChange={e => updateField('dueDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field checkbox-field">
                  <label>
                    <input
                      type="checkbox"
                      checked={data.complete}
                      onChange={e => updateField('complete', e.target.checked)}
                    />
                    Mark as Complete
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="cart-footer">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn-primary">
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </footer>
          </form>

          {/* Comments */}
          {showComments && (
            <CommentSidebar
              comments={data.comments || []}
              onAddComment={handleAddComment}
              currentUser={currentUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartEditor;
