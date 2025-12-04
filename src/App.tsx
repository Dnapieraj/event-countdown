import { useState, useEffect } from 'react'
import './App.css'

type Target = 'christmas' | 'newyear' | 'easter' | 'valentines' | 'custom' | 'summer' | 'schoolyear'

interface TimeLeft {
	days: number
	hours: number
	minutes: number
	seconds: number
	year?: number
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
			: target === 'summer'
			? new Date(y, 6, 1)
			: target === 'schoolyear'
			? new Date(y, 8, 1)
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
	const [userTheme, setUserTheme] = useState<'light' | 'dark'>('dark')
	const [isEventToday, setIsEventToday] = useState(false)
	const [nextTarget, setNextTarget] = useState<Target | null>(null)

	useEffect(() => {
		const checkIfEventIsToday = (now: Date, eventTarget: Target): boolean => {
			const month = now.getMonth()
			const day = now.getDate()
			if (eventTarget === 'christmas') return month === 11 && day === 25
			if (eventTarget === 'newyear') return month === 11 && day === 31
			if (eventTarget === 'valentines') return month === 1 && day === 14
			if (eventTarget === 'summer') {
				// Wakacje trwają od 1 lipca do 31 sierpnia
				return (month === 6 && day >= 1) || month === 7 || (month === 8 && day <= 31)
			}
			if (eventTarget === 'schoolyear') return month === 8 && day === 1
			return false
		}

		const calculateTimeLeft = () => {
			const now = new Date()
			let currentTarget = target
			let nextEvent: Target | null = null

			// Sprawdź czy dziś są wakacje - jeśli tak, odliczaj do roku szkolnego
			if (target === 'summer' && checkIfEventIsToday(now, 'summer')) {
				currentTarget = 'schoolyear'
				nextEvent = 'schoolyear'
			}

			const targetDate = getTargetDate(now, currentTarget, customDate, customTime)
			const diff = targetDate.getTime() - now.getTime()
			const isTodayChristmas = now.getMonth() === 11 && now.getDate() === 25
			const eventIsToday = checkIfEventIsToday(now, target)

			if (diff <= 0) {
				return {
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 0,
					isChristmas: isTodayChristmas,
					eventIsToday,
					nextEvent,
					year: targetDate.getFullYear(),
				}
			}
			return {
				days: Math.floor(diff / (1000 * 60 * 60 * 24)),
				hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((diff / 1000 / 60) % 60),
				seconds: Math.floor((diff / 1000) % 60),
				isChristmas: isTodayChristmas,
				eventIsToday,
				nextEvent,
				year: targetDate.getFullYear(),
			}
		}
		const updateTime = () => {
			const result = calculateTimeLeft()
			setTimeLeft(result)
			setIsChristmas(result.isChristmas)
			setIsEventToday(result.eventIsToday || false)
			setNextTarget(result.nextEvent || null)
		}
		updateTime()
		const timer = setInterval(updateTime, 1000)
		return () => clearInterval(timer)
	}, [target, customDate, customTime])

	const formatNumber = (n: number) => String(n).padStart(2, '0')

	const cfg = getTargetConfig(target, userTheme)
	const targetDateYear = timeLeft.year || new Date().getFullYear()

	const toggleTheme = () => {
		setUserTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
	}

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
							<button className="modal-btn" onClick={() => handleSelectEvent('summer')}>
								☀️ Wakacje
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

			<button className="theme-toggle-btn" onClick={toggleTheme} title="Zmień motyw">
				{userTheme === 'dark' ? '🌙' : '☀️'}
			</button>

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
						? isEventToday
							? '🎉 Szczęśliwego Nowego Roku! 🎆'
							: '🎆 Odliczanie do Sylwestra 🎇'
						: target === 'easter'
						? isEventToday
							? '🐰 Wesołych Świąt Wielkanocnych! 🥚'
							: '✨ Odliczanie do Wielkanocy ✨'
						: target === 'valentines'
						? isEventToday
							? '💖 Szczęśliwych Walentynek! 💝'
							: '💘 Odliczanie do Walentynek 💘'
						: target === 'summer'
						? isEventToday && nextTarget === 'schoolyear'
							? '🏖️ Trwają Wakacje! ☀️'
							: isEventToday
							? '🎉 Zaczęły się Wakacje! 🏖️'
							: '☀️ Odliczanie do Wakacji 🏖️'
						: target === 'schoolyear'
						? '📚 Odliczanie do Roku Szkolnego 🎒'
						: '✨ Odliczanie ✨'}
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
								: isEventToday && nextTarget === 'schoolyear'
								? `do końca wakacji (Rok Szkolny ${targetDateYear})`
								: `do ${
										target === 'newyear'
											? 'Sylwestra'
											: target === 'easter'
											? 'Wielkanocy'
											: target === 'valentines'
											? 'Walentynek'
											: target === 'christmas'
											? 'Świąt Bożego Narodzenia'
											: target === 'summer'
											? 'Wakacji'
											: 'Roku Szkolnego'
								  }`}{' '}
							{!isEventToday && <span className="bold">{targetDateYear}r.</span>}
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

function getTargetConfig(target: Target, userTheme: 'light' | 'dark' = 'dark') {
	switch (target) {
		case 'christmas':
			return {
				dark: userTheme === 'dark',
				showTrees: true,
				showSnow: true,
				showSnowman: true,
				fireworks: false,
				lights: true,
				centerIcon: '🎄',
			}
		case 'newyear':
			return {
				dark: userTheme === 'dark',
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: true,
				lights: false,
				centerIcon: '🎆',
			}
		case 'easter':
			return {
				dark: userTheme === 'dark',
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '🥚🎨',
			}
		case 'valentines':
			return {
				dark: userTheme === 'dark',
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '💘💝',
			}
		case 'custom':
			return {
				dark: userTheme === 'dark',
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '✨',
			}
		case 'summer':
			return {
				dark: userTheme === 'dark',
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '☀️',
			}
		case 'schoolyear':
			return {
				dark: userTheme === 'dark',
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '📚',
			}
		default:
			return {
				dark: userTheme === 'dark',
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
