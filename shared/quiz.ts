// 判分前接口下发的题目结构（绝不含 answer/analysis，安全红线见 server/api/questions）
export interface QuizQuestion {
  id: number
  year: string | null
  chapter: string | null
  textbookChapter?: string | null
  stem: string | null
  images?: string[]
  options: Record<string, string>
}

export interface QuizGradeResult {
  correct: boolean
  answer: string
  analysis: string | null
}

export interface QuizPaperDetail {
  questionId: number
  correct: boolean
  answer: string | null
  analysis: string | null
}
