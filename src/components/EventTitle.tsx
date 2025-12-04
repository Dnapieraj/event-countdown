import type { Target, Voivodeship } from '../types'

interface EventTitleProps {
	target: Target
	customTitle: string
	isChristmas: boolean
	isEventToday: boolean
	nextTarget: Target | null
	selectedVoivodeship: Voivodeship
}

export const EventTitle = ({
	target,
	customTitle,
	isChristmas,
	isEventToday,
	nextTarget,
	selectedVoivodeship,
}: EventTitleProps) => {
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

	const getTitle = () => {
		if (target === 'custom') return customTitle || '✨ Moje odliczanie ✨'
		if (target === 'christmas')
			return isChristmas ? '🎅 Wesołych Świąt! 🎄' : '✨ Odliczanie do Świąt Bożego Narodzenia ✨'
		if (target === 'newyear') return isEventToday ? '🎉 Szczęśliwego Nowego Roku! 🎆' : '🎆 Odliczanie do Sylwestra 🎇'
		if (target === 'easter')
			return isEventToday ? '🐰 Wesołych Świąt Wielkanocnych! 🥚' : '✨ Odliczanie do Wielkanocy ✨'
		if (target === 'valentines')
			return isEventToday ? '💖 Szczęśliwych Walentynek! 💝' : '💘 Odliczanie do Walentynek 💘'
		if (target === 'summer') {
			if (isEventToday && nextTarget === 'schoolyear') return '🏖️ Trwają Wakacje! ☀️'
			if (isEventToday) return '🎉 Zaczęły się Wakacje! 🏖️'
			return '☀️ Odliczanie do Wakacji 🏖️'
		}
		if (target === 'schoolyear') return '📚 Odliczanie do Roku Szkolnego 🎒'
		if (target === 'winterbreak') return '❄️ Odliczanie do Zimowej Przerwy Świątecznej ❄️'
		if (target === 'winterholidays') return `⛷️ Odliczanie do Ferii Zimowych Grupa ${getVoivodeshipNumber()} ⛷️`
		if (target === 'springbreak') return '🌸 Odliczanie do Wiosennej Przerwy Świątecznej 🌸'
		if (target === 'endofyear') return '📚 Odliczanie do Końca Roku Szkolnego 📚'
		return '✨ Odliczanie ✨'
	}

	return <h1 className="title">{getTitle()}</h1>
}
