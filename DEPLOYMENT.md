# Vercelデプロイ手順

## 前提条件

- GitHubリポジトリとVercelが連携済み
- Neonデータベースが作成済み
- Google OAuth認証情報を取得済み

## 1. Vercel環境変数の設定

Vercelダッシュボード → プロジェクト → Settings → Environment Variables

### Production環境に以下を追加:

```bash
# NeonダッシュボードからコピーしたDATABASE_URLを設定
DATABASE_URL=postgresql://user:password@host/database?connect_timeout=15&sslmode=require

NEXTAUTH_URL=https://runnote.vercel.app

# 以下のコマンドで生成した値を使用
# openssl rand -base64 32
NEXTAUTH_SECRET=<生成したランダム文字列>

AUTH_TRUST_HOST=true

# Google Cloud Consoleから取得した認証情報を設定
GOOGLE_CLIENT_ID=<your-google-client-id>

GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

**重要**: すべての環境変数を **Production**, **Preview**, **Development** に適用してください。

## 2. Google Cloud Console設定

### 承認済みのリダイレクトURIに追加

1. https://console.cloud.google.com/apis/credentials にアクセス
2. OAuth 2.0 クライアントIDを選択
3. **承認済みのリダイレクト URI** に以下を追加:

```
https://runnote.vercel.app/api/auth/callback/google
```

4. 保存

## 3. データベースマイグレーション（既に完了）

✅ ローカルで実行済み:
```bash
pnpm prisma migrate deploy
```

Neonデータベースにテーブルが作成されています。

## 4. デプロイ

### 方法1: GitHubプッシュで自動デプロイ

```bash
git add .
git commit -m "Add production configuration for Vercel deployment"
git push origin main
```

Vercelが自動的にビルド・デプロイを開始します。

### 方法2: Vercelダッシュボードから手動デプロイ

1. Vercelダッシュボードでプロジェクトを選択
2. **Deployments** タブ
3. **Redeploy** をクリック

## 5. デプロイ後の確認

### 5.1 デプロイステータス確認

Vercelダッシュボードで:
- ✅ ビルドが成功
- ✅ デプロイが完了

### 5.2 動作確認

1. https://runnote.vercel.app にアクセス
2. ホームページが表示されることを確認
3. 「始める」→「Googleでログイン」をクリック
4. Google認証が成功することを確認
5. ダッシュボードにリダイレクトされることを確認
6. プロフィール編集が動作することを確認
7. ログアウトが動作することを確認

## トラブルシューティング

### ビルドエラー

**Error: Prisma Client not generated**

→ `package.json` の `postinstall` スクリプトが実行されているか確認

**Database connection error**

→ `DATABASE_URL` 環境変数が正しく設定されているか確認

### 認証エラー

**Error: Missing required parameter: client_id**

→ `GOOGLE_CLIENT_ID` と `GOOGLE_CLIENT_SECRET` が設定されているか確認

**Redirect URI mismatch**

→ Google Cloud Consoleで `https://runnote.vercel.app/api/auth/callback/google` が登録されているか確認

### NextAuth.js エラー

**Error: NEXTAUTH_URL is not set**

→ Vercel環境変数で `NEXTAUTH_URL=https://runnote.vercel.app` が設定されているか確認

## カスタムドメインの設定（オプション）

### 1. Vercelでカスタムドメインを追加

1. Vercelダッシュボード → Settings → Domains
2. カスタムドメインを追加
3. DNSレコードを設定

### 2. 環境変数を更新

```bash
NEXTAUTH_URL=https://your-custom-domain.com
```

### 3. Google Cloud Consoleでリダイレクト URIを追加

```
https://your-custom-domain.com/api/auth/callback/google
```

## セキュリティチェックリスト

- ✅ `NEXTAUTH_SECRET` が本番用の強力なランダム文字列
- ✅ データベース認証情報が環境変数に安全に保存
- ✅ `.env` ファイルが `.gitignore` に含まれている
- ✅ Google OAuth認証情報が適切に設定
- ✅ Neon データベースの SSL が有効（`sslmode=require`）

## 定期的なメンテナンス

### データベースバックアップ

Neon では自動バックアップが有効です。
Neonダッシュボードで確認: https://console.neon.tech/

### マイグレーション

新しいマイグレーションを追加した場合:

```bash
# ローカルでマイグレーションを作成
pnpm prisma migrate dev --name <migration-name>

# 本番環境にデプロイ
pnpm prisma migrate deploy

# Gitにコミット・プッシュ
git add .
git commit -m "Add new migration"
git push
```

Vercelが自動的に再デプロイします。

## サポート

問題が発生した場合:

1. Vercelのビルドログを確認
2. ブラウザのコンソールでエラーを確認
3. Neonデータベースの接続状態を確認

---

更新日: 2026-01-25
