export interface WeekTask {
  week: number
  category: string
  content: string
  milestone?: string
  sortOrder: number
}

export const PLAN_START_DATE = '2026-08-17'

export const WEEK_PLAN: WeekTask[] = [
  // ===== 阶段一 W1-W4 教材一轮（压缩版：低权重章节速读，重点章节保深度）=====
  // W1: 计算机系统 / 网络 / 数据库（绪论、数学降为速读）
  { week: 1, category: '教材一轮', content: '第1-2章 速读：系统分析师角色定位、考试大纲与三科题型结构、数学基础（不做课后难题）', sortOrder: 1 },
  { week: 1, category: '教材一轮', content: '第3章 计算机系统：体系结构、存储系统、可靠性计算（串联/并联/模冗余）', sortOrder: 2 },
  { week: 1, category: '教材一轮', content: '第4章 网络与分布式系统：OSI/TCP-IP、分布式计算模型、中间件基础', sortOrder: 3 },
  { week: 1, category: '教材一轮', content: '第5章 数据库系统：ER 建模、规范化（1NF-BCNF）、事务与并发控制', sortOrder: 4 },
  { week: 1, category: '章节练习', content: '完成第3-5章章节题，错题自动入 SM-2 复习队列（启动复习机制）', sortOrder: 5 },

  // W2: 企业信息化 / 软件工程 / 项目管理 / 信息安全 + 报名确认
  { week: 2, category: '教材一轮', content: '第6章 企业信息化与战略规划：ERP/CRM/SCM、电子政务与电子商务', sortOrder: 1 },
  { week: 2, category: '教材一轮', content: '第7章 软件工程：开发模型、过程改进（CMMI）、逆向工程与再工程', sortOrder: 2 },
  { week: 2, category: '教材一轮', content: '第8章 项目管理：进度（关键路径/PERT）、成本（挣值）、风险与配置管理', sortOrder: 3 },
  { week: 2, category: '教材一轮', content: '第9章 信息安全：密码学基础、访问控制、安全体系结构与等级保护', sortOrder: 4 },
  { week: 2, category: '事务', content: '确认软考报名状态：核对报名信息、缴费，截图留存凭证（报名窗口很短，本周必须落实）', sortOrder: 5 },
  { week: 2, category: '章节练习', content: '完成第6-9章章节题，数据库规范化与挣值计算错题重点标注', sortOrder: 6 },

  // W3: 系统规划与分析 / 软件需求工程（重点）/ 架构设计
  { week: 3, category: '教材一轮', content: '第10章 系统规划与分析：可行性研究、成本效益分析、系统方案建议书', sortOrder: 1 },
  { week: 3, category: '教材一轮', content: '第11章 软件需求工程（重点）：需求获取、需求建模（DFD/用例/状态图）', sortOrder: 2 },
  { week: 3, category: '教材一轮', content: '第11章 软件需求工程（重点）：需求规格说明、需求验证与需求管理', sortOrder: 3 },
  { week: 3, category: '教材一轮', content: '第12章 软件架构设计：架构风格（分层/管道过滤器/仓库/MVC）、架构评估 ATAM', sortOrder: 4 },
  { week: 3, category: '章节练习', content: '需求工程与架构设计章节题加练一轮，整理需求建模方法与架构风格对照表', sortOrder: 5 },

  // W4: 设计/测试/运维 + 新技术速读 + 论文要点 + 项目背景初稿 + M1
  { week: 4, category: '教材一轮', content: '第13-14章 系统设计与实现测试：结构化设计、设计模式、黑盒/白盒测试、McCabe 复杂度', sortOrder: 1 },
  { week: 4, category: '教材一轮', content: '第15章 运行维护 + 第16-21章 新技术速读：维护类型、Web/嵌入式/移动/大数据/微服务/CPS', sortOrder: 2 },
  { week: 4, category: '论文', content: '第22章 论文写作要点：摘要结构、六段式框架（3000字预算）、评分标准解读', sortOrder: 3 },
  { week: 4, category: '论文', content: '选定 3 个候选项目背景素材，各写 300 字项目背景初稿', sortOrder: 4 },
  { week: 4, category: '里程碑', content: '里程碑 M1：教材一轮收尾，章节题正确率 ≥55%，未达标章节安排二刷', milestone: 'M1', sortOrder: 5 },

  // ===== 阶段二 W5-W7 真题专项 =====
  // W5: 每天50题 + 需求分析题专项 + 定稿3个项目背景
  { week: 5, category: '真题专项', content: '每天 50 道真题选择题（上午综合），限时 60 分钟，当日订正', sortOrder: 1 },
  { week: 5, category: '真题专项', content: '下午案例 需求分析题专项：DFD 补全、用例建模、需求规格问题诊断，每天 1 题', sortOrder: 2 },
  { week: 5, category: '论文', content: '定稿 3 个项目背景：分别适配需求分析/架构设计/其他方向，每篇 300 字可默写', sortOrder: 3 },
  { week: 5, category: '复盘', content: '周末汇总本周错题，按章节归类，标注高频薄弱点', sortOrder: 4 },

  // W6: 错题二刷 + 系统设计/数据库设计题 + 论文1-2篇
  { week: 6, category: '真题专项', content: '错题本二刷：W1-W5 全部错题重做，仍错的标记为顽固错题', sortOrder: 1 },
  { week: 6, category: '真题专项', content: '下午案例 系统设计题专项：架构选型、设计模式应用，每天 1 题', sortOrder: 2 },
  { week: 6, category: '真题专项', content: '下午案例 数据库设计题专项：ER 图转关系模式、规范化判断，隔天 1 题', sortOrder: 3 },
  { week: 6, category: '论文', content: '完成论文第 1-2 篇（需求分析方向、架构设计方向），每篇 3000 字并自评', sortOrder: 4 },

  // W7: 套卷自测 + 架构评估/项目管理计算题 + 论文3-4篇 + M2
  { week: 7, category: '真题专项', content: '套卷自测：近 3 年上午真题整卷限时模拟，统计得分率', sortOrder: 1 },
  { week: 7, category: '真题专项', content: '下午案例 架构评估题专项：ATAM/质量属性效用树，每两天 1 题', sortOrder: 2 },
  { week: 7, category: '真题专项', content: '下午案例 项目管理计算题专项：关键路径、挣值分析，每两天 1 题', sortOrder: 3 },
  { week: 7, category: '论文', content: '完成论文第 3-4 篇（性能优化方向、系统安全方向），控制写作时间 120 分钟内', sortOrder: 4 },
  { week: 7, category: '里程碑', content: '里程碑 M2：真题综合 ≥50/75（上午+下午案例），论文按时完篇，未达标调整冲刺计划', milestone: 'M2', sortOrder: 5 },

  // ===== 阶段三 W8-W10 冲刺 =====
  // W8: 国庆全真模拟（每两天一轮：连考240min + 论文120min）
  { week: 8, category: '全真模拟', content: '国庆全真模拟：每两天一轮，上午+下午案例连考 240 分钟，严格按考试时段', sortOrder: 1 },
  { week: 8, category: '全真模拟', content: '每轮模拟后加考论文 120 分钟（六大方向轮流出题），当天复盘', sortOrder: 2 },
  { week: 8, category: '复盘', content: '每轮模拟成绩登记，三科逐项对照 45 分线，弱项当晚补练', sortOrder: 3 },
  { week: 8, category: '论文', content: '完成论文第 5-6 篇（质量管理方向、进度成本方向）', sortOrder: 4 },

  // W9: 错题清零 + 框架卡默写 + 论文7-8篇 + M3
  { week: 9, category: '冲刺', content: '错题清零：顽固错题全部重做至全对，SM-2 复习队列清空', sortOrder: 1 },
  { week: 9, category: '冲刺', content: '框架卡默写：六段式提纲、3 个项目背景、各方向核心论点，每天默写一遍', sortOrder: 2 },
  { week: 9, category: '论文', content: '完成论文第 7-8 篇，累计 8 篇；学有余力推进至 10 篇', sortOrder: 3 },
  { week: 9, category: '全真模拟', content: '三科模考各一次：上午综合、下午案例、论文，全部限时', sortOrder: 4 },
  { week: 9, category: '里程碑', content: '里程碑 M3：论文累计 8 篇完成，三科模考均 ≥50 分，达标即进入保持期', milestone: 'M3', sortOrder: 5 },

  // W10: 保持手感 + 打印准考证 + 考前两天只看框架卡 → 考试
  { week: 10, category: '冲刺', content: '保持手感：每天上午 30 道选择题 + 下午 1 道案例题，不再做新题难题', sortOrder: 1 },
  { week: 10, category: '事务', content: '打印准考证：核对考点地址与考试时间，规划路线，准备考试用品', sortOrder: 2 },
  { week: 10, category: '冲刺', content: '考前两天只看框架卡：六段式提纲 + 项目背景 + 高频考点速记，不做题不熬夜', sortOrder: 3 },
]
