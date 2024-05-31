# Tin Can Habit Tracker

![](./screenshots/Mobile%20App%20Presentation.png)

Welcome to the Tin Can Habit Tracker! This project leverages Next.js, TypeScript, Tailwind CSS, Shadcn, and Supabase to provide a robust solution for tracking daily habits. It's designed to be simple, intuitive, and effective for personal productivity enthusiasts.

[![Playwright Tests](https://github.com/ruby0322/tincan-habit-tracker/actions/workflows/playwright.yml/badge.svg)](https://github.com/ruby0322/tincan-habit-tracker/actions/workflows/playwright.yml)


![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)

- [Tin Can Habit Tracker](#tin-can-habit-tracker)
  - [Features](#features)
  - [Screenshots](#screenshots)
    - [Login](#login)
    - [Manage](#manage)
    - [Report](#report)
    - [Profile](#profile)
    - [Social](#social)
  - [Live Demo](#live-demo)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
    - [Running Tests Locally or on Your Own Supabase](#running-tests-locally-or-on-your-own-supabase)


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

## Screenshots



### Login

![](./screenshots/login.png)

### Manage

![](./screenshots/manage.png)

### Report

![](./screenshots/report.png)

### Profile

![](./screenshots/profile.png)

![](./screenshots/following-list.png)

### Social

![](./screenshots/social.png)

![](./screenshots/social-post.png)

![](./screenshots/emojis.png)

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

```
NEXT_PUBLIC_SUPABASE_URL=[URL to your Supabase project]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Anonymous key for accessing Supabase]
NEXT_PUBLIC_OPENAI_API_KEY=[API key for using OpenAI services]
```

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

### Running Tests Locally or on Your Own Supabase

If you'd like to run tests locally or on your own Supabase setup, follow these steps:

1. Set up (Local) Supabase:

Ensure you've created a project on Supabase.
Set up your database schema and initial data in your Supabase project.

2. Configure Environment Variables:

Create a .env.local file in the root directory of your project.
Set the following environment variables based on your Supabase project:

```
NEXT_PUBLIC_TESTING=true
NEXT_PUBLIC_TESTING_SUPABASE_URL=[your_supabase_project_url]
NEXT_PUBLIC_TESTING_SUPABASE_ANON_KEY=[your_supabase_anon_key]
NEXT_PUBLIC_TESTING_OPENAI_API_KEY=[your_openai_api_key]
```

This setup will enable you to run and test your Tin Can Habit Tracker project in a local environment or on your customized Supabase setup, ensuring everything works perfectly.