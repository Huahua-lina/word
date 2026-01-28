import { useRoute } from 'wouter'
import { Link } from 'wouter'
import { MOCK_IDIOMS } from '@/data/mockData'
import { MOCK_DISCRIMINATIONS } from '@/data/mockDiscriminations'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
	Star,
	AlertTriangle,
	BookOpen,
	CheckCircle2,
	XCircle,
	ArrowRight,
} from 'lucide-react'
import { toast } from 'sonner'
import NotFound from './NotFound'
import { useState } from 'react'

export default function IdiomDetail() {
	const [match, params] = useRoute('/idiom/:id')
	const [collected, setCollected] = useState(false)

	if (!match || !params) return <NotFound />

	const idiom = MOCK_IDIOMS.find((i) => i.id === params.id)
	if (!idiom) return <NotFound />

	const relatedDiff = MOCK_DISCRIMINATIONS.find((d) =>
		d.idiomIds.includes(idiom.id),
	)

	const toggleCollect = () => {
		setCollected(!collected)
		toast.success(collected ? '已取消收藏' : '已加入个人成语库')
	}

	return (
		<div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 p-4">
			{/* Header */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
				<div>
					<h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 tracking-wide text-primary">
						{idiom.word}
					</h1>
					<div className="flex items-center gap-3 text-lg text-muted-foreground font-sans">
						<span>{idiom.pinyin}</span>
						{idiom.emotion === 'commendatory' && (
							<Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
								褒义
							</Badge>
						)}
						{idiom.emotion === 'derogatory' && (
							<Badge variant="destructive">贬义</Badge>
						)}
						{idiom.emotion === 'neutral' && (
							<Badge variant="secondary">中性</Badge>
						)}
					</div>
				</div>
				<div className="flex gap-3">
					<Button
						variant={collected ? 'default' : 'outline'}
						onClick={toggleCollect}
						className="gap-2"
					>
						<Star className={collected ? 'fill-current' : ''} />
						{collected ? '已收藏' : '收藏'}
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="md:col-span-2 space-y-8">
					<section>
						<h2 className="text-xl font-serif font-bold mb-3 flex items-center gap-2">
							<BookOpen className="w-5 h-5 text-primary" />
							基本释义
						</h2>
						<p className="text-lg leading-relaxed text-foreground/90 bg-card p-6 rounded-lg border shadow-sm">
							{idiom.definition}
						</p>
						{idiom.source && (
							<p className="mt-2 text-sm text-muted-foreground text-right">
								—— 出处：{idiom.source}
							</p>
						)}
					</section>

					<section>
						<h2 className="text-xl font-serif font-bold mb-3">使用语境</h2>
						<div className="bg-muted/30 p-6 rounded-lg border space-y-4">
							<p className="text-foreground/80">{idiom.usage}</p>
						</div>
					</section>

					{idiom.misuse_warning && (
						<Alert
							variant="destructive"
							className="bg-destructive/5 border-destructive/20 text-destructive"
						>
							<AlertTriangle className="h-4 w-4" />
							<AlertTitle>常见误用警示</AlertTitle>
							<AlertDescription className="mt-2 text-destructive/90 font-medium">
								{idiom.misuse_warning}
							</AlertDescription>
						</Alert>
					)}

					<section className="space-y-4">
						<h2 className="text-xl font-serif font-bold mb-3">例句示范</h2>
						<div className="space-y-4">
							{idiom.examples.correct.map((ex, i) => (
								<div
									key={i}
									className="flex gap-3 p-4 rounded-lg bg-secondary/10 border border-secondary/20"
								>
									<CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
									<p className="text-foreground/90">{ex}</p>
								</div>
							))}
							{idiom.examples.incorrect?.map((ex, i) => (
								<div
									key={i}
									className="flex gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/10"
								>
									<XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
									<div className="space-y-1">
										<p className="text-foreground/90 line-through decoration-destructive/50">
											{ex}
										</p>
										<p className="text-xs text-destructive font-medium">
											（错误用法）
										</p>
									</div>
								</div>
							))}
						</div>
					</section>
				</div>

				{/* Sidebar Info */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-base font-serif">标签</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-wrap gap-2">
							{idiom.tags.map((tag) => (
								<Badge key={tag} variant="outline" className="font-normal">
									{tag}
								</Badge>
							))}
						</CardContent>
					</Card>

					{/* Related/Comparison */}
					{relatedDiff ? (
						<Link href={`/discrimination?id=${relatedDiff.id}`}>
							<Card className="bg-accent/20 border-accent/50 cursor-pointer hover:bg-accent/30 transition-colors group">
								<CardHeader>
									<CardTitle className="text-base font-serif flex items-center justify-between">
										推荐辨析
										<ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="font-bold text-lg mb-1">{relatedDiff.title}</p>
									<p className="text-sm text-muted-foreground">
										{relatedDiff.summary}
									</p>
								</CardContent>
							</Card>
						</Link>
					) : (
						<Card className="bg-muted/10 border-dashed">
							<CardHeader>
								<CardTitle className="text-base font-serif text-muted-foreground">
									暂无辨析
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									该成语暂未收录进辨析组。
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</div>
	)
}
