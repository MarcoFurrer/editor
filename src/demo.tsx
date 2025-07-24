import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import CartEditor from './CartEditor';
import { CartItem } from './types';

const Demo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showComments] = useState(true);

  // Sample data - shows the cart modal open by default
  const sampleItem: CartItem = {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the new cart editor component including usage examples and API reference.',
    complete: false,
    assignedTo: 'John Doe',
    priority: 'high',
    dueDate: '2024-08-01',
    tags: ['documentation', 'urgent'],
    comments: [
      {
        id: '1',
        author: 'Sarah Wilson',
        content: 'This looks great! I think we should also include some video tutorials.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
      },
      {
        id: '2',
        author: 'Mike Johnson',
        content: 'Agreed! Also, let\'s make sure to cover the comment functionality in detail.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() // 1 hour ago
      }
    ]
  };

  const handleSave = (item: CartItem) => {
    console.log('Saved item:', item);
    setIsOpen(false);
  };

  const handleAddComment = (_itemId: string, content: string) => {
    console.log('Added comment:', content);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          React Cart Editor
        </h1>
        
        <p style={{ 
          fontSize: '1.1rem',
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          A beautiful and elegant modal editor component for React applications.
        </p>
        
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Open Cart Editor
        </button>
      </div>

      <CartEditor
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        item={sampleItem}
        onSave={handleSave}
        title="Edit Task"
        showComments={showComments}
        onAddComment={handleAddComment}
        currentUser="You"
      />
    </div>
  );
};

// Mount the demo
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Demo />);
}

export default Demo;
