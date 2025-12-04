export const Fireworks = () => {
	return (
		<div className="fireworks">
			{Array.from({ length: 6 }, (_, i) => (
				<div key={i} className={`burst burst-${i}`} />
			))}
		</div>
	)
}
