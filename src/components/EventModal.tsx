import type { Target } from '../types'

interface EventModalProps {
	showModal: boolean
	target: Target
	customDate: string
	customTime: string
	customTitle: string
	showVoivodeshipMenu: boolean
	onSelectEvent: (target: Target) => void
	onCustomDateChange: (date: string) => void
	onCustomTimeChange: (time: string) => void
	onCustomTitleChange: (title: string) => void
	onCustomSubmit: () => void
	onToggleVoivodeshipMenu: () => void
}

export const EventModal = ({
	showModal,
	target,
	customDate,
	customTime,
	customTitle,
	onSelectEvent,
	onCustomDateChange,
	onCustomTimeChange,
	onCustomTitleChange,
	onCustomSubmit,
	onToggleVoivodeshipMenu,
}: EventModalProps) => {
	if (!showModal) return null

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2 className="modal-title">✨ Do czego chcesz odliczać? ✨</h2>
				<div className="modal-options">
					<button className="modal-btn" onClick={() => onSelectEvent('christmas')}>
						🎄 Boże Narodzenie
					</button>
					<button className="modal-btn" onClick={() => onSelectEvent('newyear')}>
						🎆 Sylwester
					</button>
					<button className="modal-btn" onClick={() => onSelectEvent('easter')}>
						🥚 Wielkanoc
					</button>
					<button className="modal-btn" onClick={() => onSelectEvent('valentines')}>
						💘 Walentynki
					</button>
					<button className="modal-btn" onClick={() => onSelectEvent('summer')}>
						☀️ Wakacje
					</button>
					<button className="modal-btn" onClick={onToggleVoivodeshipMenu}>
						❄️ Przerwy Szkolne
					</button>
					<button className="modal-btn" onClick={() => onSelectEvent('custom')}>
						✨ Własny cel
					</button>
				</div>

				{target === 'custom' && (
					<div className="modal-custom">
						<input
							type="date"
							value={customDate}
							onChange={e => onCustomDateChange(e.target.value)}
							className="modal-input"
							placeholder="Data"
						/>
						<input
							type="time"
							value={customTime}
							onChange={e => onCustomTimeChange(e.target.value)}
							className="modal-input"
							placeholder="Godzina (opcjonalne)"
						/>
						<input
							type="text"
							value={customTitle}
							onChange={e => onCustomTitleChange(e.target.value)}
							className="modal-input"
							placeholder="Tytuł odliczania"
						/>
						<button className="modal-btn-confirm" onClick={onCustomSubmit}>
							Zatwierdź
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
