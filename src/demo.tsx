import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CartEditor, CartItem } from './index';
import { Comment } from './commentTypes';

const Demo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the new cart editor component including usage examples and API reference.',
      complete: false,
      assignedTo: 'John Doe',
      priority: 'high',
      dueDate: '2025-08-01',
      tags: ['documentation', 'urgent'],
      comments: [
        {
          id: '1',
          author: 'Sarah Wilson',
          content: 'This looks great! I think we should also include some video tutorials.',
          timestamp: '2025-07-24T10:30:00Z'
        },
        {
          id: '2',
          author: 'Mike Johnson',
          content: 'Agreed! Also, let\'s make sure to cover the comment functionality in detail.',
          timestamp: '2025-07-24T11:15:00Z'
        }
      ]
    }
  ]);

  const [currentItem, setCurrentItem] = useState<CartItem | undefined>(items[0]);

  const handleSave = (item: CartItem) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = item;
        return updated;
      }
      return [...prev, item];
    });
    console.log('Saved item:', item);
  };

  const handleAddComment = (itemId: string, content: string) => {
    const newComment = {
      id: Date.now().toString(),
      author: 'You',
      content,
      timestamp: new Date().toISOString()
    };

    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, comments: [...(item.comments || []), newComment] }
        : item
    ));

    console.log('Added comment to item', itemId, ':', content);
  };

  const handleOpenNew = () => {
    setCurrentItem(undefined);
    setIsOpen(true);
  };

  const handleEdit = (item: CartItem) => {
    setCurrentItem(item);
    setIsOpen(true);
  };

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          margin: '0 0 24px 0', 
          color: '#1f2937',
          fontSize: '32px',
          fontWeight: '700'
        }}>
          React Cart Editor Demo
        </h1>
        
        <p style={{ 
          color: '#6b7280', 
          fontSize: '16px',
          lineHeight: '1.6',
          margin: '0 0 32px 0'
        }}>
          A beautiful and elegant cart modal editor component for React applications. 
          Perfect for todo lists, project management, and content editing workflows.
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setIsOpen(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            Open Editor with Comments
          </button>
          
          <button
            onClick={handleOpenNew}
            style={{
              padding: '12px 24px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
          >
            Create New Item
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            style={{
              padding: '12px 24px',
              backgroundColor: showComments ? '#dc2626' : '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = showComments ? '#b91c1c' : '#4b5563'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = showComments ? '#dc2626' : '#6b7280'}
          >
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            Current Items
          </h2>
          
          {items.length === 0 ? (
            <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
              No items yet. Create one using the button above!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map(item => (
                <div
                  key={item.id}
                  style={{
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: item.complete ? '#f0fdf4' : '#ffffff',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{ 
                      margin: '0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: item.complete ? '#166534' : '#1f2937',
                      textDecoration: item.complete ? 'line-through' : 'none'
                    }}>
                      {item.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        fontWeight: '500',
                        borderRadius: '4px',
                        backgroundColor: 
                          item.priority === 'high' ? '#fee2e2' :
                          item.priority === 'medium' ? '#fef3c7' : '#dcfce7',
                        color:
                          item.priority === 'high' ? '#dc2626' :
                          item.priority === 'medium' ? '#d97706' : '#166534'
                      }}>
                        {item.priority?.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleEdit(item)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <p style={{ 
                    margin: '0 0 8px 0',
                    color: '#6b7280',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}>
                    {item.description}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '16px',
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    <span>Assigned to: <strong>{item.assignedTo}</strong></span>
                    {item.dueDate && <span>Due: <strong>{item.dueDate}</strong></span>}
                    {item.tags && item.tags.length > 0 && (
                      <span>Tags: <strong>{item.tags.join(', ')}</strong></span>
                    )}
                    {item.comments && item.comments.length > 0 && (
                      <span>Comments: <strong>{item.comments.length}</strong></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <strong>Features:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Modal overlay with smooth animations</li>
            <li>Form validation with error messaging</li>
            <li>Two-column responsive layout</li>
            <li>💬 <strong>Comment sidebar with real-time updates</strong></li>
            <li>Dark mode support</li>
            <li>TypeScript support</li>
            <li>Customizable styling</li>
          </ul>
        </div>
      </div>

      <CartEditor
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        item={currentItem}
        onSave={handleSave}
        title={currentItem ? 'Edit Item' : 'Create New Item'}
        showComments={showComments}
        onAddComment={handleAddComment}
        currentUser="You"
        commentsLoading={false}
      />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Demo />);
}
