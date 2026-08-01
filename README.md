# Peng Zijia — Personal Portfolio

一个响应式个人网站框架，包含首页、关于、项目、随笔和联系方式。

## 最常用的修改

打开 `app/site-data.ts`，可以集中修改：

- 姓名、职业和个人介绍
- GitHub、邮箱等联系方式
- 项目卡片
- 随笔或文章链接

页面布局在 `app/page.tsx`，视觉样式在 `app/globals.css`。内容修改通常不需要改这两个文件。

## 本地预览

```bash
pnpm install
pnpm dev
```

然后访问终端显示的本地地址。保存文件后页面会自动更新。

## 发布前检查

1. 替换 `app/site-data.ts` 里的示例邮箱。
2. 把三个项目卡片改成真实项目，并更新链接。
3. 将随笔链接连接到你的真实文章。
4. 根据需要修改 `app/layout.tsx` 中的网站标题和简介。

## GitHub Pages 自动发布

网站使用 `.github/workflows/deploy-pages.yml` 自动发布。以后修改内容并推送到 `main` 分支，GitHub 会自动构建和更新 `https://pengzijia.github.io/`。
