import { Comment } from './commentTypes';

export interface CartItem {
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

export interface CartEditorProps {
  isOpen: boolean;
  onClose: () => void;
  item?: CartItem;
  onSave: (item: CartItem) => void;
  title?: string;
  showComments?: boolean;
  onAddComment?: (itemId: string, content: string) => void;
  currentUser?: string;
  commentsLoading?: boolean;
}

export interface ValidationErrors {
  title?: string;
  description?: string;
  assignedTo?: string;
}
