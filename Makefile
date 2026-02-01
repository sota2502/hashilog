.PHONY: help up down logs restart db-connect db-shell db-migrate db-push db-reset db-studio dev build install

# デフォルトターゲット: ヘルプを表示
help:
	@echo "利用可能なコマンド:"
	@echo ""
	@echo "Docker操作:"
	@echo "  make up          - PostgreSQLコンテナを起動"
	@echo "  make down        - PostgreSQLコンテナを停止"
	@echo "  make logs        - PostgreSQLのログを表示"
	@echo "  make restart     - PostgreSQLコンテナを再起動"
	@echo ""
	@echo "PostgreSQL接続:"
	@echo "  make db-connect  - psqlでPostgreSQLに接続"
	@echo "  make db-shell    - psqlシェル起動（db-connectのエイリアス）"
	@echo ""
	@echo "Prisma操作:"
	@echo "  make db-migrate  - Prismaマイグレーションを実行"
	@echo "  make db-push     - Prismaスキーマを同期"
	@echo "  make db-reset    - データベースをリセット"
	@echo "  make db-studio   - Prisma Studioを起動"
	@echo ""
	@echo "開発操作:"
	@echo "  make dev         - Next.js開発サーバーを起動"
	@echo "  make build       - プロジェクトをビルド"
	@echo "  make install     - 依存関係をインストール"

# Docker操作
up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f postgres

restart:
	docker-compose restart postgres

# PostgreSQL接続
db-connect:
	docker exec -it hashilog-postgres psql -U postgres -d hashilog

db-shell: db-connect

# Prisma操作
db-migrate:
	pnpm prisma migrate dev

db-push:
	pnpm prisma db push

db-reset:
	pnpm prisma migrate reset

db-studio:
	pnpm prisma studio

# 開発操作
dev:
	pnpm dev

build:
	pnpm build

install:
	pnpm install
