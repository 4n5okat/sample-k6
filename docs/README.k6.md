# k6コンテナ

## 概要

- ローカルでk6コンテナを実行したり、k6-operatorのrunnerとして利用するイメージの作成ができる

## 目次

- [k6コンテナ](#k6コンテナ)
  - [概要](#概要)
  - [目次](#目次)
  - [k6コンテナの利用方法](#k6コンテナの利用方法)
  - [k6-operatorのrunner用イメージの作成](#k6-operatorのrunner用イメージの作成)
  - [参考リンク](#参考リンク)

## k6コンテナの利用方法

k6のシナリオ内の環境変数

- API_DOMAIN : シナリオ内のAPIエンドポイントのFQDN

~~~sh
API_DOMAIN=https://test-api.k6.io/
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
make k6-http API_DOMAIN=${API_DOMAIN} K6_INFLUXDB_ORGANIZATION=${K6_INFLUXDB_ORGANIZATION} K6_INFLUXDB_BUCKET=${K6_INFLUXDB_BUCKET} K6_INFLUXDB_TOKEN=${K6_INFLUXDB_TOKEN} XK6_INFLUXDB=${XK6_INFLUXDB}
~~~

xk6-sqlの拡張機能を利用してSQLへの負荷試験のサンプルを実行

~~~sh
make k6-sql K6_INFLUXDB_ORGANIZATION=${K6_INFLUXDB_ORGANIZATION} K6_INFLUXDB_BUCKET=${K6_INFLUXDB_BUCKET} K6_INFLUXDB_TOKEN=${K6_INFLUXDB_TOKEN} XK6_INFLUXDB=${XK6_INFLUXDB}
~~~

## k6-operatorのrunner用イメージの作成

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

## 参考リンク

- [k6公式リポジトリ](https://github.com/grafana/k6)
- [xk6-sql公式リポジトリ](https://github.com/grafana/xk6-sql)
- [xk6-sql-driver-mysql公式リポジトリ](https://github.com/grafana/xk6-sql-driver-mysql)
