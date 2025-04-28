# ベースとなるNode.jsの公式イメージ
FROM node:18

# 作業ディレクトリを作成
WORKDIR /app

# package.json をコピーして依存関係インストール
COPY package*.json ./
RUN npm install

# アプリ本体をコピー
COPY . .

# アプリを実行
EXPOSE 80
CMD ["node", "app.js"]

