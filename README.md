# Tin Can Habit Tracker

Welcome to the Tin Can Habit Tracker! This project leverages Next.js, TypeScript, Tailwind CSS, Shadcn, and Supabase to provide a robust solution for tracking daily habits. It's designed to be simple, intuitive, and effective for personal productivity enthusiasts.

[![Playwright Tests](https://github.com/ruby0322/tincan-habit-tracker/actions/workflows/playwright.yml/badge.svg)](https://github.com/ruby0322/tincan-habit-tracker/actions/workflows/playwright.yml)

- [Tin Can Habit Tracker](#tin-can-habit-tracker)
  - [Features](#features)
  - [Live Demo](#live-demo)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)


## Features

- **Habit Tracking**: Track your daily habits with ease.
- **Progress Overview**: Visual insights into your habit performance over time.
- **AI-Powered Reminders**: Receive unique and high-quality image reminders generated by AI to keep you engaged.
- **AI-Generated Imagery**: Enhance your tracking experience with AI-generated unique images that reflect your habit goals.
- **Social Features**: 
  - **Share Progress**: Automatically generate posts based on your habit goals and daily progress to share on social platforms.
  - **Friend Progress Viewing**: View your friends' habit progress to support and motivate each other.
  - **Interact with Friends' Posts**: Encourage, reprimand, or comment on your friends' posts to enhance social interaction.
  - **Join Public Habits**: Participate in public habits created by others and add them to your habit collection.
  - **Share to Social Media**: Share progress screenshots of your "pet can" on external social media to enhance visual sharing and interaction.


## Live Demo

Check out the live demo here: [Tin Can Habit Tracker Live Demo](https://tincan-habit-tracker.vercel.app)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ruby0322/tincan-habit-tracker.git
cd tincan-habit-tracker
yarn
```

## Environment Variables

Before running the application, configure the required environment variables in a .env file based on .env.example:

NEXT_PUBLIC_SUPABASE_URL: URL to your Supabase project.
NEXT_PUBLIC_SUPABASE_ANON_KEY: Anonymous key for accessing Supabase.
NEXT_PUBLIC_OPENAI_API_KEY: API key for using OpenAI services.

## Running the Application

Start the development server:

```bash
yarn dev
```

Navigate to http://localhost:3000 to view the app.

## Running Tests

1. Make sure the local development server is up. If not, run `yarn dev`
2. Run the following command:

```bash
yarn test
```

If you want to test in debug mode, which allows you to test step by step and show browser in action. Run

```bash
yarn test --debug
```