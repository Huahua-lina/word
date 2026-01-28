import { useCollection } from '@/hooks/useCollection'
import { MOCK_IDIOMS } from '@/data/mockData'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trash2, Search, CheckCircle2, HelpCircle, Circle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'wouter'
import { Title } from '@/components/ui/title'

export default function Library() {
	const { items, remove, update } = useCollection()
	const [filter, setFilter] = useState('')
	const [familiarityFilter, setFamiliarityFilter] = useState<string>('all')

	const filteredItems = items.filter((item) => {
		const matchesQuery = item.word.includes(filter)
		const matchesFam =
			familiarityFilter === 'all' || item.familiarity === familiarityFilter
		return matchesQuery && matchesFam
	})

	const getFullData = (item: any) => {
		if (item.isCustom) return item
		const dbItem = MOCK_IDIOMS.find((i) => i.id === item.id)
		return dbItem ? { ...dbItem, ...item } : item
	}

	const getFamiliarityColor = (status: string) => {
		switch (status) {
			case 'familiar':
				return 'text-green-500 bg-green-50 border-green-200'
			case 'neutral':
				return 'text-yellow-500 bg-yellow-50 border-yellow-200'
			default:
				return 'text-red-500 bg-red-50 border-red-200'
		}
	}

	return (
		<div className="space-y-8 animate-in fade-in duration-500 w-full p-4 md:p-0">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<Title
						extra={`已积累 ${items.length} 个成语，持续构建你的知识体系。`}
					>
						个人成语库
					</Title>
				</div>
				<div className="flex gap-2">
					<Link href="/import">
						<Button variant="outline" className="gap-2">
							导入数据
						</Button>
					</Link>
				</div>
			</div>

			{/* Controls */}
			<div className="flex flex-col md:flex-row gap-4 bg-card rounded-lg border shadow-sm">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="搜索库中成语..."
						className="pl-9"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					/>
				</div>
				<Tabs
					defaultValue="all"
					value={familiarityFilter}
					onValueChange={setFamiliarityFilter}
					className="w-full md:w-auto"
				>
					<TabsList>
						<TabsTrigger value="all">全部</TabsTrigger>
						<TabsTrigger value="unfamiliar">陌生</TabsTrigger>
						<TabsTrigger value="neutral">模糊</TabsTrigger>
						<TabsTrigger value="familiar">熟悉</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>

			{/* Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredItems.length === 0 ? (
					<div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
						{items.length === 0
							? '暂无收藏，去查询页面添加或使用导入功能。'
							: '没有找到匹配的成语。'}
					</div>
				) : (
					filteredItems.map((rawItem) => {
						const item = getFullData(rawItem)
						return (
							<Card
								key={item.id}
								className="group hover:shadow-md transition-all"
							>
								<CardHeader className="pb-2">
									<div className="flex justify-between items-start">
										<CardTitle className="text-xl font-serif font-bold">
											{item.word}
										</CardTitle>
										<Button
											variant="ghost"
											size="icon"
											className="h-6 w-6 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
											onClick={() => remove(item.id)}
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</div>
									<p className="text-sm text-muted-foreground">
										{item.pinyin || '暂无拼音'}
									</p>
								</CardHeader>
								<CardContent className="pb-2 min-h-[60px]">
									<p className="text-sm line-clamp-2 text-foreground/80">
										{item.definition || '暂无释义'}
									</p>
								</CardContent>
								<CardFooter className="pt-2 flex justify-between border-t bg-muted/20">
									<div className="flex gap-1">
										<Button
											variant="ghost"
											size="icon"
											className="h-7 w-7 rounded-full hover:bg-red-100"
											onClick={() =>
												update(item.id, { familiarity: 'unfamiliar' })
											}
										>
											<Circle
												className={`w-4 h-4 ${item.familiarity === 'unfamiliar' ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
											/>
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-7 w-7 rounded-full hover:bg-yellow-100"
											onClick={() =>
												update(item.id, { familiarity: 'neutral' })
											}
										>
											<HelpCircle
												className={`w-4 h-4 ${item.familiarity === 'neutral' ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
											/>
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-7 w-7 rounded-full hover:bg-green-100"
											onClick={() =>
												update(item.id, { familiarity: 'familiar' })
											}
										>
											<CheckCircle2
												className={`w-4 h-4 ${item.familiarity === 'familiar' ? 'fill-green-500 text-green-500' : 'text-muted-foreground'}`}
											/>
										</Button>
									</div>
									<span
										className={`text-xs px-2 py-1 rounded-full border ${getFamiliarityColor(item.familiarity)}`}
									>
										{item.familiarity === 'unfamiliar' && '陌生'}
										{item.familiarity === 'neutral' && '模糊'}
										{item.familiarity === 'familiar' && '熟悉'}
									</span>
								</CardFooter>
							</Card>
						)
					})
				)}
			</div>
		</div>
	)
}
