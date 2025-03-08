# minikube環境構築

## 概要

- minikubeの構築方法を記載。

## 目次

- [minikube環境構築](#minikube環境構築)
  - [概要](#概要)
  - [目次](#目次)
  - [事前準備](#事前準備)
  - [minikube構築手順](#minikube構築手順)
    - [minikubeをインストールする](#minikubeをインストールする)
    - [minikubeクラスタの操作](#minikubeクラスタの操作)

## 事前準備

- [Homebrewのインストール方法](/docs/README.environment-building.md)

## minikube構築手順

### minikubeをインストールする

~~~sh
brew install minikube
~~~

### minikubeクラスタの操作

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
