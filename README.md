# URL Shortener - React Application

## Project Overview

This is a full-featured URL shortener application built with Vite React and Material UI, developed for Afford Medical Technologies' Campus Hiring Evaluation. The application allows users to shorten URLs, track click statistics, and manage shortened links with expiration times.

## Key Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **Custom Shortcodes**: Optionally specify your own shortcode
- **Link Expiration**: Set custom expiration times (default: 30 minutes)
- **Click Analytics**: Track click sources, timestamps, and locations
- **Multi-URL Processing**: Shorten up to 5 URLs simultaneously
- **Responsive Design**: Works on all device sizes
- **Link Management**: View all created URLs and their statistics

## Technology Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **UI Framework**: Material UI
- **State Management**: React Context API
- **Routing**: React Router 6
- **Date Handling**: date-fns
- **Logging**: Custom middleware with localStorage persistence

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayush-kumarrai/2200971640019
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:5173
   ```

## Usage

### Shortening URLs

1. Enter your long URL in the input field
2. Optionally specify:
   - Validity period (in minutes)
   - Custom shortcode
3. Click "Shorten URLs"
4. Copy your new shortened URL from the results section

### Viewing Statistics

1. Click the "View Statistics" button
2. See all your shortened URLs with:
   - Creation and expiration times
   - Total click counts
   - Detailed click analytics

### Accessing Shortened URLs

1. Click on any shortened URL
2. You'll be automatically redirected to the original URL after a brief delay

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
url-shortener/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```
