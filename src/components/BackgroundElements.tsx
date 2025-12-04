import { starPositions } from '../config/constants'

interface BackgroundElementsProps {
	userTheme: 'light' | 'dark'
	showTrees: boolean
	showSnow: boolean
}

export const BackgroundElements = ({ userTheme, showTrees, showSnow }: BackgroundElementsProps) => {
	return (
		<>
			{userTheme === 'dark' ? (
				<>
					<div className="moon">🌙</div>
					<div className="stars">
						{starPositions.map((star, i) => (
							<div key={i} className="star" style={{ top: star.top, left: star.left, fontSize: star.size }}>
								⭐
							</div>
						))}
					</div>
				</>
			) : (
				<div className="sun">☀️</div>
			)}

			{showTrees && (
				<>
					<div className="background-tree left-tree">🎄</div>
					<div className="background-tree right-tree">🎄</div>
				</>
			)}

			{showSnow && <div className="snow-ground"></div>}
		</>
	)
}
