import type { Target, Voivodeship } from '../types'

interface VoivodeshipMenuProps {
	showMenu: boolean
	onClose: () => void
	onSelectEvent: (target: Target) => void
	onSelectVoivodeship: (target: Target, voivodeship: Voivodeship) => void
}

export const VoivodeshipMenu = ({ showMenu, onClose, onSelectEvent, onSelectVoivodeship }: VoivodeshipMenuProps) => {
	if (!showMenu) return null

	return (
		<div className="voivodeship-menu">
			<div className="voivodeship-header">
				<h3 className="voivodeship-title">📅 Przerwy Szkolne</h3>
				<button className="close-menu-btn" onClick={onClose}>
					✕
				</button>
			</div>
			<div className="voivodeship-options">
				<div className="breaks-section">
					<h4 className="section-title">❄️ Ferie Zimowe 2025/2026</h4>
					<button
						className="voivodeship-btn break-btn"
						onClick={() => {
							onSelectEvent('winterbreak')
							onClose()
						}}>
						<span className="btn-label">Zimowa Przerwa Świąteczna 2025</span>
						<span className="btn-date">22-31 grudnia 2025</span>
					</button>
					<div className="holidays-subsection">
						<h5 className="subsection-title">FERIE ZIMOWE 2026</h5>
						<button
							className="voivodeship-btn group-btn group-1"
							onClick={() => {
								onSelectVoivodeship('winterholidays', 'group1')
								onClose()
							}}>
							<span className="group-number">Grupa 1</span>
							<span className="group-info">
								Kujawsko-Pomorskie, Lubuskie, Małopolskie, Świętokrzyskie, Wielkopolskie
							</span>
							<span className="group-date">19.01 - 1.02.2026</span>
						</button>
						<button
							className="voivodeship-btn group-btn group-2"
							onClick={() => {
								onSelectVoivodeship('winterholidays', 'group2')
								onClose()
							}}>
							<span className="group-number">Grupa 2</span>
							<span className="group-info">Podlaskie, Warmińsko-Mazurskie</span>
							<span className="group-date">26.01 - 8.02.2026</span>
						</button>
						<button
							className="voivodeship-btn group-btn group-3"
							onClick={() => {
								onSelectVoivodeship('winterholidays', 'group3')
								onClose()
							}}>
							<span className="group-number">Grupa 3</span>
							<span className="group-info">Dolnośląskie, Mazowieckie, Opolskie, Zachodniopomorskie</span>
							<span className="group-date">2.02 - 15.02.2026</span>
						</button>
						<button
							className="voivodeship-btn group-btn group-4"
							onClick={() => {
								onSelectVoivodeship('winterholidays', 'group4')
								onClose()
							}}>
							<span className="group-number">Grupa 4</span>
							<span className="group-info">Lubelskie, Łódzkie, Podkarpackie, Pomorskie, Śląskie</span>
							<span className="group-date">9.02 - 22.02.2026</span>
						</button>
					</div>
				</div>

				<div className="breaks-section">
					<h4 className="section-title">🌸 Wiosenne Przerwy</h4>
					<button
						className="voivodeship-btn break-btn"
						onClick={() => {
							onSelectEvent('springbreak')
							onClose()
						}}>
						<span className="btn-label">Wiosenna Przerwa Świąteczna 2026</span>
						<span className="btn-date">2-7 kwietnia 2026</span>
					</button>
				</div>
			</div>
		</div>
	)
}
