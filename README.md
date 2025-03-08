# k6とk6-operatorのサンプルリポジトリ

## 概要

- k6を実行できるdockerコンテナと拡張機能のxk6-sqlのテスト実行用のMySQLとphpMyAdminのコンテナも含んでいます。
- k6-operatorが実行可能なクラスタを利用して負荷試験を実施するためのサンプルリポジトリ

## 目次

- [k6とk6-operatorのサンプルリポジトリ](#k6とk6-operatorのサンプルリポジトリ)
  - [概要](#概要)
  - [目次](#目次)
  - [共通事項](#共通事項)
  - [事前準備](#事前準備)
  - [開発環境の詳細](#開発環境の詳細)
    - [ディレクトリ構成](#ディレクトリ構成)
  - [開発の進め方](#開発の進め方)
  - [基本コマンド一覧](#基本コマンド一覧)
    - [多用コマンド](#多用コマンド)
  - [参考リンク](#参考リンク)

## 共通事項

- [採用Gitの運用ルール](/docs/README.git.md)

## 事前準備

- [開発環境構築](/docs/README.environment-building.md)

## 開発環境の詳細

### ディレクトリ構成

~~~sh
.
├── .vscode/
│   └── settings.json
├── custom-resource/
│   └── k6JobCustomResource.yml
├── docs/
│   ├── README.environment-building.md
│   ├── README.git.md
│   ├── README.make.md
│   ├── README.scoop-package.md
│   └── README.scoop.md
├── infrastructure/
│   ├── grafana/
│   │   └── Dockerfile
│   ├── influxdb/
│   │   └── Dockerfile
│   ├── k6/
│   │   └── Dockerfile
│   ├── mysql/
│   │   └── Dockerfile
│   └── phpmyadmin/
│       └── Dockerfile
├── job/
│   ├── api.js
│   ├── common.js
│   ├── custom_metrics.js
│   ├── scenario.js
│   └── sql.js
├── .dockerignore
├── .env.example
├── .gitignore
├── compose.yml
├── Makefile
└── README.md
~~~

## 開発の進め方

1. k6コンテナでシナリオを開発して実行する。
   1. [k6コンテナ](/docs/README.k6.md)
2. シナリオが問題なければコンテナイメージを作成する。
   1. [k6コンテナ](/docs/README.k6.md)
3. k6-operatorを利用してk8s上で負荷試験を実施する
   1. [k6-operator](/docs/README.k6-operator.md)

## 基本コマンド一覧

- [Makeコマンド一覧](/docs/README.make.md)

### 多用コマンド

~~~sh
# git clone後に初期起動するときのコマンド
make first-up-build

# make first-up-buildを実行した後で再度コンテナ起動したい場合のコマンド
make up

# コンテナログを確認するときのコマンド
make logs-f

# compose.ymlに記載しているサービスのコンテナの停止・削除したい場合のコマンド
make down

# compose.ymlに記載している不要なイメージ、ボリュームなどを削除したい場合のコマンド
make down-rmi

# 全体的な不要なリソースの完全削除するコマンド
make down-all
~~~

## 参考リンク

- [k6公式リポジトリ](https://github.com/grafana/k6)
- [xk6-sql公式リポジトリ](https://github.com/grafana/xk6-sql)
- [xk6-sql-driver-mysql公式リポジトリ](https://github.com/grafana/xk6-sql-driver-mysql)
