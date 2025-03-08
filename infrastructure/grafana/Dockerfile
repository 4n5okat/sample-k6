# dockerfileはマルチステージビルドを利用します。
# docker composeまたはdocker buildするときに、(--target development, --target builder, --target staging, --target production)でビルドステージを指定することができます。
## ベースイメージの作成
FROM grafana/grafana-oss:10.3.5-ubuntu AS base

## 開発環境のビルド
FROM base AS development
