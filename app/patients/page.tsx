import { HeaderComponents } from "../components/Headers"
import * as React from "react"
 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabContentInfo } from "../components/tabcomponents/tabInfo"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
  


export default function patientView(){

    return (
        <>
            <div className="container w-11/12 mx-auto py-4">
                <HeaderComponents />
            </div>
            <div className="flex flex-col items-center gap-5">
                <h2 className="text-center text-2xl font-bold">患者管理</h2>

                {/* タブグループを使って患者情報の登録、実績、月内実績について管理する */}
                <Tabs defaultValue="patient-info" className="w-[600px]">
                    <TabsList className="w-full">
                        <TabsTrigger value="patient-info" className="w-1/3">患者登録</TabsTrigger>
                        <TabsTrigger value="patient-result" className="w-1/3">本日の実績</TabsTrigger>
                        <TabsTrigger value="patient-monthly" className="w-1/3">月毎実績</TabsTrigger>
                    </TabsList>
                    <TabContentInfo value="patient-info" />
                    <TabsContent value="patient-result">Change your password here.</TabsContent>
                    <TabsContent value="patient-monthly">Change your password here.</TabsContent>
                    </Tabs>
            </div>
            <div className="flex flex-col items-center gap-5 mt-10 ">
                <div className="p-6 bg-gray-300 w-[600px] rounded">
                    <h2 className="text-center font-bold bg-gray-50 py-2">登録患者一覧</h2>
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">患者氏名</TableHead>
                                <TableHead>診断</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                {/* ここでmapメソッドで出力 */}
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>

                </div>
            </div>
        </>
    )
}