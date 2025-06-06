export interface Article {
  id: string;
  title: string;
  content: string;
  screenshots: string[];
  authorComment: string;
  status: "pending" | "approved" | "rejected";
  adminComment?: string;
  createdAt: Date;
  authorName: string;
}

export type UserRole = "user" | "admin";
