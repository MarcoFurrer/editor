import React, { useState, useEffect } from 'react';
import { CartItem, CartEditorProps, ValidationErrors } from './types';
import CommentSidebar from './CommentSidebar';
import { Comment } from './commentTypes';
import './CartEditor.css';

const CartEditor: React.FC<CartEditorProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  title = 'Edit Item',
  showComments = false,
  onAddComment,
  currentUser = 'Current User',
  commentsLoading = false
}) => {
  const [formData, setFormData] = useState<CartItem>({
    id: '',
    title: '',
    description: '',
    complete: false,
    assignedTo: '',
    priority: 'medium',
    dueDate: '',
    tags: [],
    comments: []
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        id: Date.now().toString(),
        title: '',
        description: '',
        complete: false,
        assignedTo: '',
        priority: 'medium',
        dueDate: '',
        tags: [],
        comments: []
      });
    }
    setErrors({});
  }, [item, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assigned to is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CartItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    handleInputChange('tags', tags);
  };

  const handleAddComment = (content: string) => {
    if (onAddComment && formData.id) {
      onAddComment(formData.id, content);
      
      // Optimistically add the comment to local state
      const newComment: Comment = {
        id: Date.now().toString(),
        author: currentUser,
        content,
        timestamp: new Date().toISOString()
      };
      
      setFormData(prev => ({
        ...prev,
        comments: [...(prev.comments || []), newComment]
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-editor-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`cart-editor-modal ${showComments ? 'with-comments' : ''}`}>
        <div className="cart-editor-header">
          <h2 className="cart-editor-title">{title}</h2>
          <button 
            className="cart-editor-close" 
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="cart-editor-main">
          <form onSubmit={handleSubmit} className="cart-editor-form">
            <div className="cart-editor-content">
            {/* Title Field */}
            <div className="cart-editor-field">
              <label htmlFor="title" className="cart-editor-label">
                Title <span className="required">*</span>
              </label>
              <input
                id="title"
                type="text"
                className={`cart-editor-input ${errors.title ? 'error' : ''}`}
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter item title"
              />
              {errors.title && <span className="cart-editor-error">{errors.title}</span>}
            </div>

            {/* Description Field */}
            <div className="cart-editor-field">
              <label htmlFor="description" className="cart-editor-label">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="description"
                className={`cart-editor-textarea ${errors.description ? 'error' : ''}`}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter item description"
                rows={4}
              />
              {errors.description && <span className="cart-editor-error">{errors.description}</span>}
            </div>

            {/* Two Column Layout */}
            <div className="cart-editor-row">
              {/* Assigned To Field */}
              <div className="cart-editor-field">
                <label htmlFor="assignedTo" className="cart-editor-label">
                  Assigned To <span className="required">*</span>
                </label>
                <input
                  id="assignedTo"
                  type="text"
                  className={`cart-editor-input ${errors.assignedTo ? 'error' : ''}`}
                  value={formData.assignedTo}
                  onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                  placeholder="Enter assignee name"
                />
                {errors.assignedTo && <span className="cart-editor-error">{errors.assignedTo}</span>}
              </div>

              {/* Priority Field */}
              <div className="cart-editor-field">
                <label htmlFor="priority" className="cart-editor-label">Priority</label>
                <select
                  id="priority"
                  className="cart-editor-select"
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value as 'low' | 'medium' | 'high')}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="cart-editor-row">
              {/* Due Date Field */}
              <div className="cart-editor-field">
                <label htmlFor="dueDate" className="cart-editor-label">Due Date</label>
                <input
                  id="dueDate"
                  type="date"
                  className="cart-editor-input"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                />
              </div>

              {/* Complete Checkbox */}
              <div className="cart-editor-field">
                <label className="cart-editor-checkbox-container">
                  <input
                    type="checkbox"
                    className="cart-editor-checkbox"
                    checked={formData.complete}
                    onChange={(e) => handleInputChange('complete', e.target.checked)}
                  />
                  <span className="cart-editor-checkmark"></span>
                  Mark as Complete
                </label>
              </div>
            </div>

            {/* Tags Field */}
            <div className="cart-editor-field">
              <label htmlFor="tags" className="cart-editor-label">Tags</label>
              <input
                id="tags"
                type="text"
                className="cart-editor-input"
                value={formData.tags?.join(', ') || ''}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="Enter tags separated by commas"
              />
              <small className="cart-editor-hint">Separate multiple tags with commas</small>
            </div>
          </div>

          {/* Footer */}
          <div className="cart-editor-footer">
            <button
              type="button"
              className="cart-editor-button cart-editor-button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cart-editor-button cart-editor-button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Item'}
            </button>
          </div>
        </form>

        {/* Comment Sidebar */}
        {showComments && (
          <CommentSidebar
            comments={formData.comments || []}
            onAddComment={handleAddComment}
            isLoading={commentsLoading}
            currentUser={currentUser}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default CartEditor;
