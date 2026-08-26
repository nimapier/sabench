import { count } from 'drizzle-orm'
import { question } from '../../database/schema'
import { textbookChapterOrder } from '#shared/textbook-chapter'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const byTextbook = query.by === 'textbook'

  const db = useDb()
  const rows = await db
    .select({
      chapter: byTextbook ? question.textbookChapter : question.chapter,
      count: count(),
    })
    .from(question)
    .groupBy(byTextbook ? question.textbookChapter : question.chapter)

  const data = rows
    .filter(r => r.chapter)
    .map(r => ({ chapter: r.chapter!, count: r.count }))

  if (byTextbook) {
    data.sort((a, b) => textbookChapterOrder(a.chapter) - textbookChapterOrder(b.chapter))
  }
  else {
    data.sort((a, b) => a.chapter.localeCompare(b.chapter))
  }

  return { data }
})
