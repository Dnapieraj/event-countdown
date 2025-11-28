import { useState, useEffect } from 'react'
import './App.css'

type Target = 'christmas' | 'newyear' | 'easter' | 'valentines' | 'independence' | 'custom'

interface TimeLeft {
	days: number
	hours: number
	minutes: number
	seconds: number
}

const starPositions = Array.from({ length: 30 }, () => ({
	top: `${Math.random() * 50}%`,
	left: `${Math.random() * 100}%`,
	size: `${0.3 + Math.random() * 0.4}rem`,
}))

const snowflakes = Array.from({ length: 150 }, (_, i) => ({
	id: i,
	left: Math.random() * 100,
	delay: -(Math.random() * 20),
	duration: 10 + Math.random() * 15,
	size: 3 + Math.random() * 6,
}))

const getTargetDate = (now: Date, target: Target, customDate?: string, customTime?: string) => {
	const y = now.getFullYear()
	const date =
		target === 'christmas'
			? new Date(y, 11, 25)
			: target === 'newyear'
			? new Date(y, 11, 31, 23, 59, 59)
			: target === 'easter'
			? computeEaster(y)
			: target === 'valentines'
			? new Date(y, 1, 14)
			: target === 'independence'
			? new Date(y, 10, 11)
			: customDate
			? (() => {
					const [year, month, day] = customDate.split('-').map(Number)
					if (customTime) {
						const [hours, minutes] = customTime.split(':').map(Number)
						return new Date(year, month - 1, day, hours, minutes, 0)
					}
					return new Date(year, month - 1, day, 23, 59, 59)
			  })()
			: new Date(y, 11, 25)
	return now > date
		? new Date(
				date.getFullYear() + 1,
				date.getMonth(),
				date.getDate(),
				date.getHours(),
				date.getMinutes(),
				date.getSeconds()
		  )
		: date
}

function computeEaster(year: number) {
	const a = year % 19
	const b = Math.floor(year / 100)
	const c = year % 100
	const d = Math.floor(b / 4)
	const e = b % 4
	const f = Math.floor((b + 8) / 25)
	const g = Math.floor((b - f + 1) / 3)
	const h = (19 * a + b - d - g + 15) % 30
	const i = Math.floor(c / 4)
	const k = c % 4
	const l = (32 + 2 * e + 2 * i - h - k) % 7
	const m = Math.floor((a + 11 * h + 22 * l) / 451)
	const month = Math.floor((h + l - 7 * m + 114) / 31) - 1
	const day = ((h + l - 7 * m + 114) % 31) + 1
	return new Date(year, month, day)
}

function App() {
	const [target, setTarget] = useState<Target>('christmas')
	const [customTitle, setCustomTitle] = useState('✨ Moje odliczanie ✨')
	const [customDate, setCustomDate] = useState<string>('')
	const [customTime, setCustomTime] = useState<string>('')
	const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
	const [isChristmas, setIsChristmas] = useState(false)
	const [showModal, setShowModal] = useState(true)

	useEffect(() => {
		const calculateTimeLeft = () => {
			const now = new Date()
			const targetDate = getTargetDate(now, target, customDate, customTime)
			const diff = targetDate.getTime() - now.getTime()
			const isTodayChristmas = now.getMonth() === 11 && now.getDate() === 25

			if (diff <= 0) {
				return { days: 0, hours: 0, minutes: 0, seconds: 0, isChristmas: isTodayChristmas }
			}
			return {
				days: Math.floor(diff / (1000 * 60 * 60 * 24)),
				hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((diff / 1000 / 60) % 60),
				seconds: Math.floor((diff / 1000) % 60),
				isChristmas: isTodayChristmas,
			}
		}
		const updateTime = () => {
			const result = calculateTimeLeft()
			setTimeLeft(result)
			setIsChristmas(result.isChristmas)
		}
		updateTime()
		const timer = setInterval(updateTime, 1000)
		return () => clearInterval(timer)
	}, [target, customDate, customTime])

	const formatNumber = (n: number) => String(n).padStart(2, '0')

	const cfg = getTargetConfig(target)

	const now = new Date()
	const targetDateYear = getTargetDate(now, target, customDate, customTime).getFullYear()

	const handleSelectEvent = (selectedTarget: Target) => {
		setTarget(selectedTarget)
		if (selectedTarget !== 'custom') {
			setShowModal(false)
		}
	}

	const handleCustomSubmit = () => {
		if (customDate) {
			setShowModal(false)
		}
	}

	const handleCloseModal = () => {
		if (target === 'custom' && !customDate) {
			return
		}
		setShowModal(false)
	}

	return (
		<div className={`app ${cfg.dark ? 'theme-dark' : 'theme-normal'}`}>
			{showModal && (
				<div className="modal-overlay">
					<div className="modal-content">
						<h2 className="modal-title">✨ Do czego chcesz odliczać? ✨</h2>
						<div className="modal-options">
							<button className="modal-btn" onClick={() => handleSelectEvent('christmas')}>
								🎄 Boże Narodzenie
							</button>
							<button className="modal-btn" onClick={() => handleSelectEvent('newyear')}>
								🎆 Sylwester
							</button>
							<button className="modal-btn" onClick={() => handleSelectEvent('easter')}>
								🥚 Wielkanoc
							</button>
							<button className="modal-btn" onClick={() => handleSelectEvent('valentines')}>
								💘 Walentynki
							</button>
							<button className="modal-btn" onClick={() => handleSelectEvent('independence')}>
								🇵🇱 Dzień Niepodległości
							</button>
							<button className="modal-btn" onClick={() => handleSelectEvent('custom')}>
								✨ Własny cel
							</button>
						</div>
						{target === 'custom' && (
							<div className="modal-custom">
								<input
									type="date"
									value={customDate}
									onChange={e => setCustomDate(e.target.value)}
									className="modal-input"
									placeholder="Data"
								/>
								<input
									type="time"
									value={customTime}
									onChange={e => setCustomTime(e.target.value)}
									className="modal-input"
									placeholder="Godzina (opcjonalne)"
								/>
								<input
									type="text"
									value={customTitle}
									onChange={e => setCustomTitle(e.target.value)}
									className="modal-input"
									placeholder="Tytuł odliczania"
								/>
								<button className="modal-btn-confirm" onClick={handleCustomSubmit}>
									Zatwierdź
								</button>
							</div>
						)}
					</div>
				</div>
			)}

			<button className="change-event-btn" onClick={() => setShowModal(true)} title="Zmień wydarzenie">
				⚙️
			</button>

			<div className="moon">🌙</div>
			<div className="stars">
				{starPositions.map((star, i) => (
					<div key={i} className="star" style={{ top: star.top, left: star.left, fontSize: star.size }}>
						⭐
					</div>
				))}
			</div>

			{cfg.showTrees && (
				<>
					<div className="background-tree left-tree">🎄</div>
					<div className="background-tree right-tree">🎄</div>
				</>
			)}

			{cfg.showSnow && <div className="snow-ground"></div>}
			{cfg.showSnow && (
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
			)}

			{cfg.fireworks && (
				<div className="fireworks">
					{Array.from({ length: 6 }, (_, i) => (
						<div key={i} className={`burst burst-${i}`} />
					))}
				</div>
			)}

			<div className="content">
				{cfg.centerIcon && <div className="christmas-tree">{cfg.centerIcon}</div>}
				<h1 className="title">
					{target === 'custom'
						? customTitle || '✨ Moje odliczanie ✨'
						: target === 'christmas'
						? isChristmas
							? '🎅 Wesołych Świąt! 🎄'
							: '✨ Odliczanie do Świąt Bożego Narodzenia ✨'
						: target === 'newyear'
						? '🎆 Odliczanie do Sylwestra 🎇'
						: target === 'easter'
						? '✨ Odliczanie do Wielkanocy ✨'
						: target === 'valentines'
						? '💘 Odliczanie do Walentynek 💘'
						: '🦅 Odliczanie do Dnia Niepodległości 🦅'}
				</h1>

				{!isChristmas || target !== 'christmas' ? (
					<>
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
						<p className="subtitle">
							{target === 'custom'
								? `do "${customTitle || 'Moje odliczanie'}"`
								: `do ${
										target === 'newyear'
											? 'Sylwestra'
											: target === 'easter'
											? 'Wielkanocy'
											: target === 'valentines'
											? 'Walentynkowej'
											: target === 'christmas'
											? 'Świąt Bożego Narodzenia'
											: 'Dnia Niepodległości'
								  }`}{' '}
							<span className="bold">{targetDateYear}r.</span>
						</p>
						{cfg.showSnowman && <div className="snowman">⛄</div>}
					</>
				) : (
					<div className="celebration">
						<p className="celebration-text">🎉 Dzisiaj jest Boże Narodzenie! 🎉</p>
						<div className="gifts">🎁 🎁 🎁</div>
					</div>
				)}
			</div>

			{cfg.lights && (
				<div className="lights">
					{Array.from({ length: 20 }, (_, i) => (
						<div key={i} className="light" style={{ left: `${i * 5 + 2.5}%`, animationDelay: `${i * 0.1}s` }} />
					))}
				</div>
			)}
		</div>
	)
}

function getTargetConfig(target: Target) {
	switch (target) {
		case 'christmas':
			return {
				dark: false,
				showTrees: true,
				showSnow: true,
				showSnowman: true,
				fireworks: false,
				lights: true,
				centerIcon: '🎄',
			}
		case 'newyear':
			return {
				dark: true,
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: true,
				lights: false,
				centerIcon: '🎆',
			}
		case 'easter':
			return {
				dark: false,
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '🥚🎨',
			}
		case 'valentines':
			return {
				dark: false,
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '💘💝',
			}
		case 'independence':
			return {
				dark: false,
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '🦅',
			}
		case 'custom':
			return {
				dark: true,
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '✨',
			}
		default:
			return {
				dark: false,
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '✨',
			}
	}
}

export default App
