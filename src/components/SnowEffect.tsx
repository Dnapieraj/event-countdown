import { snowflakes } from '../config/constants'

export const SnowEffect = () => {
	return (
		<div className="snow-container">
			{snowflakes.map(flake => (
				<div
					key={flake.id}
					className="snowflake"
					style={{
						left: `${flake.left}%`,
						animationDelay: `${flake.delay}s`,
						animationDuration: `${flake.duration}s`,
						width: `${flake.size}px`,
						height: `${flake.size}px`,
					}}>
					❄
				</div>
			))}
		</div>
	)
}
