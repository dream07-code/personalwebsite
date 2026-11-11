---
title: AI 编程实训助手
summary: 面向编程教学的 AI 教育与学习平台：真实判题、AI 评分、批改报告与学习画像。
year: 2026
stack: ['Java 21', 'Spring Boot', 'Vue 3', 'MySQL', 'Redis', 'Judge0']
repo: https://github.com/dream07-code/innovation-space-management-kechuang
featured: true
order: 2
---

AI 编程实训助手是一个面向编程教学的 AI 教育与学习平台。学生在线写代码交题，判题机真实编译执行；客观题自动判分，主观题由大模型按评分标准给出档位与依据，教师复核后一键发布成绩。

项目源自我为学校科创空间开发的创新空间管理系统，按 AI 教育方向改版后参加第九届传智杯 AI Web 网页开发挑战赛。

## 解决的问题

编程课的教学闭环里，三个环节最容易断：练习没有反馈、判分口径不统一、学情看不见。平台把三者合成一条链：**写代码 → 机器判题 → AI 给分并说明依据 → 教师复核 → 成绩发布 → 过程进积分与看板。**

## 核心能力

- **真实判题**：自建 Judge0，代码在隔离沙箱里真实编译执行，支持 Java、Python、C++、JavaScript、Go、Rust 六种语言；
- **AI 评分**：通过 openai-compatible 接口调用大模型，评分标准是显式代码，评分任务带版本号，迟到结果只标记 `STALE` 而不覆盖；
- **批改报告**：判定结果、失败用例、错因解析与改进建议放在同一页，下一题推荐由规则决定而不是模型；
- **AI 助教**：独立会话入口，历史落库，可关联题目提问；
- **学习画像**：按题目去重统计尝试与通过，薄弱知识点与推荐练习全部来自真实提交；
- **管理与权限**：三级角色、方向级数据隔离，权限在后端逐对象校验。

## 技术架构

- 后端：Java 21、Spring Boot、MyBatis-Plus、Flyway 受控迁移
- 数据：MySQL 8.0、Redis
- 前端：Vue 3、Vite、TypeScript、Element Plus、Pinia
- 判题：自建 Judge0（隔离容器 + PostgreSQL + Redis）
- 部署：Docker Compose + Nginx 同源

## 设计取舍

安全约束写在实现里，而不是文档里：没有默认管理员、没有默认密码、没有提交进仓库的密钥；配置缺失时功能关闭，而不是降级成假数据。AI 不可用时，报告页照常展示判题结果并说明原因，不生成占位批改。
