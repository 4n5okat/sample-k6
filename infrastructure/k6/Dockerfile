# dockerfileはマルチステージビルドを利用します。
## k6-operatorでも利用できるようにカスタムイメージを作成
FROM golang:1.23 as builder

# k6の拡張機能のライブラリ管理
RUN go install go.k6.io/xk6/cmd/xk6@latest

# k6の拡張機能
RUN xk6 build \
    --with github.com/grafana/xk6-output-influxdb@latest \
    --with github.com/grafana/xk6-sql@latest \
    --with github.com/grafana/xk6-sql-driver-mysql \
    --with github.com/LeonAdato/xk6-output-statsd \
    --output /k6

# k6-operatorのベースイメージを使用してk6バイナリをオーバーライドする
FROM grafana/k6:latest
COPY --from=builder /k6 /usr/bin/k6
