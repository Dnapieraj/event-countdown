export const starPositions = Array.from({ length: 30 }, () => ({
	top: `${Math.random() * 50}%`,
	left: `${Math.random() * 100}%`,
	size: `${0.3 + Math.random() * 0.4}rem`,
}))

export const snowflakes = Array.from({ length: 150 }, (_, i) => ({
	id: i,
	left: Math.random() * 100,
	delay: -(Math.random() * 20),
	duration: 10 + Math.random() * 15,
	size: 3 + Math.random() * 6,
}))
