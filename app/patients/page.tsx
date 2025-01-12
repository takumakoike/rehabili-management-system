import { HeaderComponents } from "../components/Headers"
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


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
                        <TabsTrigger value="patient-result" className="w-1/3">診療実績</TabsTrigger>
                        <TabsTrigger value="patient-monthly" className="w-1/3">月毎実績</TabsTrigger>
                    </TabsList>
                    <TabsContent value="patient-info">
                        <Card className="w-[600px] mx-auto">
                            <CardHeader className="py-4">
                                <CardTitle className="text-center bg-gray-300 py-3 rounded">患者情報の登録</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Name of your project" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Framework</Label>
                                    <Select>
                                        <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                        <SelectItem value="next">Next.js</SelectItem>
                                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                        <SelectItem value="astro">Astro</SelectItem>
                                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    </div>
                                </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button>Deploy</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="patient-result">Change your password here.</TabsContent>
                    <TabsContent value="patient-monthly">Change your password here.</TabsContent>
                    </Tabs>


            </div>
        </>
    )
}