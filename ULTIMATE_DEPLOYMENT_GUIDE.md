# 终极部署指南：一步一步将您的问卷网站上线

你好！这是一份真正为初学者准备的、零基础的网站部署教程。请完全按照以下步骤操作，不要跳过，您将能成功地将您的问卷网站发布到互联网上，并绑定您在GoDaddy购买的域名。

---

## Part 1: 将您的代码上传到 GitHub

**目标:** Vercel (我们即将使用的部署服务) 需要读取您的项目代码才能帮您发布。最简单的方式就是将代码存放在 GitHub 这个免费的代码托管网站上。

#### 第1步: 注册一个 GitHub 账户

如果您还没有 GitHub 账户，请先注册一个。
- **网址:** [https://github.com/signup](https://github.com/signup)

#### 第2步: 在 GitHub 上创建一个新的代码仓库 (Repository)

1.  登录 GitHub 后，点击页面右上角的 **+** 号，然后选择 **New repository**。
2.  **Repository name (仓库名称):** 给它起个名字，例如 `my-lulu-quiz`。
3.  **Description (描述):** (可选) 可以写 `LuluBob Couple Quiz`。
4.  **Public (公开):** 请选择 **Public**。
5.  **不要勾选任何框:** 请**不要**勾选 "Add a README file", "Add .gitignore", 或 "Choose a license"。
6.  点击 **Create repository** 按钮。

#### 第3步: 将您电脑上的项目代码上传到这个仓库

1.  **打开您电脑的终端 (Terminal)**。
    *   在 macOS 上, 打开 "应用程序" -> "实用工具" -> "终端 (Terminal)"。

2.  **进入您的项目文件夹**。请在终端里输入以下命令，然后按回车。这个命令能直接带您进入项目目录：
    ```bash
    cd /Users/jiamingzhang/Projects/LuluBob-quiz
    ```

3.  **依次输入并执行以下命令**。请复制粘贴每一行，然后按回车。这些命令的作用是初始化您的代码文件夹，并将其与您在GitHub上创建的仓库关联起来。

    *   **命令 1: 初始化**
        ```bash
        git init -b main
        ```

    *   **命令 2: 添加所有文件**
        ```bash
        git add .
        ```

    *   **命令 3: 保存您的修改**
        ```bash
        git commit -m "我的第一个问卷版本"
        ```

    *   **命令 4: 关联远程仓库** (最重要的一步)
        在您刚刚创建的 GitHub 仓库页面上，您会看到一个标题为 "…or push an existing repository from the command line" 的区域。请从那里复制以 `https://` 开头的 URL。
        然后，在终端里输入以下命令，**并将 `[您的GitHub仓库URL]` 替换为您复制的链接**。
        ```bash
        git remote add origin [您的GitHub仓库URL]
        ```
        *例如:* `git remote add origin https://github.com/YourUsername/my-lulu-quiz.git`

    *   **命令 5: 上传代码**
        ```bash
        git push -u origin main
        ```
        上传过程中，终端可能会提示您输入GitHub的用户名和密码。

现在，刷新您的GitHub仓库页面，您应该能看到您的所有项目文件都已经被上传上去了。

---

## Part 2: 使用 Vercel 部署您的网站

**目标:** Vercel 会读取您 GitHub 上的代码，自动构建并将其发布成一个公开的网站。

#### 第1步: 注册 Vercel 账户

1.  **前往 Vercel 网站:** [https://vercel.com/signup](https://vercel.com/signup)
2.  在注册页面，请选择 **Continue with GitHub** 按钮。这会将您的 Vercel 账户与 GitHub 关联，非常方便。
3.  按照提示完成授权和注册。

#### 第2步: 导入并部署您的项目

1.  登录 Vercel 后，您会看到一个 Dashboard (仪表盘)。点击 **Add New...** -> **Project**。
2.  Vercel 会显示您 GitHub 上的所有仓库。找到您刚刚创建的 `my-lulu-quiz`，然后点击它右侧的 **Import** 按钮。
3.  **配置项目:**
    *   **Project Name:** Vercel 会自动为您命名，无需修改。
    *   **Framework Preset:** Vercel 会自动检测到是 "Next.js"，无需修改。
    *   **Environment Variables (环境变量):** 这是**非常关键**的一步。请点击展开这个区域，然后**逐一**添加以下4个变量，用来连接您的阿里云OSS。
        | Name                  | Value                      |
        | --------------------- | -------------------------- |
        | `OSS_REGION`          | `您自己的OSS Region`         |
        | `OSS_ACCESS_KEY_ID`   | `您自己的AccessKey ID`     |
        | `OSS_ACCESS_KEY_SECRET` | `您自己的AccessKey Secret` |
        | `OSS_BUCKET`          | `您自己的Bucket名称`         |

4.  **点击 Deploy (部署) 按钮**。

现在，您需要做的就是等待。Vercel 会像一个机器人一样，自动完成所有构建和发布工作，这可能需要几分钟。完成后，Vercel会给您一个 `.vercel.app` 结尾的网址，例如 `my-lulu-quiz.vercel.app`。恭喜！您的网站已经成功上线了！

---

## Part 3: 绑定您在 GoDaddy 购买的域名

**目标:** 让访客通过您的个性化域名（例如 `www.lulu-and-bob.com`）访问您的网站。

#### 第1步: 在 Vercel 中添加您的域名

1.  在 Vercel 中您刚刚部署好的项目页面上，点击顶部的 **Settings** 标签页。
2.  在左侧菜单中，选择 **Domains**。
3.  在输入框中，输入您在 GoDaddy 购买的域名 (例如 `lulu-and-bob.com`)，然后点击 **Add**。
4.  Vercel 会告诉您推荐的配置方法。对于GoDaddy，最简单的方法是修改 **Nameservers (域名服务器)**。Vercel 会提供给您两条记录，看起来像 `ns1.vercel-dns.com` 和 `ns2.vercel-dns.com`。

#### 第2步: 在 GoDaddy 中更新域名服务器

1.  登录您的 GoDaddy 账户。
2.  进入“我的产品”，找到您要用的域名，点击它旁边的 **DNS** 按钮。
3.  在 DNS 管理页面，找到 **Nameservers** (域名服务器) 这个板块，点击 **更改**。
4.  选择 **输入我自己的域名服务器(高级)**。
5.  将 GoDaddy 的默认服务器地址，替换为 Vercel 提供给您的那两条地址。
6.  保存更改。

**大功告成!** DNS 的更新在全球生效需要一些时间，从几分钟到几小时不等。生效后，您的网站就可以通过您的专属域名访问了！Vercel 也会自动为它配置好 HTTPS 安全证书。
