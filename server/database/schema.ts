import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const projectBg = sqliteTable('project_bg', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  scale: text('scale'),
  role: text('role'),
  techStack: text('tech_stack'),
  results: text('results'),
  directions: text('directions'), // 逗号分隔
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const essay = sqliteTable('essay', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  direction: text('direction'),
  projectBgId: integer('project_bg_id'),
  status: text('status', { enum: ['draft', 'done'] }).default('draft'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const essayVersion = sqliteTable('essay_version', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  essayId: integer('essay_id').notNull(),
  content: text('content').notNull(),
  wordCount: integer('word_count'),
  durationSec: integer('duration_sec'),
  selfReview: text('self_review'), // JSON
  isDraft: integer('is_draft', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const frameworkCard = sqliteTable('framework_card', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  caseType: text('case_type'),
  title: text('title').notNull(),
  content: text('content'), // markdown
  sortOrder: integer('sort_order'),
})

export const caseQuestion = sqliteTable('case_question', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  year: text('year'),
  caseType: text('case_type'),
  title: text('title'),
  material: text('material'),
  question: text('question'),
  points: text('points'), // JSON 采分点数组
  derived: integer('derived', { mode: 'boolean' }).default(false),
})

export const caseAttempt = sqliteTable('case_attempt', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  caseQuestionId: integer('case_question_id'),
  answer: text('answer'),
  durationSec: integer('duration_sec'),
  hitPoints: text('hit_points'), // JSON
  score: real('score'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const question = sqliteTable('question', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  year: text('year'),
  chapter: text('chapter'),
  stem: text('stem'),
  options: text('options'), // JSON
  answer: text('answer'),
  analysis: text('analysis'),
})

export const questionAttempt = sqliteTable('question_attempt', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  questionId: integer('question_id'),
  correct: integer('correct', { mode: 'boolean' }),
  errorReason: text('error_reason'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const reviewQueue = sqliteTable('review_queue', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  questionId: integer('question_id'),
  dueDate: text('due_date'), // YYYY-MM-DD
  streak: integer('streak').default(0),
  level: integer('level').default(0),
})

export const studyLog = sqliteTable('study_log', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  module: text('module'),
  refId: integer('ref_id'),
  minutes: integer('minutes'),
  date: text('date'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export const weekTask = sqliteTable('week_task', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  week: integer('week'),
  category: text('category'),
  content: text('content'),
  done: integer('done', { mode: 'boolean' }).default(false),
  sortOrder: integer('sort_order'),
})
