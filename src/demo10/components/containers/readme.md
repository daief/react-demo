## 容器组件

-| 展示组件 | 容器组件
---|---|---
作用 | 描述如何展现（骨架、样式） | 描述如何运行（数据获取、状态更新）
直接使用 Redux | 否 | 是
数据来源 | props | 监听 Redux state
数据修改 | 从 props 调用回调函数 | 向 Redux 派发 actions
调用方式 | 手动 | 通常由 React Redux 生成