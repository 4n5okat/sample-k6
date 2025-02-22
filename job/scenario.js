/********************************************************************
 * K6シナリオ
 * シナリオを記載
 * API、共通処理、カスタムメトリクスは別ファイルに記載する
 ********************************************************************/

/*
  ******************************
  * k6 API
  * 公式ドキュメント :　https://k6.io/docs/javascript-api/
  ******************************
  *
*/
import { check } from 'k6';

/*
  ******************************
  * 外部関数
  ******************************
  * api.js : API処理群
  * common.js : 共通処理群
  * custom_metrics.js : カスタムメトリクス群
*/
import { httpGet } from './api.js';
/*
  ******************************
  * 環境変数
  ******************************
  * k6 runコマンド時に渡される環境変数を受け取る
*/
const API_DOMAIN = __ENV.API_DOMAIN || 'NotFound API_DOMAIN'; // APIドメイン
const INCREASE_VUS = Number(__ENV.INCREASE_VUS) || 'NotFound INCREASE_VUS'; // 定期的に増やす仮想ユーザー数
const MAXIMUM_VUS = Number(__ENV.MAXIMUM_VUS) || 'NotFound MAXIMUM_VUS'; // 上限仮想ユーザー数
/*
  ******************************
  * K6でVUSユニークID採番
  ******************************
  *　採番は1,2,3...
*/
const VUS_UNIQUE_ID = __VU;

/*
  ******************************
  * テスト条件
  ******************************
  *
*/
export let options = {
  stages: [
    { duration: '10s', target: INCREASE_VUS },
    { duration: '10s', target: MAXIMUM_VUS },
  ],
};

/*
  ******************************
  * 負荷試験シナリオ
  ******************************
  *
  *
  *
*/
export default function () {
  httpGet(API_DOMAIN);
  teardown();

}

/*
  ******************************
  * 負荷試験シナリオ後に実行
  ******************************
  *
  *
  *
*/
export function teardown() {
  console.log(`VUS ID ${VUS_UNIQUE_ID} Teardown function call....`);
}
