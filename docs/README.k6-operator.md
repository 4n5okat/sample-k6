# k6-operator

## 概要

- k6-operatorの利用方法

## 目次

- [k6-operator](#k6-operator)
  - [概要](#概要)
  - [目次](#目次)
  - [事前準備](#事前準備)
  - [k6-operatorのデプロイ](#k6-operatorのデプロイ)
    - [kubectlコマンド](#kubectlコマンド)
  - [参考リンク](#参考リンク)

## 事前準備

minikubeクラスタを作成してk6-operatorの実行環境を構築する

- [minikubeの環境構築](/docs/README.minikube.md)

## k6-operatorのデプロイ

~~~sh
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm upgrade k6-operator grafana/k6-operator \
  --install \
  --namespace k6-operator \
  --create-namespace
~~~

### kubectlコマンド

k6で利用する環境変数のSecretを登録する

~~~sh
kubectl apply -n k6-operator -f ./custom-resource/k6JobSecret.yml

# 登録されたかを確認する
kubectl get secret -n k6-operator k6-secret -o yaml
~~~

k6シナリオをコンフィグマップに作成する

~~~sh
kubectl create configmap -n k6-operator crocodile-stress-test --from-file ./job
~~~

k6のカスタムリソースをapplyする

※ こちらを実行することでk6の負荷試験が開始される

~~~sh
kubectl apply -n k6-operator -f ./custom-resource/k6JobCustomResource.yml
~~~

Podの状況を確認

~~~sh
kubectl get pods -n k6-operator
~~~

k6の負荷試験が完了したら下記コマンドで結果を確認できる

~~~sh
kubectl logs -n k6-operator [pod name]
~~~

カスタムリソースを削除することで次のk6負荷試験が実施可能になる

~~~sh
kubectl delete -n k6-operator -f ./custom-resource/k6JobCustomResource.yml
~~~

k6シナリオのコンフィグマップを削除する

~~~sh
kubectl delete -n k6-operator configmap crocodile-stress-test
~~~

Secretの削除

~~~sh
kubectl delete -n k6-operator secret k6-secret
~~~

## 参考リンク

- k6-operatorのインストール方法
  - [公式リポジトリ](https://github.com/grafana/k6-operator)
