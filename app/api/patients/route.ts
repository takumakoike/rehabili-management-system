import { Database } from "sqlite3";
import path from "path";
import { NextRequest } from "next/server";

// SQLiteデータベースを設定
const dbPath = path.resolve(process.cwd(), "database.sqlite");
const db = new Database(dbPath);

// 初回起動時にテーブルを作成
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patientname TEXT NOT NULL,
            affectedside TEXT NOT NULL,
            affectedpart TEXT NOT NULL,
            diagnosis TEXT NOT NULL
        )
        `, (err) => {
            if(err) {
                console.error(`テーブル作成時にエラーが起きました：${err}`)

            } else {
                console.log("患者テーブルの作成に成功しました")
        }
    })
});

// GET関数でクライアントからのリクエストを処理
export async function GET(request: NextRequest) {
    // どんなリクエストがあったかログ出力しておく
    console.log(request.body);

    // Promiseオブジェクトを返すことで、クライアントサイドでデータを参照できる
    return new Promise<Response>((resolve, reject) => {
        // データベースの該当テーブルを取得
        db.all("SELECT * FROM patients", [], (err, rows) => {
            if(err){
                console.error(`Database Error: ${err}`);
                reject(new Response(JSON.stringify({error: "DatabaseのGETエラー"}), {status: 500}))
            } else {
                resolve(new Response(JSON.stringify(rows), {status: 200, headers: {"Content-Type": "application/json"}}));
            }
        })
    })   
}

// POST関数でサーバーへのレスポンス返却について処理
export async function POST(request:NextRequest) {
    // どんなリクエストなのかログに残す
    console.log(request.body);

    // 取得した内容をJSONオブジェクトにして定数に渡す
    const {patientname, affectedside, affectedpart, diagnosis} = await request.json();
    return new Promise<Response>((resolve, reject) => {
        db.run(
            'INSERT INTO patients (patientname, affectedside, affectedpart, diagnosis) VALUES (?, ?, ?, ?)',
            [patientname, affectedside, affectedpart, diagnosis], 
            function (err) {
                if(err){
                    reject(new Response(JSON.stringify({error: "データベースエラー"}), {status: 500}))
                } else {
                    resolve(new Response(JSON.stringify({
                        id: this.lastID,
                        patientname, 
                        affectedside, 
                        affectedpart, 
                        diagnosis
                    }), {status: 201, headers: {"Content-Type": "application/json"}}))
                }
        })
    })
}

// DELETE関数で患者テーブルにある情報を削除する
export async function DELETE(request: NextRequest){
    console.log(request.body);
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");

    return new Promise<Response>((resolve, reject) => {
        if(!id){
            resolve(new Response(JSON.stringify({error: "IDが含まれていません"}), {status: 400}));
            return;
        }

        db.run("DELETE FROM patients WHERE id = ?", [id], function(err){
            if(err){
                reject(new Response(JSON.stringify({error: "データベースのエラーです"}), {status: 500}))
            } else {
                resolve(new Response(JSON.stringify({success: true}), {status: 200}))
            }
        })
        

    }) 

}