URL Shortener - React Application
Project Overview

This is a full-featured URL shortener application built with Vite React and Material UI, developed for Afford Medical Technologies' Campus Hiring Evaluation. The application allows users to shorten URLs, track click statistics, and manage shortened links with expiration times.

Key Features

URL Shortening: Convert long URLs into short, shareable links
Custom Shortcodes: Optionally specify your own shortcode
Link Expiration: Set custom expiration times (default: 30 minutes)
Click Analytics: Track click sources, timestamps, and locations
Multi-URL Processing: Shorten up to 5 URLs simultaneously
Responsive Design: Works on all device sizes
Link Management: View all created URLs and their statistics
Technology Stack

Frontend: React 18
Build Tool: Vite
UI Framework: Material UI
State Management: React Context API
Routing: React Router 6
Date Handling: date-fns
Logging: Custom middleware with localStorage persistence
Installation

Clone the repository: git clone https://github.com/your-username/url-shortener.git
Install dependencies: npm install
Start the development server: npm run dev
Open the application in your browser: http://127.0.0.1:3000

Shortening URLs
Enter your long URL in the input field 
Optionally specify:Validity period (in minutes)
Custom shortcode
Click "Shorten URLs"
Copy your new shortened URL from the results section
Viewing Statistics

Click the "View Statistics" button
See all your shortened URLs with:
Creation and expiration times
Total click counts
Detailed click analytics
Accessing Shortened URLs

Click on any shortened URL
You'll be automatically redirected to the original URL after a brief delay
