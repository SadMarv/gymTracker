# Gym Tracker

A modern, mobile-first workout tracking application built with Ionic React. This application helps users create, manage, and track their workout routines with an intuitive and user-friendly interface.

## Features

- 📱 Mobile-first design optimized for both Android and iOS
- 💪 Create custom workout routines
- 📝 Track exercises with detailed information:
  - Sets and repetitions
  - Weight tracking
  - Exercise notes
  - Exercise categorization (Superior, Inferior, Cardio)
- 📊 View workout history
- 💾 Local storage for offline access
- 🎨 Clean and intuitive user interface

## Technologies Used

- Ionic Framework
- React
- TypeScript
- React Hook Form
- Capacitor
- CSS/SCSS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Ionic CLI

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gymTracker.git
cd gymTracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ionic serve
```

## Building for Mobile

### Android

```bash
ionic capacitor add android
ionic capacitor copy android
ionic capacitor open android
```

### iOS

```bash
ionic capacitor add ios
ionic capacitor copy ios
ionic capacitor open ios
```

## Project Structure

- `/src` - Source code
  - `/pages` - Application pages/routes
  - `/components` - Reusable components
  - `/assets` - Static assets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ionic Framework team for the excellent mobile development framework
- React Hook Form for form handling
- All contributors who participate in this project 