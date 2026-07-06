# Simplified CSAT Campaign Builder

A modern, simplified Customer Satisfaction (CSAT) Campaign Builder built with React, Vite, TypeScript, and Tailwind CSS. It allows users to configure a feedback popup's content and styling, and preview changes instantly on a live mobile device frame.

## 🚀 Features

- **Live Mobile Preview**: A realistic phone frame that updates instantly when changes are made.
- **Content Configuration**: Set up the Initial Screen, Feedback Screen (including dynamic options), and Thank You Screen (including image/lottie upload).
- **Styling Configuration**: Customize colors (background, text, buttons, stars), typography (size, weight), and element dimensions (border radius, button sizes) using native color pickers.
- **State Management**: Built entirely with functional components and React Hooks, leveraging the Context API for robust, centralized state management.
- **Responsive Design**: Automatically adjusts from a three-column layout on Desktop, to stacked tabs on mobile devices.

## 🛠 Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (Icons)
- Lottie React (Animations)

## 📁 Folder Structure

```text
src/
├── assets/
├── components/
│   ├── common/         # Reusable UI components (TextInput, ColorPicker, ToggleSwitch, etc.)
│   ├── content/        # Content tab components (Forms, DynamicOptions, MediaUploader)
│   ├── preview/        # Live Mobile Preview components (PhonePreview, RatingComponent)
│   └── styling/        # Styling tab components (ColorPickers, Dimension controls)
├── constants/          # Default state values
├── context/            # React Context (CsatContext)
├── pages/              # Main layout pages (BuilderPage)
├── types/              # TypeScript interfaces for State
├── utils/              # Helper functions (cn for Tailwind merging)
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

## 📦 Setup Instructions

1. **Clone the repository** (if applicable) or unzip the project folder.
2. **Navigate into the project directory**:
   ```bash
   cd csat-builder
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. **Open your browser** and visit `http://localhost:5173` (or the URL provided in your terminal).

## 🚀 Deployment

This project is configured out-of-the-box for easy deployment to Vercel, Netlify, or Render.

### Deploying to Vercel
1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root and follow the prompts.
3. Alternatively, connect your GitHub repository directly to Vercel for automatic deployments.

*(Update this section with your live deployment link once deployed)*
**Live Demo:** [Add Link Here]
