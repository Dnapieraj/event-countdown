# Event Countdown ⏳✨

Interactive web application for counting down to important events with animations and visual effects!

## 🎯 Features

- ⏰ **Precise countdown**: days, hours, minutes, seconds in real-time
- 🎄 **Built-in holidays**: Christmas, New Year's Eve, Easter, Valentine's Day
- 🏫 **School breaks**: Winter holidays (4 regional groups), holiday breaks, summer vacation
- ✨ **Custom event**: add any date with custom title
- 🌙☀️ **Light/Dark themes**: toggle view with icon
- 🎨 **Dynamic backgrounds**: snow, fireworks, lights, special effects
- 📱 **Responsive design**: works on desktop, tablet, and mobile
- 🎭 **Animations**: different effects for each event type

## 🚀 Quick Start

### Requirements

- Node.js (version 20.19+ or 22.12+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Dnapieraj/event-countdown.git

# Navigate to directory
cd event-countdown

# Install dependencies
npm install
```

### Development Mode

```bash
npm run dev
```

The app will be available at: `http://localhost:5173`

### Production Build

```bash
npm run build
```

## 🛠️ Technologies

- **React 18** – UI library
- **TypeScript** – static typing
- **Vite** – fast bundler and dev server
- **CSS3** – animations, gradients, visual effects
- **Modular Architecture** – components split into logical modules

## 🎨 How to Use

1. **Select an event** from the main menu or click "School Breaks"
2. **For custom event**: enter date, time (optional), and title
3. **Watch the countdown** in real-time
4. **Toggle themes** by clicking the moon/sun icon 🌙☀️
5. **Change event** by clicking the ⚙️ icon in the bottom right corner

## 🌍 Available Events

### 🎄 Holidays

- **Christmas** (December 25)
- **New Year's Eve** (December 31, 23:59:59)
- **Easter** (automatically calculated for each year)
- **Valentine's Day** (February 14)

### 🏫 School Calendar

- **Summer Vacation** (July 1 - September 1)
  - During vacation, automatically switches to countdown to school year
- **Winter Holiday Break** (December 22-31)
- **Winter Holidays 2026** (4 regional groups):
  - **Group 1**: Kujawsko-Pomorskie, Lubuskie, Małopolskie, Świętokrzyskie, Wielkopolskie (Jan 19 - Feb 1)
  - **Group 2**: Podlaskie, Warmińsko-Mazurskie (Jan 26 - Feb 8)
  - **Group 3**: Dolnośląskie, Mazowieckie, Opolskie, Zachodniopomorskie (Feb 2 - Feb 15)
  - **Group 4**: Lubelskie, Łódzkie, Podkarpackie, Pomorskie, Śląskie (Feb 9 - Feb 22)
- **Spring Holiday Break** (April 2-7)

### ✨ Custom Event

Add any date with your own title!

## 📂 Project Structure

```
src/
├── components/          # React Components
│   ├── BackgroundElements.tsx
│   ├── EventModal.tsx
│   ├── EventSubtitle.tsx
│   ├── EventTitle.tsx
│   ├── Fireworks.tsx
│   ├── Lights.tsx
│   ├── SnowEffect.tsx
│   ├── TimerDisplay.tsx
│   └── VoivodeshipMenu.tsx
├── config/              # Configuration
│   ├── constants.ts
│   └── targetConfig.ts
├── types/               # TypeScript Types
│   └── index.ts
├── utils/               # Utility Functions
│   └── dateUtils.ts
├── App.tsx              # Main Component
└── App.css              # Styles
```

## ⚙️ Customization

### Adding a New Event

1. Add new type to `Target` in `src/types/index.ts`
2. Add date logic in `getTargetDate()` in `src/utils/dateUtils.ts`
3. Add configuration in `getTargetConfig()` in `src/config/targetConfig.ts`
4. Add button in `EventModal.tsx`

### Changing Styles

All styles are in `src/App.css`. You can modify:

- Gradient colors
- Animations
- Sizes and spacing
- Hover effects

## 🎭 Visual Effects

- **Christmas**: snow, Christmas trees, festive lights
- **New Year's Eve**: fireworks, burst animations
- **Easter**: egg and bunny icons
- **Valentine's Day**: hearts
- **Winter holidays**: snow, skiing icons
- **Dark theme**: moon and stars
- **Light theme**: sun

## 🐛 Known Issues

- Requires Node.js version 20.19+ or 22.12+ (Vite 7.2.4)

## 📄 License

MIT – feel free to use and modify.

## 🤝 Contributing

Report bugs via **Issues** or create **Pull Requests**!

## 👨‍💻 Author

Created with ❤️ for Polish students and everyone who loves counting down to important moments!

---

⭐ **Like this project?** Leave a star on GitHub!
