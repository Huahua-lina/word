import { useState } from 'react'
import { useCollection } from '@/hooks/useCollection'
import { MOCK_IDIOMS } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, AlertTriangle, ArrowRight, Upload } from 'lucide-react'
import { nanoid } from 'nanoid'
import { toast } from 'sonner'
import { Link } from 'wouter'
import { Title } from '@/components/ui/title'

export default function Import() {
	const { items, add } = useCollection()
	const [text, setText] = useState('')
	const [parsed, setParsed] = useState<any[] | null>(null)

	const handleParse = () => {
		if (!text.trim()) return

		const lines = text
			.split(/\n+/)
			.map((l) => l.trim())
			.filter(Boolean)
		const results = lines.map((line) => {
			// Check if already in library
			const exists = items.some((i) => i.word === line)
			if (exists) return { word: line, status: 'duplicate' }

			// Check if in DB
			const dbMatch = MOCK_IDIOMS.find((i) => i.word === line)
			if (dbMatch)
				return { word: line, status: 'ready', data: dbMatch, isCustom: false }

			// Custom
			return { word: line, status: 'ready', isCustom: true }
		})
		setParsed(results)
	}

	const handleImport = () => {
		if (!parsed) return
		let count = 0
		parsed.forEach((p) => {
			if (p.status === 'ready') {
				add({
					id: p.isCustom ? `custom_${nanoid()}` : p.data.id,
					word: p.word,
					isCustom: p.isCustom,
					...(p.isCustom
						? {}
						: {
								pinyin: p.data.pinyin,
								definition: p.data.definition,
							}),
				})
				count++
			}
		})
		toast.success(`成功导入 ${count} 个成语`)
		setParsed(null)
		setText('')
	}

	return (
		<div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
			<div className="flex flex-col gap-4">
				<Title extra="将已有积累快速迁移至平台。支持文本粘贴，自动去重与匹配数据库。">
					批量导入
				</Title>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Input Area */}
				<div className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>文本输入</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<Textarea
								placeholder="在此粘贴成语，每行一个。例如：&#10;首当其冲&#10;空穴来风&#10;..."
								className="min-h-[300px] font-serif text-lg leading-relaxed"
								value={text}
								onChange={(e) => setText(e.target.value)}
							/>
							<Button
								onClick={handleParse}
								className="w-full"
								disabled={!text.trim()}
							>
								解析预览 <ArrowRight className="ml-2 w-4 h-4" />
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Preview Area */}
				<div className="space-y-4">
					<Card className="h-full flex flex-col">
						<CardHeader>
							<CardTitle className="flex justify-between items-center">
								<span>导入预览</span>
								{parsed && (
									<span className="text-sm font-normal text-muted-foreground">
										共 {parsed.length} 条
									</span>
								)}
							</CardTitle>
						</CardHeader>
						<CardContent className="flex-1 overflow-auto max-h-[500px]">
							{!parsed ? (
								<div className="h-full flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg p-8">
									<Upload className="w-8 h-8 mb-4 opacity-50" />
									<p>请在左侧输入内容并解析</p>
								</div>
							) : (
								<div className="space-y-4">
									<div className="flex gap-4 text-sm font-bold">
										<div className="flex items-center gap-1 text-green-600">
											<CheckCircle2 className="w-4 h-4" />
											可导入 (
											{parsed.filter((p) => p.status === 'ready').length})
										</div>
										<div className="flex items-center gap-1 text-orange-500">
											<AlertTriangle className="w-4 h-4" />
											已存在 (
											{parsed.filter((p) => p.status === 'duplicate').length})
										</div>
									</div>

									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>成语</TableHead>
												<TableHead>状态</TableHead>
												<TableHead>来源</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{parsed.map((p, i) => (
												<TableRow key={i}>
													<TableCell className="font-serif font-bold">
														{p.word}
													</TableCell>
													<TableCell>
														{p.status === 'duplicate' ? (
															<span className="text-orange-500 text-xs">
																跳过 (重复)
															</span>
														) : (
															<span className="text-green-600 text-xs">
																准备就绪
															</span>
														)}
													</TableCell>
													<TableCell className="text-xs text-muted-foreground">
														{p.status === 'duplicate'
															? '-'
															: p.isCustom
																? '新增词条'
																: '系统匹配'}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							)}
						</CardContent>
						{parsed && parsed.some((p) => p.status === 'ready') && (
							<div className="p-6 border-t bg-muted/10">
								<Button className="w-full" size="lg" onClick={handleImport}>
									确认导入 {parsed.filter((p) => p.status === 'ready').length}{' '}
									条成语
								</Button>
							</div>
						)}
					</Card>
				</div>
			</div>
		</div>
	)
}
