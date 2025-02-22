# k6とk6 operatorのサンプルリポジトリ

## 概要

- k6を実行できるdockerコンテナと拡張機能のxk6-sqlのテスト実行用のMySQLとphpMyAdminのコンテナも含んでいます。
- k6-operatorが実行可能なクラスタを利用して負荷試験を実施するためのサンプルリポジトリ

## 目次

- [k6とk6 operatorのサンプルリポジトリ](#k6とk6-operatorのサンプルリポジトリ)
  - [概要](#概要)
  - [目次](#目次)
  - [共通事項](#共通事項)
  - [事前準備](#事前準備)
    - [minikube環境構築](#minikube環境構築)
  - [開発環境の詳細](#開発環境の詳細)
    - [ディレクトリ構成](#ディレクトリ構成)
    - [minikubeでk6 operatorを利用する方法](#minikubeでk6-operatorを利用する方法)
  - [開発の進め方](#開発の進め方)
  - [基本コマンド一覧](#基本コマンド一覧)
    - [多用コマンド](#多用コマンド)
  - [k6コンテナ](#k6コンテナ)
  - [k6 operator](#k6-operator)
    - [kubectl](#kubectl)
  - [参考リンク](#参考リンク)

## 共通事項

- [採用Gitの運用ルール](/docs/README.git.md)

## 事前準備

- [開発環境構築](/docs/README.environment-building.md)

### minikube環境構築

ローカルでテストするためにminikube環境で実施する方法(インストールはhomebrew等をご利用ください)

minikubeの開始

~~~sh
minikube start --driver=docker --cpus 4 --memory 4096
~~~

minikubeステータス

~~~sh
minikube status
~~~

minikubeのダッシュボードの有効化

~~~sh
minikube dashboard
~~~

minikubeのIPを調べる

~~~sh
minikube ip
~~~

minikubeクラスタの停止

~~~sh
minikube stop
~~~

minikubeクラスタの削除

~~~sh
minikube delete
~~~

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

### minikubeでk6 operatorを利用する方法

minikubeでクラスタを作成してhelmでk6-operatorをインストール。

k6-operatorのインストール方法[公式リポジトリ](https://github.com/grafana/k6-operator)

## 開発の進め方

1. k6コンテナでシナリオを開発して実行する。
2. シナリオが問題なければコンテナイメージを作成する。
3. k6 operatorを利用してk8s上で負荷試験を実施する

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

## k6コンテナ

k6のシナリオ内の環境変数

- API_DOMAIN : シナリオ内のAPIエンドポイントのFQDN
- INCREASE_VUS : シナリオ人数
- MAXIMUM_VUS : シナリオ人数

~~~sh
API_DOMAIN=https://test-api.k6.io/
INCREASE_VUS=10
MAXIMUM_VUS=10
~~~

負荷試験結果のinfluxDBへの送信のための環境変数

- K6_INFLUXDB_ORGANIZATION : InfluxDB2.xで設定できるオーガニゼーションの値
- K6_INFLUXDB_BUCKET : バケット名
- K6_INFLUXDB_TOKEN : APIトークン(InfluxDB2.xでコンパネやdocker-compose.yml等でデフォルトを作成できる)
- XK6_INFLUXDB : InfluxDBのURL 例)http://0.0.0.0:28086

~~~sh
K6_INFLUXDB_ORGANIZATION=k6db
K6_INFLUXDB_BUCKET=k6db
K6_INFLUXDB_TOKEN=admin-token
XK6_INFLUXDB=http://influxdb2-sample:8086
~~~

k6のサンプルhttp getシナリオの実行

~~~sh
make k6-http API_DOMAIN=${API_DOMAIN} INCREASE_VUS=${INCREASE_VUS} MAXIMUM_VUS=${MAXIMUM_VUS} K6_INFLUXDB_ORGANIZATION=${K6_INFLUXDB_ORGANIZATION} K6_INFLUXDB_BUCKET=${K6_INFLUXDB_BUCKET} K6_INFLUXDB_TOKEN=${K6_INFLUXDB_TOKEN} XK6_INFLUXDB=${XK6_INFLUXDB}
~~~

xk6-sqlの拡張機能を利用してSQLへの負荷試験のサンプルを実行

~~~sh
make k6-sql K6_INFLUXDB_ORGANIZATION=${K6_INFLUXDB_ORGANIZATION} K6_INFLUXDB_BUCKET=${K6_INFLUXDB_BUCKET} K6_INFLUXDB_TOKEN=${K6_INFLUXDB_TOKEN} XK6_INFLUXDB=${XK6_INFLUXDB}
~~~

k6-operatorのrunnerとしてカスタムイメージを利用したい際にコンテナイメージ作成を実行 \

- DOCKER_HUB_USER_NAME : Docker HubのUser name
- DOCKER_HUB_REP : Docker Hubでのリポジトリ名
- IMAGE_TAG : イメージタグ 例)1.0.0

~~~sh
DOCKER_HUB_USER_NAME=
DOCKER_HUB_REP=
IMAGE_TAG=

make dh-image-push DOCKER_HUB_USER_NAME=${DOCKER_HUB_USER_NAME} DOCKER_HUB_REP=${DOCKER_HUB_REP} IMAGE_TAG=${IMAGE_TAG}
~~~

## k6 operator

### kubectl

ネームスペースの作成

~~~sh
kubectl create ns k6-test
~~~

k6で利用する環境変数のSecretを登録する

~~~sh
kubectl apply -f ./custom-resource/k6JobSecret.yml -n k6-test

# 登録されたかを確認する
kubectl get secret k6-secret -o yaml
~~~

k6シナリオをコンフィグマップに作成する

~~~sh
kubectl create configmap crocodile-stress-test --from-file ./job -n k6-test
~~~

k6のカスタムリソースをapplyする

※ こちらを実行することでk6の負荷試験が開始される

~~~sh
kubectl apply -f ./custom-resource/k6JobCustomResource.yml -n k6-test
~~~

Podの状況を確認

~~~sh
kubectl get pods -n k6-test
~~~

k6の負荷試験が完了したら下記コマンドで結果を確認できる

~~~sh
kubectl logs [pod name]  -n k6-test
~~~

カスタムリソースを削除することで次のk6負荷試験が実施可能になる

~~~sh
kubectl delete -f ./custom-resource/k6JobCustomResource.yml -n k6-test
~~~

k6シナリオのコンフィグマップを削除する

~~~sh
kubectl delete -n k6-test configmap crocodile-stress-test
~~~

Secretの削除

~~~sh
kubectl delete secret k6-secret  -n k6-test
~~~

## 参考リンク

- [k6公式リポジトリ](https://github.com/grafana/k6)
- [xk6-sql公式リポジトリ](https://github.com/grafana/xk6-sql)
- [xk6-sql-driver-mysql公式リポジトリ](https://github.com/grafana/xk6-sql-driver-mysql)
