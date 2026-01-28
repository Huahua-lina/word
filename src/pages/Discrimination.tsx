import { useSearch } from 'wouter'
import { MOCK_DISCRIMINATIONS } from '@/data/mockDiscriminations'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import {
	Scale,
	MessageCircle,
	AlertCircle,
	Quote,
	Sparkles,
	ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Title } from '@/components/ui/title'

const getIconForLabel = (label: string) => {
	if (label.includes('侧重') || label.includes('区别'))
		return <Scale className="w-3.5 h-3.5 text-blue-600" />
	if (label.includes('色彩') || label.includes('褒贬'))
		return <Sparkles className="w-3.5 h-3.5 text-purple-600" />
	if (label.includes('场景') || label.includes('对象'))
		return <Quote className="w-3.5 h-3.5 text-emerald-600" />
	if (
		label.includes('误区') ||
		label.includes('字义') ||
		label.includes('真伪')
	)
		return <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
	return <MessageCircle className="w-3.5 h-3.5 text-muted-foreground" />
}

export default function Discrimination() {
	const search = useSearch()
	const params = new URLSearchParams(search)
	const defaultId = params.get('id')

	return (
		<div className="w-full animate-in fade-in duration-500 p-4 pb-10 md:p-0">
			<div className="flex flex-col gap-2 pb-2 mb-4">
				<Title extra="精选易混淆成语组，通过结构化对比，彻底理清语义差异。">
					词辨析
				</Title>
			</div>

			<Accordion
				type="multiple"
				className="w-full space-y-4"
				defaultValue={MOCK_DISCRIMINATIONS.map((group) => group.id)}
			>
				{MOCK_DISCRIMINATIONS.map((group) => {
					const [wordA, wordB] = group.title.split(' vs ')

					return (
						<AccordionItem
							key={group.id}
							value={group.id}
							className="border-none bg-transparent"
						>
							<div className="rounded-xl border border-border/60 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm transition-all duration-300">
								{/* Simplified Header */}
								<AccordionTrigger className="hover:no-underline py-4 px-5 group hover:bg-secondary/20 transition-colors cursor-pointer">
									<div className="flex items-center justify-between w-full pr-2">
										<div className="flex items-center gap-3">
											<div className="flex items-center text-base sm:text-lg font-serif font-bold text-foreground">
												<span>{wordA}</span>
												<ArrowRight className="w-3.5 h-3.5 mx-2 text-muted-foreground/40" />
												<span className="text-primary">{wordB}</span>
											</div>
										</div>
										{/* Badge Removed for compactness or kept minimal? Removed per request for 'less clutter' */}
									</div>
								</AccordionTrigger>

								<AccordionContent className="pb-0 px-0">
									{/* Compact Dimensions List */}
									<div className="flex flex-col divide-y divide-border/40">
										{group.dimensions.map((dim, idx) => (
											<div
												key={idx}
												className="flex flex-col sm:flex-row text-sm"
											>
												{/* Dimension Label - Compact Sidebar */}
												<div className="flex items-center gap-2 px-5 py-2 sm:py-4 sm:w-28 sm:shrink-0 bg-secondary/10 text-muted-foreground font-medium text-xs sm:border-r border-border/40">
													{getIconForLabel(dim.label)}
													<span>{dim.label}</span>
												</div>

												{/* Comparison Content */}
												<div className="flex-1 grid grid-cols-2">
													<div className="p-3 sm:px-5 sm:py-4 text-foreground/90 leading-relaxed border-r border-border/40 last:border-0 border-dashed sm:border-solid">
														<span className="block sm:hidden text-[10px] text-muted-foreground mb-1 scale-90 origin-left">
															{wordA}
														</span>
														{dim.itemA}
													</div>
													<div className="p-3 sm:px-5 sm:py-4 text-primary/90 leading-relaxed bg-primary/[0.02]">
														<span className="block sm:hidden text-[10px] text-primary/60 mb-1 scale-90 origin-left">
															{wordB}
														</span>
														{dim.itemB}
													</div>
												</div>
											</div>
										))}
									</div>
								</AccordionContent>
							</div>
						</AccordionItem>
					)
				})}
			</Accordion>
		</div>
	)
}
