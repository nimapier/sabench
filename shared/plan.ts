export interface WeekTask {
  week: number
  category: string
  content: string
  milestone?: string
  sortOrder: number
}

export const PLAN_START_DATE = '2026-07-28'

export const WEEK_PLAN: WeekTask[] = [
  // ===== 阶段一 W1-W6 教材一轮（《系统分析师教程（第2版）》三篇22章）=====
  // W1: 绪论 / 数学与工程基础 / 计算机系统 / 网络与分布式系统
  { week: 1, category: '教材一轮', content: '通读第1章 绪论：系统分析师角色定位、考试大纲与三科题型结构', sortOrder: 1 },
  { week: 1, category: '教材一轮', content: '第2章 数学与工程基础：离散数学、概率统计、运筹学基础，完成课后题', sortOrder: 2 },
  { week: 1, category: '教材一轮', content: '第3章 计算机系统：体系结构、存储系统、可靠性计算（串联/并联/模冗余）', sortOrder: 3 },
  { week: 1, category: '教材一轮', content: '第4章 网络与分布式系统：OSI/TCP-IP、分布式计算模型、中间件基础', sortOrder: 4 },
  { week: 1, category: '章节练习', content: '完成 W1 四章对应章节题，错题录入错题本', sortOrder: 5 },

  // W2: 数据库 / 企业信息化 / 软件工程 / 项目管理 / 信息安全
  { week: 2, category: '教材一轮', content: '第5章 数据库系统：ER 建模、规范化（1NF-BCNF）、事务与并发控制', sortOrder: 1 },
  { week: 2, category: '教材一轮', content: '第6章 企业信息化与战略规划：ERP/CRM/SCM、电子政务与电子商务', sortOrder: 2 },
  { week: 2, category: '教材一轮', content: '第7章 软件工程：开发模型、过程改进（CMMI）、逆向工程与再工程', sortOrder: 3 },
  { week: 2, category: '教材一轮', content: '第8章 项目管理：进度（关键路径/PERT）、成本（挣值）、风险与配置管理', sortOrder: 4 },
  { week: 2, category: '教材一轮', content: '第9章 信息安全：密码学基础、访问控制、安全体系结构与等级保护', sortOrder: 5 },
  { week: 2, category: '章节练习', content: '完成 W2 五章章节题，数据库规范化与挣值计算错题重点标注', sortOrder: 6 },

  // W3: 系统规划与分析 / 软件需求工程（重点）
  { week: 3, category: '教材一轮', content: '第10章 系统规划与分析：可行性研究、成本效益分析、系统方案建议书', sortOrder: 1 },
  { week: 3, category: '教材一轮', content: '第11章 软件需求工程（重点）：需求获取、需求建模（DFD/用例/状态图）', sortOrder: 2 },
  { week: 3, category: '教材一轮', content: '第11章 软件需求工程（重点）：需求规格说明、需求验证与需求管理', sortOrder: 3 },
  { week: 3, category: '章节练习', content: '需求工程章节题加练一轮，整理需求建模方法对比表', sortOrder: 4 },

  // W4: 软件架构设计 / 系统设计 + 软考报名
  { week: 4, category: '教材一轮', content: '第12章 软件架构设计：架构风格（分层/管道过滤器/仓库/MVC）、架构评估 ATAM', sortOrder: 1 },
  { week: 4, category: '教材一轮', content: '第13章 系统设计：结构化设计、面向对象设计（设计模式）、接口与数据库设计', sortOrder: 2 },
  { week: 4, category: '事务', content: '完成软考报名：核对报名信息、上传照片、缴费，截图留存报名成功凭证', sortOrder: 3 },
  { week: 4, category: '章节练习', content: '架构风格与设计模式章节题，整理常见架构风格优缺点对照表', sortOrder: 4 },

  // W5: 实现与测试 / 运行维护 + 第三篇 Web/嵌入式
  { week: 5, category: '教材一轮', content: '第14章 系统实现与测试：测试方法（黑盒/白盒）、测试阶段、McCabe 复杂度', sortOrder: 1 },
  { week: 5, category: '教材一轮', content: '第15章 系统运行与维护：维护类型、系统转换策略、IT 服务管理', sortOrder: 2 },
  { week: 5, category: '教材一轮', content: '第三篇 第16-17章 Web 应用系统与嵌入式系统：Web 架构、嵌入式实时系统基础', sortOrder: 3 },
  { week: 5, category: '章节练习', content: '测试与维护章节题，白盒测试覆盖标准错题重做', sortOrder: 4 },

  // W6: 移动/大数据/微服务/信息物理系统/论文写作要点 + M1
  { week: 6, category: '教材一轮', content: '第18-21章 新技术：移动计算、大数据、微服务架构、信息物理系统（CPS）', sortOrder: 1 },
  { week: 6, category: '论文', content: '第22章 论文写作要点：摘要结构、六段式框架（3000字预算）、评分标准解读', sortOrder: 2 },
  { week: 6, category: '论文', content: '选定 3 个候选项目背景素材，各写 300 字项目背景初稿', sortOrder: 3 },
  { week: 6, category: '里程碑', content: '里程碑 M1：教材一轮收尾，章节题正确率 ≥55%，未达标章节安排二刷', milestone: 'M1', sortOrder: 4 },

  // ===== 阶段二 W7-W9 真题专项 =====
  // W7: 每天50题 + 需求分析题专项 + 定稿3个项目背景
  { week: 7, category: '真题专项', content: '每天 50 道真题选择题（上午综合），限时 60 分钟，当日订正', sortOrder: 1 },
  { week: 7, category: '真题专项', content: '下午案例 需求分析题专项：DFD 补全、用例建模、需求规格问题诊断，每天 1 题', sortOrder: 2 },
  { week: 7, category: '论文', content: '定稿 3 个项目背景：分别适配需求分析/架构设计/其他方向，每篇 300 字可默写', sortOrder: 3 },
  { week: 7, category: '复盘', content: '周末汇总本周错题，按章节归类，标注高频薄弱点', sortOrder: 4 },

  // W8: 错题二刷 + 系统设计/数据库设计题 + 论文1-2篇
  { week: 8, category: '真题专项', content: '错题本二刷：W1-W7 全部错题重做，仍错的标记为顽固错题', sortOrder: 1 },
  { week: 8, category: '真题专项', content: '下午案例 系统设计题专项：架构选型、设计模式应用，每天 1 题', sortOrder: 2 },
  { week: 8, category: '真题专项', content: '下午案例 数据库设计题专项：ER 图转关系模式、规范化判断，隔天 1 题', sortOrder: 3 },
  { week: 8, category: '论文', content: '完成论文第 1-2 篇（需求分析方向、架构设计方向），每篇 3000 字并自评', sortOrder: 4 },

  // W9: 套卷自测 + 架构评估/项目管理计算题 + 论文3-4篇 + M2
  { week: 9, category: '真题专项', content: '套卷自测：近 3 年上午真题整卷限时模拟，统计得分率', sortOrder: 1 },
  { week: 9, category: '真题专项', content: '下午案例 架构评估题专项：ATAM/质量属性效用树，每两天 1 题', sortOrder: 2 },
  { week: 9, category: '真题专项', content: '下午案例 项目管理计算题专项：关键路径、挣值分析，每两天 1 题', sortOrder: 3 },
  { week: 9, category: '论文', content: '完成论文第 3-4 篇（性能优化方向、系统安全方向），控制写作时间 120 分钟内', sortOrder: 4 },
  { week: 9, category: '里程碑', content: '里程碑 M2：真题综合 ≥50/75（上午+下午案例），论文按时完篇，未达标调整冲刺计划', milestone: 'M2', sortOrder: 5 },

  // ===== 阶段三 W10-W12 冲刺 =====
  // W10: 国庆全真模拟（每两天一轮：连考240min + 论文120min）
  { week: 10, category: '全真模拟', content: '国庆全真模拟：每两天一轮，上午+下午案例连考 240 分钟，严格按考试时段', sortOrder: 1 },
  { week: 10, category: '全真模拟', content: '每轮模拟后加考论文 120 分钟（六大方向轮流出题），当天复盘', sortOrder: 2 },
  { week: 10, category: '复盘', content: '每轮模拟成绩登记，三科逐项对照 45 分线，弱项当晚补练', sortOrder: 3 },
  { week: 10, category: '论文', content: '完成论文第 5-6 篇（质量管理方向、进度成本方向）', sortOrder: 4 },

  // W11: 错题清零 + 框架卡默写 + 论文8-10篇 + M3
  { week: 11, category: '冲刺', content: '错题清零：顽固错题全部重做至全对，错题本清空', sortOrder: 1 },
  { week: 11, category: '冲刺', content: '框架卡默写：六段式提纲、3 个项目背景、各方向核心论点，每天默写一遍', sortOrder: 2 },
  { week: 11, category: '论文', content: '完成论文第 7-8 篇，累计 8 篇；学有余力推进至 10 篇', sortOrder: 3 },
  { week: 11, category: '全真模拟', content: '三科模考各一次：上午综合、下午案例、论文，全部限时', sortOrder: 4 },
  { week: 11, category: '里程碑', content: '里程碑 M3：论文累计 8 篇完成，三科模考均 ≥50 分，达标即进入保持期', milestone: 'M3', sortOrder: 5 },

  // W12: 保持手感 + 打印准考证 + 考前两天只看框架卡
  { week: 12, category: '冲刺', content: '保持手感：每天上午 30 道选择题 + 下午 1 道案例题，不再做新题难题', sortOrder: 1 },
  { week: 12, category: '事务', content: '10/20 打印准考证：核对考点地址与考试时间，规划路线，准备考试用品', sortOrder: 2 },
  { week: 12, category: '冲刺', content: '考前两天只看框架卡：六段式提纲 + 项目背景 + 高频考点速记，不做题不熬夜', sortOrder: 3 },
]
