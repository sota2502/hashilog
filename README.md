# RunNote - ランニング記録アプリ

毎日のランニングデータを記録し、統計を可視化するWebアプリケーションです。

## 技術スタック

- **フレームワーク**: Next.js 16.1.4 (App Router)
- **言語**: TypeScript
- **データベース**: PostgreSQL 16
- **ORM**: Prisma 7.3.0
- **認証**: NextAuth.js v5 (Auth.js)
- **UI**: Material-UI (MUI) 7.x
- **状態管理**: React Context + useState
- **デプロイ**: Vercel

## 機能

### Step 1 (実装済み)

- ✅ Google認証でのログイン/ログアウト
- ✅ ユーザー登録
- ✅ プロフィール編集（ニックネーム設定）

### Step 2 (予定)

- ランニング記録の入力・編集・削除
- 記録の一覧表示・検索・フィルタリング

### Step 3 (予定)

- 統計・グラフ表示（月間距離、ペース推移など）

### Step 4 (予定)

- 目標設定・進捗管理

## 環境構築

### 必要な環境

- Node.js 20.19+ / 22.12+ / 24.0+
- Docker & Docker Compose
- pnpm

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd runnote
```

### 2. 依存パッケージのインストール

```bash
pnpm install
```

### 3. 環境変数の設定

`.env.local` をコピーして `.env` を作成し、必要な値を設定します:

```bash
cp .env.local .env
```

#### Google OAuth認証情報の取得

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) にアクセス
2. プロジェクトを作成または選択
3. 「認証情報」→「認証情報を作成」→「OAuth クライアント ID」
4. アプリケーションの種類: Webアプリケーション
5. 承認済みのリダイレクトURI: `http://localhost:3000/api/auth/callback/google`
6. クライアントIDとクライアントシークレットを `.env` に設定

```.env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. データベースの起動

Docker Composeを使用してPostgreSQLを起動します:

```bash
docker compose up -d
```

データベースの状態を確認:

```bash
docker compose ps
```

### 5. データベースのマイグレーション

Prismaのマイグレーションを実行してテーブルを作成します:

```bash
pnpm prisma migrate dev
```

### 6. 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 開発コマンド

### 開発サーバー

```bash
pnpm dev
```

### ビルド

```bash
pnpm build
```

### 本番モード起動

```bash
pnpm start
```

### リント

```bash
pnpm lint
```

### Prismaコマンド

```bash
# Prisma Studioを起動（データベースGUI）
pnpm prisma studio

# マイグレーションを作成
pnpm prisma migrate dev --name <migration-name>

# Prisma Clientを再生成
pnpm prisma generate

# データベースをスキーマと同期（開発用）
pnpm prisma db push
```

### Dockerコマンド

```bash
# データベースを起動
docker compose up -d

# データベースを停止
docker compose down

# データベースを停止してボリュームも削除
docker compose down -v

# ログを確認
docker compose logs postgres

# コンテナに接続
docker compose exec postgres psql -U postgres -d runnote
```

## プロジェクト構成

```
runnote/
├── prisma/
│   ├── schema.prisma          # Prismaスキーマ定義
│   └── migrations/            # マイグレーションファイル
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # APIルート
│   │   │   ├── auth/         # NextAuth.js認証
│   │   │   └── user/         # ユーザー関連API
│   │   ├── dashboard/        # ダッシュボードページ
│   │   ├── login/            # ログインページ
│   │   ├── profile/          # プロフィールページ
│   │   ├── layout.tsx        # ルートレイアウト
│   │   └── page.tsx          # ホームページ
│   ├── components/           # Reactコンポーネント
│   │   ├── layout/           # レイアウトコンポーネント
│   │   ├── profile/          # プロフィール関連
│   │   └── providers/        # Context Providers
│   ├── lib/                  # ライブラリ・ユーティリティ
│   │   ├── auth.ts           # NextAuth設定
│   │   └── prisma.ts         # Prismaクライアント
│   ├── theme/                # MUIテーマ設定
│   └── types/                # TypeScript型定義
├── docker-compose.yml        # Docker Compose設定
├── .env.example              # 環境変数のサンプル
└── README.md
```

## データベーススキーマ

### User

- id: String (CUID)
- email: String (ユニーク)
- name: String?
- nickname: String?
- image: String?
- emailVerified: DateTime?

### Account (NextAuth.js)

- OAuth認証情報

### Session (NextAuth.js)

- セッション情報

### VerificationToken (NextAuth.js)

- メール認証トークン

## トラブルシューティング

### データベース接続エラー

```bash
# コンテナが起動しているか確認
docker compose ps

# ログを確認
docker compose logs postgres

# コンテナを再起動
docker compose restart postgres
```

### マイグレーションエラー

```bash
# データベースをリセット（データが消えます）
pnpm prisma migrate reset

# マイグレーションを再実行
pnpm prisma migrate dev
```

### Next.jsビルドエラー

```bash
# node_modulesとキャッシュをクリア
rm -rf node_modules .next
pnpm install
pnpm dev
```

## デプロイ

### Vercelへのデプロイ

1. Vercelにプロジェクトをインポート
2. 環境変数を設定:
   - `DATABASE_URL`: 本番PostgreSQLの接続URL
   - `NEXTAUTH_URL`: 本番URLを設定
   - `NEXTAUTH_SECRET`: ランダムな秘密鍵を生成 (`openssl rand -base64 32`)
   - `GOOGLE_CLIENT_ID`: Google OAuth Client ID
   - `GOOGLE_CLIENT_SECRET`: Google OAuth Client Secret
3. Google Cloud ConsoleでリダイレクトURIを追加:
   - `https://your-domain.vercel.app/api/auth/callback/google`

### データベース

本番環境では以下のいずれかを推奨:

- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)
- [Neon](https://neon.tech/)

## ライセンス

MIT
