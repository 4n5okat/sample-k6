# コマンドリスト

#####################################################
## Dockerコマンド
#####################################################

#----------------------------------------------------
### コンテナ起動・作成系
#----------------------------------------------------

#### git clone後に初期起動するときのコマンド
first-up-build:
	cp .env.example .env
	docker compose up -d

#### サービスのビルドを実行します。
build:
	docker compose build

#### サービスのビルドからコンテナ作成、起動までをバックグランドで行います。
build-up:
	docker compose up -d --build

#### コンテナを作成して、起動します。オプションで-dをつけることでバックグラウンドで実行することができます。
up:
	docker compose up -d

#### 構築されたサービスを参考にそのコンテナを作ります。
create:
	docker compose create

#### コンテナを再起動します。
restart:
	docker compose restart

#----------------------------------------------------
### コンテナ停止・削除系
#----------------------------------------------------

#### compose.ymlに書かれているサービスを参考にコンテナを停止し、そのコンテナとネットワークを削除します。
down:
	docker compose down

#### compose.ymlに書かれているサービスを参考に停止中のコンテナを削除します。
rm:
	docker compose rm

#### compose.ymlに書かれているサービスを参考にコンテナ、イメージ、ボリューム、ネットワークそして未定義コンテナ、全てを一括消去するコマンド
down-rmi:
	docker compose down --rmi all --volumes --remove-orphans

#### 全ての未使用なコンテナ, イメージ, ボリューム、ネットワークを一括削除
down-all:
	docker system prune --volumes

#----------------------------------------------------
### コンテナ操作系
#----------------------------------------------------

#### コンテナを強制停止します。
kill:
	docker compose kill

#### サービスを開始します。これは既にコンテナがある状態でなければなりません。
start:
	docker compose start

#### サービスを停止します。
stop:
	docker compose stop

#### サービスを一旦停止します。
#### (一時停止したサービスは強制削除、強制開始ができずunpauseをしてからでないと作業ができなくなるので注意してください。)
pause:
	docker compose pause

#### サービスの再開をします。pauseしている状態から復帰するのですが、pauseしている状態から復帰するにはこのコマンドが必要です。
unpause:
	docker compose unpause

#----------------------------------------------------
### コンテナ情報系
#----------------------------------------------------

#### サービスのログを出力します。
logs:
	docker compose logs

#### サービスのログをリアルタイムに出力します。
logs-f:
	docker compose logs -f

#### コンテナの一覧を表示します。
ps:
	docker compose ps

#### 各コンテナのプロセス情報を表示します。
top:
	docker compose top

#### compose.ymlで書かれてる内容が表示されます。
config:
	docker compose config

#### コンテナからのイベントを受信します。
events:
	docker compose events

#----------------------------------------------------
### Docker補助/etc系
#----------------------------------------------------

#### コマンドの一覧を表示します。
help:
	docker compose help

#### docker composeのバージョンを表示します。
version:
	docker compose version

#### DAB(Distributed Application Bundles)を作成します。
#### これは事前に作成したイメージをdockerのregistryにpushしておく必要があります(ローカルにpushでも可)
bundle:
	docker compose bundle

#### 対象のイメージの情報を表示します。
images:
	docker compose images

#### サービスのイメージをプルしてきます。
pull:
	docker compose pull

#----------------------------------------------------
### container
#----------------------------------------------------

#### influxDBコンテナにログイン
# コンテナログイン後に下記コマンドを実行するとinfluxDBをコマンドラインで操作できる。
# influx
influxdb-login:
	docker compose exec influxdb2 bash

#### Grafanaコンテナにログイン
grafana-login:
	docker compose exec grafana bash

#### k6コマンド群
# InfluxDBの設定に関しては作成したものに合わせてください。
# 環境変数群
API_DOMAIN ?=
K6_INFLUXDB_ORGANIZATION ?=
K6_INFLUXDB_BUCKET ?=
K6_INFLUXDB_TOKEN ?=
XK6_INFLUXDB ?=

# k6負荷テスト API
k6-http:
	docker compose run --rm -T \
	k6-container run \
	-e API_DOMAIN=${API_DOMAIN} \
	-e K6_INFLUXDB_ORGANIZATION=${K6_INFLUXDB_ORGANIZATION} \
	-e K6_INFLUXDB_BUCKET=${K6_INFLUXDB_BUCKET} \
	-e K6_INFLUXDB_TOKEN=${K6_INFLUXDB_TOKEN} \
	-o xk6-influxdb=${XK6_INFLUXDB} \
	/job/scenario.js

# k6負荷テスト SQL
k6-sql:
	docker compose run --rm -T \
	k6-container run \
	-e K6_INFLUXDB_ORGANIZATION=${K6_INFLUXDB_ORGANIZATION} \
	-e K6_INFLUXDB_BUCKET=${K6_INFLUXDB_BUCKET} \
	-e K6_INFLUXDB_TOKEN=${K6_INFLUXDB_TOKEN} \
	-o xk6-influxdb=${XK6_INFLUXDB} \
	/job/sql.js

#### docker pushコマンド
# k6-operatorで利用するカスタムイメージをDocker Hubにプッシュする。 ※ プッシュする前にローカルで利用したイメージを移植しておくこと
# コマンド例　 make dh-image-push DOCKER_HUB_USER_NAME=hogehoge DOCKER_HUB_REP=fugafuga IMAGE_TAG=teketeke
DOCKER_HUB_USER_NAME ?=
DOCKER_HUB_REP ?=
IMAGE_TAG ?=
dh-image-push:
	docker build --platform linux/amd64 -f ./infrastructure/k6/Dockerfile -t "${DOCKER_HUB_USER_NAME}/${DOCKER_HUB_REP}:${IMAGE_TAG}" .
	docker push "${DOCKER_HUB_USER_NAME}/${DOCKER_HUB_REP}:${IMAGE_TAG}"
