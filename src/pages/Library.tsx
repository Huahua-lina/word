import { useSearch, Link } from 'wouter'
import { MOCK_IDIOMS } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
	Search as SearchIcon,
	AlertTriangle,
	LayoutGrid,
	List as ListIcon,
	ArrowUp,
	Sparkles,
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Title } from '@/components/ui/title'

export default function SearchPage() {
	const searchString = useSearch()
	const queryParams = new URLSearchParams(searchString)
	const initialQuery = queryParams.get('q') || ''

	const [results, setResults] = useState(MOCK_IDIOMS)
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
	const [showMiniTitle, setShowMiniTitle] = useState(false)
	const titleRef = useRef<HTMLHeadingElement>(null)

	// Filter logic
	useEffect(() => {
		if (!initialQuery.trim()) {
			setResults(MOCK_IDIOMS)
			return
		}
		const lowerQ = initialQuery.toLowerCase()
		const filtered = MOCK_IDIOMS.filter(
			(item) =>
				item.word.includes(initialQuery) ||
				item.pinyin.toLowerCase().includes(lowerQ) ||
				item.definition.includes(initialQuery),
		)
		setResults(filtered)
	}, [initialQuery])

	// Scroll detection
	useEffect(() => {
		const handleScroll = () => {
			if (titleRef.current) {
				const titleBottom = titleRef.current.getBoundingClientRect().bottom
				setShowMiniTitle(titleBottom < 60)
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const recommendedIdioms = MOCK_IDIOMS.slice(0, 3) // Just pick first 3 for demo

	return (
		<div className="w-full">
			{/* Sticky Header */}
			<div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300">
				<div className="flex justify-between items-center h-[52px] px-2">
					{/* Mini Title (Fade In) */}
					<div
						className={cn(
							'flex items-center gap-2 transition-all duration-300 ease-in-out cursor-pointer',
							showMiniTitle
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-2 pointer-events-none',
						)}
						onClick={scrollToTop}
					>
						<span className="font-bold text-base text-foreground">
							{initialQuery ? '搜索结果' : '词库'}
						</span>
						{initialQuery && (
							<Badge
								variant="secondary"
								className="h-5 px-1.5 text-[10px] font-normal"
							>
								{results.length}
							</Badge>
						)}
					</div>

					{/* Actions (Always Visible) */}
					<div className="flex bg-secondary/50 rounded-lg p-0.5 gap-0.5 ml-auto">
						<Button
							variant="ghost"
							size="icon"
							className={cn(
								'h-7 w-7 rounded-md',
								viewMode === 'grid'
									? 'bg-background shadow-sm text-foreground'
									: 'text-muted-foreground',
							)}
							onClick={() => setViewMode('grid')}
						>
							<LayoutGrid className="h-3.5 w-3.5" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className={cn(
								'h-7 w-7 rounded-md',
								viewMode === 'list'
									? 'bg-background shadow-sm text-foreground'
									: 'text-muted-foreground',
							)}
							onClick={() => setViewMode('list')}
						>
							<ListIcon className="h-3.5 w-3.5" />
						</Button>
					</div>
				</div>
			</div>

			{/* Large Title Area */}
			<div ref={titleRef} className="w-full p-4">
				<Title extra={`共收录 ${MOCK_IDIOMS.length} 条成语`}>词库</Title>
			</div>

			{/* Main Content Flow */}
			<div className="pb-10 space-y-6 px-4 md:p-0">
				{/* Results List */}
				<div
					className={cn(
						'grid gap-4',
						viewMode === 'grid' ? 'grid-cols-1' : 'grid-cols-1',
					)}
				>
					{results.length === 0 ? (
						<div className="py-12 space-y-8">
							<div className="text-center text-muted-foreground space-y-4">
								<div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto">
									<SearchIcon className="w-8 h-8 opacity-20" />
								</div>
								<div>
									<p className="text-lg font-medium text-foreground">
										未找到相关成语
									</p>
									<p className="text-sm">
										试试其他关键词，或者看看下面的推荐？
									</p>
								</div>
								<Link href="/">
									<Button variant="outline" className="mt-2">
										返回首页搜索
									</Button>
								</Link>
							</div>

							{/* Recommendations */}
							<div className="space-y-4 pt-4 border-t border-dashed border-border/60">
								<h3 className="text-sm font-bold text-muted-foreground flex items-center gap-2">
									<Sparkles className="w-4 h-4 text-primary" />
									猜你想找
								</h3>
								<div className="grid gap-3">
									{recommendedIdioms.map((item) => (
										<Link key={item.id} href={`/idiom/${item.id}`}>
											<div className="group relative bg-card border border-border/40 rounded-xl p-4 hover:border-primary/20 transition-all cursor-pointer hover:shadow-sm active:scale-[0.99]">
												<div className="flex justify-between items-center">
													<div>
														<h4 className="font-bold text-foreground">
															{item.word}
														</h4>
														<p className="text-xs text-muted-foreground mt-1 line-clamp-1">
															{item.definition}
														</p>
													</div>
													<ArrowUp className="w-4 h-4 text-muted-foreground/30 rotate-45 group-hover:text-primary transition-colors" />
												</div>
											</div>
										</Link>
									))}
								</div>
							</div>
						</div>
					) : (
						results.map((item) => (
							<Link key={item.id} href={`/idiom/${item.id}`}>
								{viewMode === 'grid' ? (
									// Grid/Card Mode
									<Card className="cursor-pointer hover:shadow-md transition-all group border-l-4 border-l-transparent hover:border-l-primary active:scale-[0.99]">
										<CardHeader className="p-2">
											<div className="flex justify-between items-start">
												<div className="space-y-1">
													<CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
														{item.word}
														<span className="text-sm font-normal text-muted-foreground">
															{item.pinyin}
														</span>
													</CardTitle>
													<CardDescription className="line-clamp-2 text-base text-foreground/70 mt-2">
														{item.definition}
													</CardDescription>
												</div>
												<div className="flex flex-col gap-2 items-end">
													{item.emotion === 'commendatory' && (
														<Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
															褒义
														</Badge>
													)}
													{item.emotion === 'derogatory' && (
														<Badge
															variant="destructive"
															className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
														>
															贬义
														</Badge>
													)}
													{item.emotion === 'neutral' && (
														<Badge
															variant="secondary"
															className="bg-gray-100 text-gray-600"
														>
															中性
														</Badge>
													)}
												</div>
											</div>
											{item.misuse_warning && (
												<div className="mt-3 flex items-start gap-1.5 text-xs text-orange-600 bg-orange-50 p-2 rounded-md border border-orange-100/50">
													<AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
													<span>易错: {item.misuse_warning}</span>
												</div>
											)}
										</CardHeader>
									</Card>
								) : (
									// List Mode
									<div className="group relative bg-card border border-border/40 rounded-xl p-4 hover:border-primary/20 transition-all cursor-pointer hover:shadow-sm active:scale-[0.99]">
										<div className="flex items-start gap-4">
											{/* Left: Word & Emotion */}
											<div className="flex flex-col items-start gap-1 w-24 shrink-0 pt-1">
												<span className="text-xs text-muted-foreground font-sans">
													{item.pinyin}
												</span>
												<h3 className="text-lg font-bold text-foreground leading-tight">
													{item.word}
												</h3>
												<div className="pt-1">
													{item.emotion === 'commendatory' && (
														<span className="text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-700 border border-green-100">
															褒义
														</span>
													)}
													{item.emotion === 'derogatory' && (
														<span className="text-[10px] px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-100">
															贬义
														</span>
													)}
													{item.emotion === 'neutral' && (
														<span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
															中性
														</span>
													)}
												</div>
											</div>

											{/* Middle: Core Info */}
											<div className="flex-1 min-w-0 space-y-2">
												{/* Definition */}
												<p className="text-sm text-foreground/80 leading-relaxed">
													<span className="font-bold text-foreground/40 mr-1 select-none">
														释
													</span>
													{item.definition}
												</p>

												{/* Usage (Condensed) */}
												<p className="text-xs text-muted-foreground/90 leading-relaxed bg-secondary/30 p-1.5 rounded-md">
													<span className="font-bold text-primary/50 mr-1 select-none">
														用
													</span>
													{item.usage}
												</p>

												{/* Warning (If exists) */}
												{item.misuse_warning && (
													<div className="flex items-start gap-1.5 text-xs text-orange-700">
														<AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
														<span>{item.misuse_warning}</span>
													</div>
												)}
											</div>
										</div>
									</div>
								)}
							</Link>
						))
					)}
				</div>
			</div>
		</div>
	)
}
