/********************************************************************
 * K6
 * カスタムメトリクスを記載
 ********************************************************************/

/*
  ******************************
  * k6 API/metrics
  * 公式ドキュメント : https://k6.io/docs/javascript-api/k6-metrics/
  ******************************
  * Counter : A metric that cumulatively sums added values.
  * Gauge : A metric that stores the min, max and last values added to it.
  * Rate : A metric that tracks the percentage of added values that are non-zero.
  * Trend : A metric that calculates statistics on the added values (min, max, average, and percentiles).
*/
import { Counter, Gauge, Rate, Trend } from 'k6/metrics';

/*
  ******************************
  * customMetricsCounter
  ******************************
  *
  * @return customMetricsCounterのインスタンスを返却
  *
*/
export function customMetricsCounter(metricsName) {
  return new Counter(metricsName);
}

/*
  ******************************
  * customMetricsGauge
  ******************************
  *
  * @return customMetricsGaugeのインスタンスを返却
  *
*/
export function customMetricsGauge(metricsName) {
  return new Gauge(metricsName);
}

/*
  ******************************
  * customMetricsRate
  ******************************
  *
  * @return customMetricsRateのインスタンスを返却
  *
*/
export function customMetricsRate(metricsName) {
  return new Rate(metricsName);
}

/*
  ******************************
  * customMetricsTrend
  ******************************
  *
  * @return customMetricsTrendのインスタンスを返却
  *
*/
export function customMetricsTrend(metricsName, isTime = false) {
  return new Trend(metricsName, isTime);
}

/*
  ******************************
  *
  ******************************
  *
  *
  *
*/
