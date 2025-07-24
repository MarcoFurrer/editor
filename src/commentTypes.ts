export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

export interface CommentSidebarProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  isLoading?: boolean;
  currentUser?: string;
}
