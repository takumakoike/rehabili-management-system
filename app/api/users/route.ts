// app/api/users/route.ts
import { Database } from 'sqlite3';
import path from 'path';

// SQLite データベースファイルを指定
const dbPath = path.resolve(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// 初回起動時にusersテーブルを作成
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL
        )
        `, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Users table initialized');
        }
        });
    });
    

export async function GET(_request: Request) {
    return new Promise<Response>((resolve, reject) => {
        db.all('SELECT * FROM users', [], (err, rows) => {
            if (err) {
                console.error('Database error in GET:', err);
                reject(new Response(JSON.stringify({ error: 'Database error in GET' }), { status: 500 }));
            } else {
                resolve(new Response(JSON.stringify(rows), { status: 200, headers: { 'Content-Type': 'application/json' } }));
            }
        });
    });
}

export async function POST(request: Request) {
    console.log("リクエスト",request.body);
    const { username, email } = await request.json();
    return new Promise<Response>((resolve, reject) => {
        db.run(
        'INSERT INTO users (username, email) VALUES (?, ?)',
        [username, email],
        function (err) {
            if (err) {
            reject(new Response(JSON.stringify({ error: 'Database error' }), { status: 500 }));
            } else {
            resolve(
                new Response(
                JSON.stringify({ id: this.lastID, username, email }),
                { status: 201, headers: { 'Content-Type': 'application/json' } }
                )
            );
            }
        }
        );
    });
    }
