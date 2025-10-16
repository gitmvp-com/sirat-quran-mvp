# Sirat Quran Reader - MVP

> A minimal Islamic Quran reader application built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- 📖 **Quran Reader** - Browse and read all 114 Surahs
- 🎨 **Beautiful UI** - Modern glass-morphism design with Tailwind CSS
- 🌐 **Bilingual** - Arabic and English support
- 📱 **Responsive** - Works on all devices
- ⚡ **Fast** - Built with Vite for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/gitmvp-com/sirat-quran-mvp.git
cd sirat-quran-mvp

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
sirat-quran-mvp/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   └── Layout.tsx    # Main layout component
│   ├── lib/
│   │   ├── utils.ts      # Utility functions
│   │   └── quran-api.ts  # Quran API functions
│   ├── pages/
│   │   ├── Home.tsx      # Home page
│   │   ├── Quran.tsx     # Surah list
│   │   └── SurahDetail.tsx # Surah reader
│   ├── App.tsx           # Main app component
│   ├── index.css         # Global styles
│   └── main.tsx          # Entry point
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

## 🎨 Tech Stack

- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Navigation
- **AlQuran.cloud API** - Quran data

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- Based on [Sirat](https://github.com/MAtiyaaa/sirat) by MAtiyaaa
- [AlQuran.cloud](https://alquran.cloud) for the Quran API
- [shadcn/ui](https://ui.shadcn.com) for beautiful components

---

**Note**: This is a simplified MVP version focused on the core Quran reading feature. For the full-featured version with authentication, bookmarks, and more, check out the original [Sirat](https://github.com/MAtiyaaa/sirat) repository.
