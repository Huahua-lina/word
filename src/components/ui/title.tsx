export const Title: React.FC<React.PropsWithChildren<{ extra?: string }>> = ({
	children,
	extra,
}) => {
	return (
		<>
			<h1 className="text-xl font-sans font-bold text-foreground tracking-tight">
				{children}
			</h1>
			{extra ? (
				<p className="text-xs text-muted-foreground/80 font-sans leading-relaxed max-w-lg">
					{extra}
				</p>
			) : null}
		</>
	)
}
