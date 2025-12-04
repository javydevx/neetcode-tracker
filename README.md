# 🧠 CodeTrack Pro - LeetCode Progress Tracker

A modern, interactive web application to track your progress through the famous LeetCode problems with built-in spaced repetition system for long-term retention.

![LeetCode Tracker](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC.svg)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF.svg)

## ✨ Features

### 📊 Progress Tracking
- **Complete Problem Tracking**: Mark problems as solved with automatic date tracking
- **Visual Progress Stats**: See your progress across Easy, Medium, and Hard difficulties
- **Category Filtering**: Filter by problem categories (Arrays & Hashing, Two Pointers, etc.)
- **Difficulty Filtering**: Filter by Easy, Medium, or Hard problems

### 🔄 Spaced Repetition System
- **Scientifically-Based Intervals**: Review problems at optimal intervals (1, 3, 7, 14, 30 days)
- **Smart Review Scheduling**: Automatic calculation of review due dates
- **Due Today Filter**: Quickly see which problems need review today
- **Visual Review Status**: Color-coded review buttons showing completion status

### 💾 Data Persistence
- **Local Storage**: All progress automatically saved to browser's local storage
- **Export/Import**: Backup your progress with JSON export/import functionality
- **Cross-Session Persistence**: Progress survives browser restarts and refreshes

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Clean Interface**: Modern, distraction-free design using Tailwind CSS
- **Interactive Elements**: Hover effects, color-coded status indicators
- **Informative Tooltips**: Helpful information displayed on hover

## 🚀 Live Demo

[View Live Demo](https://track-leetcode.vercel.app)

## 🛠️ Installation

### Prerequisites
- Node.js
- npm or yarn

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/neetcode-tracker.git
   cd neetcode-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🎯 How to Use

### Getting Started
1. **Mark Problems as Solved**: Click the circle icon next to any problem when you complete it
2. **Review Schedule Appears**: Once solved, you'll see 5 review buttons (R1-R5) with due dates
3. **Complete Reviews**: Click review buttons when you successfully review the problem
4. **Track Progress**: Use filters and stats to monitor your overall progress

### Spaced Repetition Schedule
- **R1**: Review after 1 day
- **R2**: Review after 3 days  
- **R3**: Review after 7 days (1 week)
- **R4**: Review after 14 days (2 weeks)
- **R5**: Review after 30 days (1 month)

### Color Coding
- 🟢 **Green**: Review completed
- 🟡 **Yellow**: Due today
- 🔴 **Red**: Overdue
- ⚪ **Gray**: Future review

### Data Management
- **Export**: Download your progress as a JSON file for backup
- **Import**: Restore progress from a previously exported file
- **Clear All**: Reset all progress (with confirmation dialog)

## 🔧 Technologies Used

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 3.4.18
- **Icons**: Lucide React 0.544.0
- **Data Storage**: Browser LocalStorage
- **Language**: JavaScript (ES6+)

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📋 Roadmap

- [ ] Dark mode support
- [ ] Custom problem sets
- [ ] Study streaks tracking
- [ ] Performance analytics
- [ ] Social features (optional)
- [ ] Mobile app version

## ❓ FAQ

**Q: Will my progress be lost if I clear browser data?**
A: Yes, since data is stored in localStorage. Use the export feature to backup your progress.

**Q: Can I access my progress from different devices?**
A: Currently no, as data is stored locally. You can export from one device and import to another.

**Q: Can I add custom problems?**
A: Not currently, but this feature is planned for future releases.

## 🙏 Acknowledgments

- **NeetCode**: For the excellent problem curation and learning resources
- **Spaced Repetition Research**: Based on cognitive science research for optimal learning
- **React Community**: For the amazing ecosystem and tools

---

⭐ **Star this repository if it helped you ace your coding interviews!**

Made with ❤️ for the coding community
