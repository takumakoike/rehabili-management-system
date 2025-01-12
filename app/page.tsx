"use client";
// import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderComponents } from "./components/Headers";

// ユーザーの型を定義
interface User {
  id: number;
  username: string;
  email: string;
}

export default function Home() {
  // useState に型を指定
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
      const fetchData = async () => {
        const res = await fetch("./api/users/");
        const data = await res.json();
        setUsers(data);
      };

      fetchData();
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("./api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",      
      },
      body: JSON.stringify({username, email}),

    });

    if(res.ok){
      const data = await res.json();
      console.log("user created:", data);

      setUsers((prevUsers) => [...prevUsers, data]);
      setUsername("");
      setEmail("");

    } else {
      console.error("ユーザーの作成に失敗")
    }

  };

  return (
    <div className="container w-11/12 mx-auto py-4">
        <HeaderComponents />

        <div className="mainContents">
          <table className="mb-10">
            <thead className="bg-blue-300">
              <tr>
                <td className="px-3 py-2">名前</td>
                <td className="px-3 py-2">メールアドレス</td>
              </tr>
            </thead>
            <tbody className="w-full bg-slate-200">
              {users.map((user) => (
                <tr key={user.id} className="">
                  <td className="px-3">{user.username}</td>
                  <td className="px-3">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul>
          </ul>

          <form onSubmit={handleSubmit}>
            <h2>ログインフォーム</h2>
            <div className="flex items-center gap-4 mb-3">
              <label htmlFor="username">名前</label>
              <input 
                  type="text" 
                  name="username" 
                  id="username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border ml-5 border-gray-400 rounded-sm p-1"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="email">Email</label>
              <input 
                  type="text" 
                  name="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border ml-5 border-gray-400 rounded-sm p-1"
              />
            </div>
            <button type="submit" className="bg-green-500 px-2 py-1 rounded-lg mt-5">ログイン</button>
          </form>
        </div>

    </div>
  );
}
