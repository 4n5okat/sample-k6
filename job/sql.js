// k6 API
import { check, sleep } from 'k6';

// xk6-sqlを利用
import sql from 'k6/x/sql';
import driver from "k6/x/sql/driver/mysql";

// MySQLの設定
const mysqlHost = 'mysql';
const mysqlPort = 13306;
const mysqlUser = 'docker';
const mysqlPass = 'docker';
const mysqlDb = 'sample_db';

/*
  ******************************
  * K6でVUSユニークID採番
  ******************************
  * 採番は1,2,3...
*/
const VUS_UNIQUE_ID = __VU;

// 条件
export let options = {
  stages: [
    { duration: '10s', target: 10 },
    // { duration: '10s', target: 100 }, // 1000人で1分間テストを実行する
  ],
};

// MySQL接続
const db = sql.open(
  driver,
  `${mysqlUser}:${mysqlPass}@tcp(${mysqlHost}:${mysqlPort})/${mysqlDb}`
);

// k6シナリオ開始前の処理
export function setup() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS user (
      id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user_name VARCHAR(50) NOT NULL
    );
  `);
}

// k6シナリオ終了後の処理
export function teardown() {
  db.close();
}

// k6シナリオ
export default function () {
  const userName = `user_${VUS_UNIQUE_ID}`;

  const insertResult = db.exec(`INSERT INTO user (user_name) VALUES(?);`, userName);

  // console.log(insertResult);
  // check(insertResult, {
  //   'INSERT successful': (insertResult) => insertResult.affectedRows == 1
  // });
  // if (insertResult.affectedRows !== 1) {
  //   console.error(`Failed to insert ${userName}`);
  //   return;
  // }

  const results = db.query("SELECT * FROM user WHERE user_name = ?;", userName);

  for (const row of results) {
    check(results, {
      'select successful': (results) => String.fromCharCode(...row.user_name) == userName
    });
  }
  sleep(1);
}
