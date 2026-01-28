import { Link, useLocation } from 'wouter'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Library, BookOpen, Bookmark, Home } from 'lucide-react'
import { ScrollRestorer } from './ScrollRestorer'

interface LayoutProps {
	children: React.ReactNode
}

const navItems = [
	{ href: '/', label: '首页', icon: Home },
	{ href: '/library', label: '词库', icon: Library },
	{ href: '/discrimination', label: '辨析', icon: BookOpen },
	{ href: '/mine', label: '积累', icon: Bookmark },
]

export default function Layout({ children }: LayoutProps) {
	const [location] = useLocation()

	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-black/5 selection:text-black">
			{/* Desktop Navigation */}
			<header className="hidden md:flex fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-50 px-8 items-center justify-between">
				<Link href="/">
					<div className="flex items-center gap-2 font-serif font-bold text-lg cursor-pointer hover:opacity-80 transition-opacity">
						<span className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-serif text-sm">
							青
						</span>
						青山的小马
					</div>
				</Link>
				<div className="flex items-center gap-1">
					{navItems.map((item) => (
						<Link key={item.href} href={item.href}>
							<Button
								variant="ghost"
								className={cn(
									'text-sm font-medium transition-colors h-9',
									(
										item.href === '/'
											? location === '/'
											: location.startsWith(item.href)
									)
										? 'bg-secondary text-secondary-foreground'
										: 'text-muted-foreground hover:text-foreground',
								)}
							>
								{item.label}
							</Button>
						</Link>
					))}
					<Link href="/comparison">
						<Button
							variant="ghost"
							className={cn(
								'text-sm font-medium h-9 text-muted-foreground',
								location.startsWith('/comparison') &&
									'bg-secondary text-secondary-foreground',
							)}
						>
							对比
						</Button>
					</Link>
					<Link href="/import">
						<Button
							variant="ghost"
							className={cn(
								'text-sm font-medium h-9 text-muted-foreground',
								location.startsWith('/import') &&
									'bg-secondary text-secondary-foreground',
							)}
						>
							导入
						</Button>
					</Link>
				</div>
				<div className="w-8"></div>
			</header>
			<div className="hidden md:flex h-16" />

			{/* Main Content Area */}
			<main
				className={cn(
					'flex-1 md:w-3xl lg:w-5xl md:mx-auto flex flex-row justify-center',
					location === '/' ? '' : 'md:pt-4',
				)}
			>
				{children}
			</main>

			{/* Mobile Bottom Navigation */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-lg z-50 pb-safe shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
				<div className="flex justify-around items-center h-16">
					{navItems.map((item) => {
						const Icon = item.icon
						// Exact match for home, startsWith for others
						const isActive =
							item.href === '/'
								? location === '/'
								: location.startsWith(item.href)

						return (
							<Link key={item.href} href={item.href}>
								<div
									className={cn(
										'flex flex-col items-center justify-center w-16 h-full gap-1 transition-all active:scale-95 cursor-pointer relative',
										isActive
											? 'text-primary font-medium'
											: 'text-muted-foreground hover:text-foreground',
									)}
								>
									<Icon
										className={cn(
											'w-6 h-6 transition-all',
											isActive ? 'scale-110' : 'scale-100',
										)}
										strokeWidth={isActive ? 2.5 : 2}
									/>
									<span className="text-[10px]">{item.label}</span>
								</div>
							</Link>
						)
					})}
				</div>
			</nav>
			<div className="md:hidden h-16" />

			<ScrollRestorer />
		</div>
	)
}
