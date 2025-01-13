"use client";

import { HeaderComponents } from "../components/Headers"
import * as React from "react"
import { useEffect, useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    // CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Patients {
    id: number;
    patientname: string;
    affectedside: string;
    affectedpart: string;
    diagnosis: string;
}



export default function PatientView(){

    const [patients, setPatients] = useState<Patients[]>([]);
    const [patientname, setPatientname] = useState("");
    const [affectedside, setAffectedside] = useState("");
    const [affectedpart, setAffectedpart] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    
    // 編集時に必要
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingFormData, setEditingFormData] = useState({patientname: "" ,affectedside: "", affectedpart: "", diagnosis: ""});

    // フォーム送信を行った時のアクション
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // APIにPOSTリクエストする
        const res = await fetch("../../api/patients/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({patientname, affectedside, affectedpart, diagnosis}),
        })

        // リクエストに成功した時はjsonオブジェクトに変換して、必要情報をsetPatientsで入れる
        if(res.ok){
            const data = await res.json();
            console.log("患者情報を作成：", data);

            setPatients((prevPatients) => [...prevPatients, data]);
            setPatientname("");
            setAffectedside("");
            setAffectedpart("");
            setDiagnosis("");

        } else {
            // リクエストが無効の場合
            console.error("患者情報の作成に失敗")
        }
    }

    const handleDelete = (id: number) => {
        fetch(`../api/patients/?id=${id}`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.success){
                setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
            } else{
                console.error("削除失敗", data.error)
            }
        })
        .catch((err) => console.error(err))
    }

    const confirmDelete = (id: number) => {
        if (window.confirm('このユーザーを削除しますか？')) {
            handleDelete(id);
            window.location.href = "/patients"
        }
    }

    // 編集モードの開始
    const startEditing = (patient: Patients) => {
        setEditingId(patient.id);
        setEditingFormData(
            {
            patientname: patient.patientname, 
            affectedside: patient.affectedside,
            affectedpart: patient.affectedpart, 
            diagnosis: patient.diagnosis
        });
    }

    // 編集フォームの値を変更
    const handleEditFormChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditingFormData((prevData) => ({...prevData,[name]: value}));
    });

    // 編集を保存
    const saveEdit = async () => {
        try{
            console.log("saveEditの開始")
            const response = await fetch(`../api/patients/?id=${editingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editingFormData)
            });
            console.log("レスポンスを受信:",response);

            if(response.ok){
                const updatePatient = await response.json();

                console.log("editingId", editingId)
                setPatients(prevPatients => 
                    (prevPatients.map(p => (p.id === editingId ? updatePatient : p)))
                );
                setEditingId(null);
                console.log("editingId", editingId)
                
                // setPatientname("");
                setEditingFormData({
                    patientname: "",
                    affectedside: "",
                    affectedpart: "",
                    diagnosis: "",
                })
                // setPatients()
                

                console.log(typeof editingFormData)
                console.log("saveEditを終了します：", editingFormData)
                console.log(patients)
            } else {
                console.error("データの更新に失敗しました")
            }
        } catch(error) {
            console.error("更新中にエラーが発生しました：", error)
        }
    }

    // useEffectを利用して初期値
    useEffect(()=> {
        const fetchData = async () => {
            try{

                const res = await fetch("../../api/patients/");
                console.log("getリクエスト2")

                if(!res.ok){
                    throw new Error("データの取得に失敗しました")
                }
                const data = await res.json();
                if(Array.isArray(data)){
                    setPatients(data);
                } else {
                    console.error("予期しないデータ形式：", data)
                }
            } catch(e) {
                console.error("データ取得エラー：",e);
            }
        };
        fetchData();
    }, [])

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
                    <TabsContent value="patient-info">
                        <Card className="w-[600px] mx-auto">
                            <CardHeader className="py-4">
                                <CardTitle className="text-center bg-gray-300 py-3 rounded">患者情報の登録</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                        <div className="grid w-full items-center gap-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="patientname" className="font-semibold text-orange-500">患者氏名</Label>
                                                <Input 
                                                id="patientname" 
                                                type="text"
                                                placeholder="患者　太郎" 
                                                value={patientname}
                                                onChange={(e) => setPatientname(e.target.value)}
                                                />
                                            </div>
                                            
                                            <div className="flex gap-4 ">
                                                <div className="flex items-center gap-4 basis-1/3">
                                                    <Label htmlFor="affected-side" className="font-semibold text-orange-500">受傷側</Label>
                                                    <RadioGroup 
                                                    defaultValue="right" 
                                                    className="flex gap-4" 
                                                    value={affectedside}
                                                    onValueChange={(e) => setAffectedside(e)}>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="右" id="right" />
                                                            <Label htmlFor="right">右</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="左" id="left" />
                                                            <Label htmlFor="left">左</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                                
                                                <div className="flex items-center basis-2/3">
                                                    <Label htmlFor="affected-part" className="basis-1/4 font-semibold text-orange-500">受傷部位</Label>
                                                    <Select 
                                                    value={affectedpart}
                                                    onValueChange={(e) => setAffectedpart(e)}
                                                    >
                                                        <SelectTrigger id="affected-part" className="basis-3/4">
                                                            <SelectValue placeholder="選択"/>
                                                        </SelectTrigger>
                                                        <SelectContent position="popper">
                                                            <SelectItem value="母指">母指</SelectItem>
                                                            <SelectItem value="示指">示指</SelectItem>
                                                            <SelectItem value="中指">中指</SelectItem>
                                                            <SelectItem value="環指">環指</SelectItem>
                                                            <SelectItem value="小指">小指</SelectItem>
                                                            <SelectItem value="手関節">手関節</SelectItem>
                                                            <SelectItem value="尺骨">尺骨</SelectItem>
                                                            <SelectItem value="橈骨">橈骨</SelectItem>
                                                            <SelectItem value="手指">手指</SelectItem>
                                                            <SelectItem value="肘">肘</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                            <Label htmlFor="diagnosis" className="basis-1/6 font-semibold text-orange-500">診断</Label>
                                            <Input
                                                    id="diagnosis"
                                                    type="text"
                                                    placeholder="診断名を入力"
                                                    value={diagnosis}
                                                    name="diagnosis"
                                                    onChange={(e) => setDiagnosis(e.target.value)}
                                                    />
                                            </div>
                                        </div>
                                    <Button className="mt-8 w-full bg-blue-500 font-bold py-4" type="submit">登録</Button>
                                </form>
                            </CardContent>
                        </Card>
                        <div className="flex flex-col items-center gap-5 mt-10 ">
                            <div className="p-6 bg-gray-300 w-[600px] rounded">
                                <h2 className="text-center font-bold bg-gray-50 py-2">登録患者一覧</h2>
                                <Table>
                                    <TableCaption>患者が登録されていません</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px] text-center">患者ID</TableHead>
                                            <TableHead className="w-[100px]">患者氏名</TableHead>
                                            <TableHead colSpan={2}>診断</TableHead>
                                            {/* <TableHead className="text-right">編集</TableHead> */}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {/* ここでmapメソッドで出力 */}
                                        { patients.map( (patient) => (
                                            <TableRow key={`patient${patient.id}`}>
                                            {editingId === patient.id ? (
                                                <>
                                                {console.log(patient)}
                                                    <TableCell className="patient-id text-center" aria-disabled key={`id-${patient.id}`}>{patient.id}</TableCell>
                                                    <TableCell className="patient-name">
                                                        <input 
                                                        type="text"
                                                        name="patientname"
                                                        value={editingFormData.patientname}
                                                        onChange={handleEditFormChange}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="patient-diagnosis flex flex-col gap-2" key={`params-${patient.id}`}>
                                                        <input 
                                                        className=""
                                                        type="text" 
                                                        name="affectedside"
                                                        value={editingFormData.affectedside}
                                                        onChange={handleEditFormChange}
                                                        />
                                                        <input 
                                                        type="text" 
                                                        name="affectedpart"
                                                        value={editingFormData.affectedpart}
                                                        onChange={handleEditFormChange}
                                                        />
                                                        <input 
                                                        type="text" 
                                                        name="diagnosis"
                                                        value={editingFormData.diagnosis}
                                                        onChange={handleEditFormChange}
                                                        />
                                                        
                                                    </TableCell>
                                                    <TableCell className="flex justify-end gap-4">
                                                        <Button 
                                                        className="bg-green-600 text-white rounded px-5 py-2 font-bold"
                                                        onClick={saveEdit}
                                                        >
                                                        保存</Button>
                                                    </TableCell>
                                                </>
                                            ) : (
                                                // 編集モードではない時
                                                <>
                                                    <TableCell className="patient-id text-center">{patient.id}</TableCell>
                                                    <TableCell className="patient-name text-center">{patient.patientname}</TableCell>
                                                    <TableCell className="patient-diagnosis">
                                                        {patient.affectedside}
                                                        {patient.affectedpart}
                                                        {patient.diagnosis}
                                                    </TableCell>
                                                    <TableCell className="flex justify-end gap-4">
                                                        <Button 
                                                        className="bg-green-600 text-white rounded px-5 py-2 font-bold hover:bg-white hover:text-green-500 hover:border"
                                                        onClick={() => startEditing(patient)}
                                                        >
                                                        編集</Button>
                                                        <Button 
                                                        className="bg-red-600 text-white rounded px-5 py-2 font-bold"
                                                        onClick={() => confirmDelete(patient.id)}
                                                        >
                                                        削除</Button>
                                                    </TableCell>
                                                </>
                                            )}
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="patient-result">Change your password here.</TabsContent>
                    <TabsContent value="patient-monthly">Change your password here.</TabsContent>
                    </Tabs>
            </div>

            
        </>
    )
}