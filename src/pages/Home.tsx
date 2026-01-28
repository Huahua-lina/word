import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useLocation } from 'wouter'

export default function Home() {
	const [query, setQuery] = useState('')
	const [, setLocation] = useLocation()

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		if (query.trim()) {
			setLocation(`/search?q=${encodeURIComponent(query)}`)
		}
	}

	return (
		// Full viewport height, padding bottom for nav, centered content
		<div className="w-full flex flex-col items-center justify-center max-w-xl space-y-10 px-4 py-4">
			{/* Header - Compact */}
			<section className="text-center space-y-3">
				<p className="text-sm text-muted-foreground font-sans tracking-wide">
					精准表达 · 知识沉淀
				</p>
			</section>

			{/* Refined Search Bar - White, Shadow, Smaller */}
			<section className="w-full relative z-10">
				<form onSubmit={handleSearch} className="relative group">
					<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground/60">
						<Search className="w-4 h-4" />
					</div>
					<Input
						className="w-full pl-10 pr-4 h-12 rounded-full border border-border/60 bg-white dark:bg-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-border transition-all text-base placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary/10 focus-visible:border-primary/20"
						placeholder="搜成语..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</form>
			</section>

			{/* Daily Recommendation - Compact & Clean */}
			<section className="w-full">
				<div className="p-6 rounded-2xl bg-secondary/30 border border-secondary/20 text-center space-y-2">
					<div className="flex items-center justify-center gap-2 mb-1">
						<span className="w-1 h-1 rounded-full bg-primary/40"></span>
						<span className="text-[10px] font-bold tracking-widest text-muted-foreground/60 uppercase">
							Daily Pick
						</span>
						<span className="w-1 h-1 rounded-full bg-primary/40"></span>
					</div>
					<h3 className="text-xl font-serif font-bold text-primary">
						空穴来风
					</h3>
					<p className="text-sm text-muted-foreground font-light leading-relaxed">
						比喻消息和谣言的传播不是完全没有原因的。
					</p>
				</div>
			</section>
		</div>
	)
}
