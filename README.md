# React Cart Editor

A beautiful and elegant cart modal editor component for React applications, inspired by the SVAR editor design. Perfect for todo lists, project management, and content editing workflows.

## Features

- 🎨 **Elegant Design** - Clean, modern interface with smooth animations
- 📱 **Responsive** - Mobile-friendly with adaptive layouts
- 💬 **Comment Sidebar** - Optional comment system with real-time updates
- 🌙 **Dark Mode** - Automatic dark mode support
- ✅ **Form Validation** - Built-in validation with error messaging
- 🎯 **TypeScript** - Full TypeScript support
- 🎨 **Customizable** - Easy to style and customize
- 📦 **Lightweight** - Minimal dependencies

## Installation

```bash
npm install react-cart-editor
```

## Usage

```tsx
import React, { useState } from 'react';
import { CartEditor, CartItem } from 'react-cart-editor';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<CartItem>({
    id: '1',
    title: 'Sample Task',
    description: 'This is a sample task description',
    complete: false,
    assignedTo: 'John Doe',
    priority: 'medium',
    dueDate: '2025-08-01',
    tags: ['sample', 'demo'],
    comments: [
      {
        id: '1',
        author: 'Sarah Wilson',
        content: 'Great progress on this task!',
        timestamp: '2025-07-24T10:30:00Z'
      }
    ]
  });

  const handleSave = (savedItem: CartItem) => {
    console.log('Saved:', savedItem);
    // Handle the saved item (update state, send to API, etc.)
  };

  const handleAddComment = (itemId: string, content: string) => {
    console.log('New comment:', content);
    // Handle adding comment (send to API, update state, etc.)
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Editor
      </button>

      <CartEditor
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        item={item}
        onSave={handleSave}
        title="Edit Task"
        showComments={true}
        onAddComment={handleAddComment}
        currentUser="John Doe"
      />
    </div>
  );
}
```

## Props

### CartEditor

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | ✅ | Controls modal visibility |
| `onClose` | `() => void` | ✅ | Called when modal should close |
| `onSave` | `(item: CartItem) => void` | ✅ | Called when item is saved |
| `item` | `CartItem` | ❌ | Item to edit (undefined for new item) |
| `title` | `string` | ❌ | Modal title (default: "Edit Item") |
| `showComments` | `boolean` | ❌ | Show comment sidebar (default: false) |
| `onAddComment` | `(itemId: string, content: string) => void` | ❌ | Called when comment is added |
| `currentUser` | `string` | ❌ | Current user name (default: "Current User") |
| `commentsLoading` | `boolean` | ❌ | Show loading state in comments (default: false) |

### CartItem

```tsx
interface CartItem {
  id: string;
  title: string;
  description: string;
  complete: boolean;
  assignedTo: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags?: string[];
  comments?: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build library
npm run build-lib
```

## Demo

Run the demo to see the component in action:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Styling

The component comes with beautiful default styles, but you can customize them by overriding the CSS classes:

- `.cart-editor-overlay` - Modal overlay
- `.cart-editor-modal` - Modal container
- `.cart-editor-header` - Modal header
- `.cart-editor-content` - Form content area
- `.cart-editor-field` - Form field container
- `.cart-editor-input` - Input fields
- `.cart-editor-button` - Buttons

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.