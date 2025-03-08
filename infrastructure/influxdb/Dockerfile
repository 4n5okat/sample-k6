# dockerfileはマルチステージビルドを利用します。
# docker composeまたはdocker buildするときに、(--target development, --target builder, --target staging, --target production)でビルドステージを指定することができます。
## ベースイメージの作成
FROM influxdb:2.7.5-alpine AS base

## 開発環境のビルド
FROM base AS development
