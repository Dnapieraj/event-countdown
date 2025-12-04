import { useState, useEffect } from 'react'
import './App.css'
import type { Target, TimeLeft, Voivodeship } from './types'
import { getTargetDate, checkIfEventIsToday } from './utils/dateUtils'
import { getTargetConfig } from './config/targetConfig'
import { EventModal } from './components/EventModal'
import { VoivodeshipMenu } from './components/VoivodeshipMenu'
import { BackgroundElements } from './components/BackgroundElements'
import { SnowEffect } from './components/SnowEffect'
import { Fireworks } from './components/Fireworks'
import { Lights } from './components/Lights'
import { TimerDisplay } from './components/TimerDisplay'
import { EventTitle } from './components/EventTitle'
import { EventSubtitle } from './components/EventSubtitle'

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
	const [selectedVoivodeship, setSelectedVoivodeship] = useState<Voivodeship>('group1')
	const [showVoivodeshipMenu, setShowVoivodeshipMenu] = useState(false)

	useEffect(() => {
		const calculateTimeLeft = () => {
			const now = new Date()
			let currentTarget = target
			let nextEvent: Target | null = null

			if (target === 'summer' && checkIfEventIsToday(now, 'summer')) {
				currentTarget = 'schoolyear'
				nextEvent = 'schoolyear'
			}

			const targetDate = getTargetDate(now, currentTarget, customDate, customTime, selectedVoivodeship)
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
	}, [target, customDate, customTime, selectedVoivodeship])

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

	const handleSelectVoivodeship = (selectedTarget: Target, voivodeship: Voivodeship) => {
		setTarget(selectedTarget)
		setSelectedVoivodeship(voivodeship)
		setShowModal(false)
	}

	const handleCustomSubmit = () => {
		if (customDate) {
			setShowModal(false)
		}
	}

	return (
		<div className={`app ${cfg.dark ? 'theme-dark' : 'theme-normal'}`}>
			<EventModal
				showModal={showModal}
				target={target}
				customDate={customDate}
				customTime={customTime}
				customTitle={customTitle}
				showVoivodeshipMenu={showVoivodeshipMenu}
				onSelectEvent={handleSelectEvent}
				onCustomDateChange={setCustomDate}
				onCustomTimeChange={setCustomTime}
				onCustomTitleChange={setCustomTitle}
				onCustomSubmit={handleCustomSubmit}
				onToggleVoivodeshipMenu={() => setShowVoivodeshipMenu(!showVoivodeshipMenu)}
			/>

			<VoivodeshipMenu
				showMenu={showVoivodeshipMenu}
				onClose={() => setShowVoivodeshipMenu(false)}
				onSelectEvent={handleSelectEvent}
				onSelectVoivodeship={handleSelectVoivodeship}
			/>

			<button className="change-event-btn" onClick={() => setShowModal(true)} title="Zmień wydarzenie">
				⚙️
			</button>

			<button className="theme-toggle-btn" onClick={toggleTheme} title="Zmień motyw">
				{userTheme === 'dark' ? '🌙' : '☀️'}
			</button>

			<BackgroundElements userTheme={userTheme} showTrees={cfg.showTrees} showSnow={cfg.showSnow} />

			{cfg.showSnow && <SnowEffect />}
			{cfg.fireworks && <Fireworks />}

			<div className="content">
				{cfg.centerIcon && <div className="christmas-tree">{cfg.centerIcon}</div>}

				<EventTitle
					target={target}
					customTitle={customTitle}
					isChristmas={isChristmas}
					isEventToday={isEventToday}
					nextTarget={nextTarget}
					selectedVoivodeship={selectedVoivodeship}
				/>

				{!isChristmas || target !== 'christmas' ? (
					<>
						<TimerDisplay timeLeft={timeLeft} />
						<EventSubtitle
							target={target}
							customTitle={customTitle}
							isEventToday={isEventToday}
							nextTarget={nextTarget}
							targetDateYear={targetDateYear}
							selectedVoivodeship={selectedVoivodeship}
						/>
						{cfg.showSnowman && <div className="snowman">⛄</div>}
					</>
				) : (
					<div className="celebration">
						<p className="celebration-text">🎉 Dzisiaj jest Boże Narodzenie! 🎉</p>
						<div className="gifts">🎁 🎁 🎁</div>
					</div>
				)}
			</div>

			{cfg.lights && <Lights />}
		</div>
	)
}

export default App
