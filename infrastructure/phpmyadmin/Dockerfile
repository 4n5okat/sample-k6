# dockerfileはマルチステージビルドを利用します。
# docker composeまたはdocker buildするときに、(--target development, --target builder, --target staging, --target production)でビルドステージを指定することができます。
## ベースイメージの作成
FROM phpmyadmin:5.2.1-apache AS base

## 開発環境のビルド
FROM base AS development
