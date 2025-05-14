require('dotenv').config();

const fs = require('fs');
const util = require('util');
const logFile = fs.createWriteStream('./logs/app.log', { flags: 'a' });
const logStdout = process.stdout;

console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
};


const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

console.log("MyFitNote app is running and logging successfully!");


// MySQL接続設定
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
  console.error('MySQL接続失敗:', err.message);
  return;
 }
  console.log('MySQL connected!');
});

// ルート表示
app.get('/', (req, res) => {

  res.send('<h1>筋トレToDo APIが起動中!!</h1>');
});

// ToDo取得
app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// ToDo追加
app.post('/todos', (req, res) => {
  const { task, reps } = req.body;
  db.query('INSERT INTO todos (task, reps) VALUES (?, ?)', [task, reps], (err, result) => {
    if (err) throw err;
    res.send('ToDo追加完了！');
  });
});

// サーバ起動
const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

