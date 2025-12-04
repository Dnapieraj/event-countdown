import type { TimeLeft } from '../types'
import { formatNumber } from '../utils/dateUtils'

interface TimerDisplayProps {
	timeLeft: TimeLeft
}

export const TimerDisplay = ({ timeLeft }: TimerDisplayProps) => {
	return (
		<div className="timer-grid">
			<div className="timer-box">
				<div className="timer-number">{formatNumber(timeLeft.days)}</div>
				<div className="timer-label">Dni</div>
			</div>
			<div className="timer-separator">:</div>
			<div className="timer-box">
				<div className="timer-number">{formatNumber(timeLeft.hours)}</div>
				<div className="timer-label">Godzin</div>
			</div>
			<div className="timer-separator">:</div>
			<div className="timer-box">
				<div className="timer-number">{formatNumber(timeLeft.minutes)}</div>
				<div className="timer-label">Minut</div>
			</div>
			<div className="timer-separator">:</div>
			<div className="timer-box">
				<div className="timer-number">{formatNumber(timeLeft.seconds)}</div>
				<div className="timer-label">Sekund</div>
			</div>
		</div>
	)
}
