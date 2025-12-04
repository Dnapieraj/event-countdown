export type Target =
	| 'christmas'
	| 'newyear'
	| 'easter'
	| 'valentines'
	| 'custom'
	| 'summer'
	| 'schoolyear'
	| 'winterbreak'
	| 'winterholidays'
	| 'springbreak'
	| 'endofyear'

export type Voivodeship = 'group1' | 'group2' | 'group3' | 'group4'

export interface TimeLeft {
	days: number
	hours: number
	minutes: number
	seconds: number
	year?: number
}
