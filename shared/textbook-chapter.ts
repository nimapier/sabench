export interface TextbookChapterMeta {
  key: string
  label: string
}

export const TEXTBOOK_CHAPTERS: TextbookChapterMeta[] = [
  { key: '1', label: '第1章 绪论' },
  { key: '2', label: '第2章 数学基础' },
  { key: '3', label: '第3章 计算机系统' },
  { key: '4', label: '第4章 网络与分布式系统' },
  { key: '5', label: '第5章 数据库系统' },
  { key: '6', label: '第6章 企业信息化与战略规划' },
  { key: '7', label: '第7章 软件工程' },
  { key: '8', label: '第8章 项目管理' },
  { key: '9', label: '第9章 信息安全' },
  { key: '10', label: '第10章 系统规划与分析' },
  { key: '11', label: '第11章 软件需求工程' },
  { key: '12', label: '第12章 软件架构设计' },
  { key: '13', label: '第13章 系统设计' },
  { key: '14', label: '第14章 系统实现与测试' },
  { key: '15', label: '第15章 运行维护' },
  { key: '16', label: '第16-21章 新技术' },
  { key: 'X', label: '法规与英语' },
]

const labelMap = new Map(TEXTBOOK_CHAPTERS.map(c => [c.key, c.label]))

export function textbookChapterLabel(key: string | null | undefined): string {
  if (!key) return '未标注'
  return labelMap.get(key) ?? key
}

export function textbookChapterOrder(key: string): number {
  const idx = TEXTBOOK_CHAPTERS.findIndex(c => c.key === key)
  return idx === -1 ? TEXTBOOK_CHAPTERS.length : idx
}
