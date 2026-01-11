# LuluBob 问卷部署指南

请遵循以下步骤来部署您的情侣问卷应用。

## 1. 配置环境变量 (连接阿里云OSS)

本项目需要连接到您的阿里云对象存储服务（OSS）来保存问卷结果。您需要通过“环境变量”的方式来提供连接凭证。

### 本地开发

在您的项目根目录中，创建一个名为 `.env.local` 的文件。将以下内容添加到文件中，并用您自己的阿里云OSS信息替换掉占位符：

```
# 阿里云OSS凭证
OSS_REGION=your-oss-region
OSS_ACCESS_KEY_ID=your-access-key-id
OSS_ACCESS_KEY_SECRET=your-access-key-secret
OSS_BUCKET=your-bucket-name
```

-   `OSS_REGION`: 您的OSS存储桶所在的地域，例如 `oss-cn-hangzhou`。
-   `OSS_ACCESS_KEY_ID`: 您的阿里云AccessKey ID。
-   `OSS_ACCESS_KEY_SECRET`: 您的阿里云AccessKey Secret。
-   `OSS_BUCKET`: 您的OSS存储桶（Bucket）名称。

**注意:** `.env.local` 文件已被添加到 `.gitignore` 中，不会（也不应该）被上传到您的代码仓库。

### 线上部署 (生产环境)

当您将应用部署到线上服务器时（例如 Vercel、Netlify等），您**必须**在这些平台的项目设置中配置相同的环境变量。**请勿**将这些敏感信息硬编码在您的应用程序中。

## 2. 构建您的应用

在部署之前，您需要为您的Next.js应用创建一个生产版本的“构建包”。运行以下命令：

```bash
npm run build
```

此命令会在 `.next` 文件夹中创建您的应用程序的优化版本。

## 3. 部署您的应用 (上线)

我们强烈推荐使用对Next.js有良好支持的托管平台。

### 推荐平台: Vercel

Vercel 是 Next.js 的创建者，提供了最简单、最快捷的部署体验。

1.  **将您的代码推送到Git仓库**: 例如 GitHub, GitLab, Bitbucket。
2.  **注册 Vercel 账户**: 使用您的Git账户登录 Vercel，然后导入您的项目仓库。
3.  **配置环境变量**: 在您的 Vercel 项目设置中，找到 "Environment Variables"（环境变量）部分，然后添加上面提到的四个 `OSS_*` 变量和它们的值。
4.  **部署**: Vercel 将自动构建并部署您的应用。每次您提交新的代码到Git仓库，Vercel都会为您自动重新部署。

#### 连接您在 GoDaddy 购买的域名

当您的项目在Vercel上部署成功后，您可以按照以下步骤绑定您的域名。

1.  **在 Vercel 中添加域名:**
    *   在您的 Vercel 项目主页，点击 **Settings** 标签页, 然后选择 **Domains**。
    *   输入您在 GoDaddy 购买的域名 (例如: `your-domain.com`) 然后点击 **Add**。
    *   Vercel 会给您提供两条您需要使用的 **Nameservers** (域名服务器)。它们看起来像 `ns1.vercel-dns.com` 和 `ns2.vercel-dns.com`。请先不要关闭这个页面。

2.  **在 GoDaddy 中更新域名服务器:**
    *   登录到您的 GoDaddy 账户。
    *   找到您的域名，进入其 **DNS** 管理设置页面。
    *   找到更改 **Nameservers**（域名服务器）的选项。您可能需要选择“我将使用我自己的域名服务器”之类的选项。
    *   将 GoDaddy 默认的域名服务器替换为上一步 Vercel 提供给您的两条记录。
    *   保存更改。

**请注意:** DNS（域名系统）的更改在全球生效需要一些时间，从几分钟到48小时不等。生效后，Vercel会自动为您的网站配置SSL安全证书，您的问卷网站就可以通过您的自定义域名访问了。

### 其他部署选项

您也可以将此应用部署到其他平台，如 Netlify, AWS, Google Cloud 或您自己的服务器。通用步骤包括：

1.  运行 `npm run build` 命令。
2.  运行 `npm run start` 命令来启动Next.js服务。
3.  确保在服务器上设置了正确的环境变量。

这通常需要使用进程管理器（如 `pm2`）或Docker容器。为了简单起见，我们还是强烈推荐使用Vercel。

## 总结

部署成功后，所有的问卷数据将会以JSON文件的形式，保存在您指定的阿里云OSS存储桶的 `quiz-results/` 文件夹下。您可以直接在阿里云OSS控制台查看和管理这些文件。