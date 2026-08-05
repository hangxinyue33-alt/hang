export type PageId =
  | 'page-1'  // 首页
  | 'page-2'  // 测试说明页
  | 'page-3'  // 第1题
  | 'page-4'  // 第2题
  | 'page-5'  // 第3题
  | 'page-6'  // 第4题
  | 'page-7'  // 第5题
  | 'page-8'  // 第6题
  | 'page-9'  // 结果生成页 (分析加载中)
  | 'page-result' // Page10-15: 6种人格结果页
  | 'page-poster'; // Page16: 分享海报页

export interface QuizOption {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  personalityIndex: number; // 0 to 5
}

export interface QuizQuestion {
  id: number; // 1 to 6
  question: string;
  options: QuizOption[];
}

export interface PersonalityResult {
  id: number; // 0 to 5
  title: string;
  emoji: string;
  name: string; // e.g. 薯条外交官
  tagline: string; // 一句话反差标签
  description: string; // 恋爱人格正文
  taView: string[]; // TA眼里的你
  colorAccent: string; // for badge or highlight
  bgAccent: string;
  avatarSvg?: string; // Custom vector food illustration
}

export interface UserTestState {
  currentPage: PageId;
  currentQuestionIndex: number; // 0 to 5
  answers: number[]; // index of selected option for each question (0-3)
  scores: number[]; // array of 6 scores corresponding to personality 0-5
  resultPersonalityId: number | null;
  historyLogs: { questionId: number; selectedOption: number; personalityIndex: number }[];
}
