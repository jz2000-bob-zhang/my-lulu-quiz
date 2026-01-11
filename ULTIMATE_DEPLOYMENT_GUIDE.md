# 终极部署指南：一步一步将您的问卷网站上线

你好！这是一份真正为初学者准备的、零基础的网站部署教程。请完全按照以下步骤操作，不要跳过，您将能成功地将您的问卷网站发布到互联网上，并绑定您在GoDaddy购买的域名。

---

## Part 1: 将您的代码上传到 GitHub

**目标:** Vercel (我们即将使用的部署服务) 需要读取您的项目代码才能帮您发布。最简单的方式就是将代码存放在 GitHub 这个免费的代码托管网站上。

*(这部分与之前相同，如果您已经完成，请直接跳到 Part 2)*

#### 第1步: 注册一个 GitHub 账户
- **网址:** [https://github.com/signup](https://github.com/signup)

#### 第2步: 在 GitHub 上创建一个新的代码仓库 (Repository)
1.  登录 GitHub 后，点击页面右上角的 **+** 号，然后选择 **New repository**。
2.  **Repository name (仓库名称):** `my-lulu-quiz`。
3.  **Public (公开):** 请选择 **Public**。
4.  **不要勾选任何框。**
5.  点击 **Create repository** 按钮。

#### 第3步: 将您电脑上的项目代码上传到这个仓库
1.  **打开您电脑的终端 (Terminal)**。
2.  **进入您的项目文件夹**。
    ```bash
    cd /Users/jiamingzhang/Projects/LuluBob-quiz
    ```
3.  **依次输入并执行以下命令**：
    *   `git init -b main`
    *   `git add .`
    *   `git commit -m "准备部署"`
    *   `git remote add origin [您的GitHub仓库URL]` (请从您的GitHub仓库页面复制URL替换这里)
    *   `git push -u origin main`

---

## Part 2: 创建并连接数据库 (Vercel KV)

**目标:** 创建一个免费的线上数据库来永久保存问卷结果。我们将使用Vercel官方的KV数据库（基于Redis）。

#### 第1步: 注册 Vercel 账户

1.  **前往 Vercel 网站:** [https://vercel.com/signup](https://vercel.com/signup)
2.  在注册页面，请选择 **Continue with GitHub** 按钮。这会将您的 Ve∏cel 账户与 GitHub 关联，非常方便。
3.  按照提示完成授权和注册。

#### 第2步: 创建一个新的 KV 数据库

1.  登录 Vercel 后，您会看到一个 Dashboard (仪表盘)。点击顶部的 **Storage** 标签页。
2.  点击 **Create a New Store**，然后选择 **KV (New)**。
3.  **Store Name (仓库名称):** 给它起个名字，例如 `lulu-quiz-db`。
4.  **Region (地区):** 选择离您或您的用户最近的地区即可。
5.  点击 **Create**。

#### 第3步: 将数据库连接到您的代码

1.  创建成功后，您会看到数据库的管理页面。点击 **Connect Project** 或 ".env.local" 标签页。
2.  在 **Connect Project** 下拉菜单中，选择 **Connect an existing project**。
3.  Vercel 会显示您 GitHub 上的项目列表。找到 `my-lulu-quiz` 并点击它旁边的 **Connect** 按钮。
4.  Vercel 会提示它将为您的项目设置环境变量。点击 **Connect** 确认。

**恭喜！** 您已经成功创建了数据库并将其与您的代码项目关联。Vercel 已经自动为您处理好了所有复杂的连接密码和配置。

---

## Part 3: 部署您的网站

**目标:** 将您的网站发布到互联网。

1.  回到您的 Vercel Dashboard 主页。点击 **Add New...** -> **Project**。
2.  找到您之前上传的 `my-lulu-quiz` 仓库，然后点击它右侧的 **Import** 按钮。
3.  **配置项目:**
    *   **Project Name:** Vercel 会自动为您命名，无需修改。
    *   **Framework Preset:** Vercel 会自动检测到是 "Next.js"，无需修改。
    *   **Environment Variables (环境变量):** **请注意！** 因为您在上一步已经连接了数据库，Vercel 已经自动添加了所有需要的环境变量。您**无需**在此处手动添加任何东西。
4.  **点击 Deploy (部署) 按钮**。

请耐心等待几分钟，Vercel 会完成所有工作。完成后，Vercel会给您一个 `.vercel.app` 结尾的网址。您的网站已经成功上线了！

---

## Part 4: 绑定您在 GoDaddy 购买的域名

*(这部分与之前相同)*

#### 第1步: 在 Vercel 中添加您的域名
1.  在 Vercel 中您刚刚部署好的项目页面上，点击顶部的 **Settings** 标签页, 然后选择 **Domains**。
2.  输入您在 GoDaddy 购买的域名 (例如 `lulu-and-bob.com`)，然后点击 **Add**。
3.  Vercel 会提供给您需要使用的 **Nameservers** (域名服务器)，通常是两条。

#### 第2步: 在 GoDaddy 中更新域名服务器
1.  登录您的 GoDaddy 账户, 找到您的域名并进入其 **DNS** 管理页面。
2.  找到 **Nameservers** (域名服务器) 板块, 点击 **更改**。
3.  选择 **输入我自己的域名服务器(高级)**。
4.  将 GoDaddy 的默认地址，替换为 Vercel 提供给您的那两条地址。
5.  保存更改。

DNS 更新在全球生效需要一些时间。生效后，您的网站就可以通过您的专属域名访问了。

---

## Part 5: 如何在您自己的电脑上测试 (本地开发)

**目标:** 如果您想在部署上线前，在自己电脑上测试“保存数据到Vercel KV”的功能，需要同步Vercel上的数据库配置。

1.  **安装 Vercel CLI (命令行工具):** 在您的终端里，运行一次这个命令：
    ```bash
    npm install -g vercel
    ```
2.  **登录 Vercel:** 在终端里运行：
    ```bash
    vercel login
    ```
    它会引导您在浏览器中完成登录。
3.  **关联本地项目:** 在您的项目文件夹里 (`/Users/jiamingzhang/Projects/LuluBob-quiz`)，运行：
    ```bash
    vercel link
    ```
    它会问您一些问题，一路确认即可，将这个本地文件夹与您在Vercel上创建的项目关联起来。
4.  **拉取环境变量:** 最后，运行这个命令：
    ```bash
    vercel env pull .env.local
    ```
这个命令会自动创建一个 `.env.local` 文件，并将您在 Vercel 上配置好的数据库连接信息安全地下载到里面。完成这一步后，您就可以在本地电脑上运行 `npm run dev` 来测试所有功能了。