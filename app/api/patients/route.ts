import { Database } from "sqlite3";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

// SQLiteデータベースを設定
const dbPath = path.resolve(process.cwd(), "database.sqlite");
const db = new Database(dbPath);

// 初回起動時にテーブルを作成
db.serialize(() => {
    db.run(`
        
        `)
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
    const {} = await request.json();
}