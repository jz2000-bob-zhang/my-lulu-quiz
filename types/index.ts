// 问题类型
export type QuestionType = 'choice' | 'text';

// 单个问题
export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[]; // 选择题的选项
  bobAnswer: string;
  luluAnswer: string | null;
  answeredAt: string | null;
}

// 照片资源
export interface Images {
  welcome: string;      // 欢迎页照片
  transition: string;   // 中转页照片
  group1: string;       // 第1-5题顶部照片
  group2: string;       // 第6-10题顶部照片
  group3: string;       // 第11-15题顶部照片
  group4: string;       // 第16-20题顶部照片
  group5: string;       // 第21-25题顶部照片
  group6: string;       // 第26-30题顶部照片
}

// Lulu 的提问
export interface LuluQuestion {
  id: string;
  question: string;
  bobAnswer: string | null;
  createdAt: string;
}

// 问卷状态
export type QuizStatus = 'pending' | 'lulu_completed' | 'bob_answered_lulu_questions';

// 完整的问卷数据
export interface Quiz {
  _id: string;
  creatorName: string;      // Bob
  partnerName: string;      // Lulu
  shareLink: string;        // 唯一分享链接
  images: Images;
  questions: Question[];    // 30道题目
  luluQuestions: LuluQuestion[];  // Lulu 的提问
  status: QuizStatus;
  createdAt: string;
  luluCompletedAt: string | null;
}

// 答题进度
export interface QuizProgress {
  currentQuestion: number;  // 当前题目索引 (0-29)
  currentGroup: number;     // 当前组 (1-6)
  progress: number;         // 进度百分比 (0-100)
  isGroupComplete: boolean; // 当前组是否完成
}
