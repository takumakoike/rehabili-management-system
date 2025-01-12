import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
//   CardDescription,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TabsContent } from "@/components/ui/tabs"

interface TabContentInfoProps {
    value: string;
}

export function TabContentInfo({ value }: TabContentInfoProps) {
    return(
        <>  
            <TabsContent value={value}>
                <Card className="w-[600px] mx-auto">
                    <CardHeader className="py-4">
                        <CardTitle className="text-center bg-gray-300 py-3 rounded">患者情報の登録</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name" className="font-semibold text-orange-500">患者氏名</Label>
                                <Input id="name" placeholder="患者　太郎" />
                            </div>
                            <div className="flex gap-4 ">
                                <div className="flex items-center gap-4 basis-1/3">
                                    <Label htmlFor="affected-site" className="font-semibold text-orange-500">受傷側</Label>
                                    <RadioGroup defaultValue="right" className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="right" id="right" />
                                            <Label htmlFor="right">右</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="left" id="left" />
                                            <Label htmlFor="left">左</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                
                                <div className="flex items-center basis-2/3">
                                    <Label htmlFor="affected-part" className="basis-1/4 font-semibold text-orange-500">受傷部位</Label>
                                    <Select>
                                        <SelectTrigger id="affected-part" className="basis-3/4">
                                            <SelectValue placeholder="選択" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="thumb">母指</SelectItem>
                                            <SelectItem value="index">示指</SelectItem>
                                            <SelectItem value="middle">中指</SelectItem>
                                            <SelectItem value="ring">環指</SelectItem>
                                            <SelectItem value="little">小指</SelectItem>
                                            <SelectItem value="wrist">手関節</SelectItem>
                                            <SelectItem value="ulna">尺骨</SelectItem>
                                            <SelectItem value="radius">橈骨</SelectItem>
                                            <SelectItem value="fingers">手指</SelectItem>
                                            <SelectItem value="elbow">肘</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                            <Label htmlFor="diagnosis" className="basis-1/6 font-semibold text-orange-500">診断</Label>
                            <Input
                                    id="affected-site"
                                    placeholder="診断名を入力"
                                    value=""
                                    name="affected-site"
                                    />
                            </div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button className="w-1/3 bg-blue-500 font-bold">登録</Button>
                        <Button className="w-1/3 bg-purple-500">編集</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </>
    )
}