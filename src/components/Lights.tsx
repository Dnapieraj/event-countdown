export const Lights = () => {
	return (
		<div className="lights">
			{Array.from({ length: 20 }, (_, i) => (
				<div key={i} className="light" style={{ left: `${i * 5 + 2.5}%`, animationDelay: `${i * 0.1}s` }} />
			))}
		</div>
	)
}
