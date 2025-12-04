import type { Target, Voivodeship } from '../types'

interface EventSubtitleProps {
	target: Target
	customTitle: string
	isEventToday: boolean
	nextTarget: Target | null
	targetDateYear: number
	selectedVoivodeship: Voivodeship
}

export const EventSubtitle = ({
	target,
	customTitle,
	isEventToday,
	nextTarget,
	targetDateYear,
	selectedVoivodeship,
}: EventSubtitleProps) => {
	const getVoivodeshipNumber = () => {
		switch (selectedVoivodeship) {
			case 'group1':
				return '1'
			case 'group2':
				return '2'
			case 'group3':
				return '3'
			case 'group4':
				return '4'
		}
	}

	const getEventName = () => {
		switch (target) {
			case 'newyear':
				return 'Sylwestra'
			case 'easter':
				return 'Wielkanocy'
			case 'valentines':
				return 'Walentynek'
			case 'christmas':
				return 'Świąt Bożego Narodzenia'
			case 'summer':
				return 'Wakacji'
			case 'winterbreak':
				return 'Zimowej Przerwy Świątecznej'
			case 'springbreak':
				return 'Wiosennej Przerwy Świątecznej'
			case 'endofyear':
				return 'Końca Roku Szkolnego'
			default:
				return 'Roku Szkolnego'
		}
	}

	const getSubtitleText = () => {
		if (target === 'custom') return `do "${customTitle || 'Moje odliczanie'}"`
		if (isEventToday && nextTarget === 'schoolyear') return `do końca wakacji (Rok Szkolny ${targetDateYear})`
		if (target === 'winterholidays') return `do Ferii Zimowych Grupa ${getVoivodeshipNumber()} ${targetDateYear}r.`
		return `do ${getEventName()}`
	}

	const shouldShowYear = () => {
		return !isEventToday && !['winterholidays', 'winterbreak', 'springbreak', 'endofyear'].includes(target)
	}

	return (
		<p className="subtitle">
			{getSubtitleText()} {shouldShowYear() && <span className="bold">{targetDateYear}r.</span>}
		</p>
	)
}
