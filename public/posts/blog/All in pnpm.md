---

title: 'All in pnpm'

date: '2023-02-10'

---

​	As a front-end developer, Our PC may be exist a lot of project. That's a good thing but due to `npm` features When execute `npm install` to install the project related dependence It generated `node_modules` occupied disk so large. Objectively speaking It's just one of them.

​	To solve this problem, I chose to migrate all the projects to `pnpm`. First we need to delete `node_modules` directory that I recommend to use **`npkill`**(a tool for fast delete node_modules) to enables fast deletion.
​	`pnpm` via link ways to resolve disk occupied to large. All in all, In future development I'll think first to use `pnpm` as a package management tool.

---
Related links:

[pnpm 是凭什么对 npm 和 yarn 降维打击的](https://juejin.cn/post/7127295203177676837)