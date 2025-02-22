/********************************************************************
 * K6
 * APIでの処理を記載
 ********************************************************************/

/*
  ******************************
  * k6 API
  * 公式ドキュメント : https://k6.io/docs/javascript-api/
  ******************************
  *
*/
import { check } from 'k6';
import http from 'k6/http';

/*
  ******************************
  * 外部関数
  ******************************
  * common.js : 共通処理群
  * custom_metrics.js : カスタムメトリクス群
*/
import { currentUnixTimeStamp } from './common.js';
import {
  customMetricsCounter,
  customMetricsGauge,
  customMetricsRate,
  customMetricsTrend
} from './custom_metrics.js';

/*
  ******************************
  * 環境変数
  ******************************
  * k6 runコマンド時に渡される環境変数を受け取る
*/


/*
  ******************************
  *
  ******************************
  *
  *
  *
*/
export function httpGet(API_DOMAIN) {
  check(http.get(API_DOMAIN), {
    "status[200]": (res) => res.status == 200
  });
  const datetime = currentUnixTimeStamp();
  console.log(datetime + " http req timestamp");
}

/*
  ******************************
  *
  ******************************
  *
  *
  *
*/

/*
  ******************************
  *
  ******************************
  *
  *
  *
*/

/*
  ******************************
  *
  ******************************
  *
  *
  *
*/
