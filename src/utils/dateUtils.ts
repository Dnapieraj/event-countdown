import type { Target, Voivodeship } from '../types'

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

export const getTargetDate = (
	now: Date,
	target: Target,
	customDate?: string,
	customTime?: string,
	voivodeship?: Voivodeship
) => {
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
			: target === 'winterbreak'
			? new Date(y, 11, 22)
			: target === 'springbreak'
			? new Date(y, 3, 2)
			: target === 'endofyear'
			? new Date(y, 5, 26)
			: target === 'winterholidays'
			? (() => {
					const dates: Record<Voivodeship, Date> = {
						group1: new Date(y, 0, 19),
						group2: new Date(y, 0, 26),
						group3: new Date(y, 1, 2),
						group4: new Date(y, 1, 9),
					}
					return dates[voivodeship || 'group1']
			  })()
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

export const checkIfEventIsToday = (now: Date, eventTarget: Target): boolean => {
	const month = now.getMonth()
	const day = now.getDate()
	if (eventTarget === 'christmas') return month === 11 && day === 25
	if (eventTarget === 'newyear') return month === 11 && day === 31
	if (eventTarget === 'valentines') return month === 1 && day === 14
	if (eventTarget === 'summer') {
		return (month === 6 && day >= 1) || month === 7 || (month === 8 && day <= 31)
	}
	if (eventTarget === 'schoolyear') return month === 8 && day === 1
	if (eventTarget === 'winterbreak') return month === 11 && day >= 22 && day <= 31
	if (eventTarget === 'springbreak') return month === 3 && day >= 2 && day <= 7
	if (eventTarget === 'endofyear') return month === 5 && day === 26
	if (eventTarget === 'winterholidays') {
		const group1 = month === 0 && day >= 19 && day <= 31 && (month === 0 || (month === 1 && day <= 1))
		const group2 = month === 0 && day >= 26 && day <= 31 && (month === 0 || (month === 1 && day <= 8))
		const group3 = month === 1 && day >= 2 && day <= 15
		const group4 = month === 1 && day >= 9 && day <= 22
		return group1 || group2 || group3 || group4
	}
	return false
}

export const formatNumber = (n: number) => String(n).padStart(2, '0')
