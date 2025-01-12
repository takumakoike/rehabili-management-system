import Link from "next/link"

export const HeaderComponents =() => {
    return(
        <div className="headerContainer flex mb-12 items-center justify-between">
            <h1 className="font-bold text-3xl text-center text-gray-700">患者管理アプリ</h1>
            <nav className="text-gray-700 font-bold">
                <ul className="flex gap-4 items-center">
                <li>
                    <Link href={"/"}>トップ</Link>
                </li>
                <li>
                    <Link href={"/patients"}>患者管理</Link>
                </li>
                <li>
                    <Link href={"/login"}>ログイン</Link>
                </li>
                </ul>
            </nav>
        </div>
    )
}