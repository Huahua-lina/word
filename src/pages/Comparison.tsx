import { useState } from 'react'
import { MOCK_IDIOMS, type Idiom } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { X, Plus, GitCompare } from 'lucide-react'
import { toast } from 'sonner'
import { Title } from '@/components/ui/title'

export default function Comparison() {
	const [selectedIds, setSelectedIds] = useState<string[]>([])

	const handleAdd = (id: string) => {
		if (selectedIds.includes(id)) {
			toast.error('该成语已在对比列表中')
			return
		}
		if (selectedIds.length >= 4) {
			toast.error('最多同时对比 4 个成语')
			return
		}
		setSelectedIds([...selectedIds, id])
	}

	const handleRemove = (id: string) => {
		setSelectedIds(selectedIds.filter((pid) => pid !== id))
	}

	const selectedIdioms = selectedIds
		.map((id) => MOCK_IDIOMS.find((i) => i.id === id))
		.filter(Boolean) as Idiom[]

	// Dimensions to compare
	const rows = [
		{
			label: '成语',
			key: 'word',
			render: (i: Idiom) => (
				<span className="font-serif font-bold text-lg">{i.word}</span>
			),
		},
		{
			label: '拼音',
			key: 'pinyin',
			render: (i: Idiom) => (
				<span className="text-muted-foreground">{i.pinyin}</span>
			),
		},
		{
			label: '感情色彩',
			key: 'emotion',
			render: (i: Idiom) =>
				i.emotion === 'commendatory' ? (
					<Badge className="bg-secondary text-secondary-foreground">褒义</Badge>
				) : i.emotion === 'derogatory' ? (
					<Badge variant="destructive">贬义</Badge>
				) : (
					<Badge variant="secondary">中性</Badge>
				),
		},
		{ label: '释义', key: 'definition', render: (i: Idiom) => i.definition },
		{ label: '适用语境', key: 'usage', render: (i: Idiom) => i.usage },
		{
			label: '易错点',
			key: 'misuse_warning',
			render: (i: Idiom) =>
				i.misuse_warning ? (
					<span className="text-destructive font-medium">
						{i.misuse_warning}
					</span>
				) : (
					'-'
				),
		},
	]

	return (
		<div className="space-y-8 animate-in fade-in duration-500 w-full p-4 md:p-0">
			<div className="flex flex-col gap-4">
				<Title
					extra={`自由选择成语进行横向对比，从语义、色彩、语境等多维度发现差异。`}
				>
					相近成语对比
				</Title>
			</div>

			<div className="bg-card p-6 rounded-lg border shadow-sm space-y-6">
				<div className="flex flex-col md:flex-row gap-4 items-center">
					<div className="w-full md:w-80">
						<Select onValueChange={handleAdd}>
							<SelectTrigger>
								<SelectValue placeholder="选择成语加入对比..." />
							</SelectTrigger>
							<SelectContent>
								{MOCK_IDIOMS.map((idiom) => (
									<SelectItem key={idiom.id} value={idiom.id}>
										{idiom.word}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<p className="text-sm text-muted-foreground flex-1">
						已选择 {selectedIds.length} / 4 个
					</p>
					{selectedIds.length > 0 && (
						<Button
							variant="ghost"
							onClick={() => setSelectedIds([])}
							className="text-muted-foreground"
						>
							清空列表
						</Button>
					)}
				</div>

				{selectedIdioms.length === 0 ? (
					<div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-lg bg-muted/20 text-muted-foreground gap-4">
						<div className="p-4 bg-background rounded-full shadow-sm">
							<GitCompare className="w-8 h-8 text-primary/40" />
						</div>
						<p>请从上方选择至少两个成语开始对比</p>
					</div>
				) : (
					<div className="overflow-x-auto rounded-lg border">
						<Table>
							<TableHeader>
								<TableRow className="bg-muted/50">
									<TableHead className="w-[120px] font-bold">维度</TableHead>
									{selectedIdioms.map((idiom) => (
										<TableHead
											key={idiom.id}
											className="min-w-[200px] relative group"
										>
											<div className="flex items-center justify-between">
												<span className="font-serif text-primary">
													{idiom.word}
												</span>
												<Button
													variant="ghost"
													size="icon"
													className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
													onClick={() => handleRemove(idiom.id)}
												>
													<X className="w-3 h-3" />
												</Button>
											</div>
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{rows.map((row, idx) => (
									<TableRow
										key={idx}
										className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/10'}
									>
										<TableHead className="font-bold text-muted-foreground bg-background/50 sticky left-0">
											{row.label}
										</TableHead>
										{selectedIdioms.map((idiom) => (
											<TableCell key={idiom.id} className="align-top">
												{row.render(idiom)}
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}
			</div>
		</div>
	)
}
