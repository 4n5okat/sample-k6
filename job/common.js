/********************************************************************
 * K6
 * 共通処理を記載
 ********************************************************************/

/*
  ******************************
  * k6 API
  * 公式ドキュメント : https://k6.io/docs/javascript-api/
  ******************************
  *
*/

/*
  ******************************
  * 外部 API
  ******************************
  *
*/
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

/*
  ******************************
  * currentUnixTimeStamp
  ******************************
  * 現在のUnixTimeStampを返却する
  * @return unixtimestamp
  *
*/
export function currentUnixTimeStamp() {
  const currentUnixTimeStamp = new Date().getTime();
  return currentUnixTimeStamp;
}

/*
  ******************************
  * createUuid
  ******************************
  * uuidを生成して返却する
  * @return uuid
  *
*/
export function createUuid() {
  const uuid = uuidv4();
  return uuid;
}

/*
  ******************************
  * getRandomElement
  ******************************
  * ランダムに要素を選択する関数
  * 引数で配列を渡す
  * 配列例 const hoge = [ 'hoge1','hoge2', 'hoge3', 'hoge4' ];
  * @return 配列要素の一つをランダムで返却
*/
export function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/*
  ******************************
  * executionRandomFunc
  ******************************
  * 引数で指定した確率でboolを返却する
  * ランダムで関数を実行したい時などに使用
  * @return bool
*/
export function executionRandomFunc(probability) {
  const randomValue = Math.random();
  const floatProbability = convertToNormalizedValue(probability);
  if (randomValue <= floatProbability) {
    return true;
  }
  return false;
}

/*
  ******************************
  * convertToNormalizedValue
  ******************************
  * INT
  * %をfloatに変換するして値を返却する ※100%の時のみ1
  * @return float or 1
*/
function convertToNormalizedValue(value) {
  if (value < 100) {
    return value / 100;
  } else {
    return 1;
  }
}

/*
  ******************************
  *
  ******************************
  *
  *
  *
*/
