import type { Target } from '../types'

export interface TargetConfig {
	dark: boolean
	showTrees: boolean
	showSnow: boolean
	showSnowman: boolean
	fireworks: boolean
	lights: boolean
	centerIcon: string
}

export const getTargetConfig = (target: Target, userTheme: 'light' | 'dark' = 'dark'): TargetConfig => {
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
		case 'winterbreak':
			return {
				dark: userTheme === 'dark',
				showTrees: false,
				showSnow: true,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '❄️',
			}
		case 'winterholidays':
			return {
				dark: userTheme === 'dark',
				showTrees: false,
				showSnow: true,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '⛷️',
			}
		case 'springbreak':
			return {
				dark: userTheme === 'dark',
				showTrees: false,
				showSnow: false,
				showSnowman: false,
				fireworks: false,
				lights: false,
				centerIcon: '🌸',
			}
		case 'endofyear':
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
