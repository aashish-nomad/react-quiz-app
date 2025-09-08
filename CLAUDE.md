# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based quiz application built with Vite. The app presents multiple-choice questions about React concepts, tracks user answers, and includes a timer mechanism for each question.

## Commands

```bash
# Development
npm run dev          # Start Vite dev server

# Build
npm run build        # Build for production

# Linting
npm run lint         # Run ESLint

# Preview production build
npm run preview      # Preview built app
```

## Architecture

### Core Components

The application follows a component-based architecture with state management using React hooks:

- **Quiz Component** (`src/components/Quiz.jsx`): Main controller component that manages quiz state, including user answers and answer states ('answered', 'correct', 'wrong'). Handles question progression and quiz completion.

- **Question Component** (`src/components/Question.jsx`): Container component that combines the timer and answers for each question.

- **QuestionTimer Component** (`src/components/QuestionTimer.jsx`): Implements a countdown timer with progress bar visualization. Uses dual timer approach - one for the timeout callback and another for UI updates.

- **Answers Component** (`src/components/Answers.jsx`): Renders shuffled answer options and handles visual feedback for selected/correct/wrong answers.

### Key Implementation Details

- **Answer Shuffling**: Answers are shuffled using `useRef` to maintain consistency across re-renders
- **Timer System**: Each question has a 15-second timer (configurable via TIMER constant)
- **Answer Feedback**: Multi-stage feedback system with 1-second delay for initial feedback and 2-second delay before moving to next question
- **State Management**: Uses `useState` for tracking user answers and current answer state, `useCallback` for memoizing event handlers

### Data Structure

Questions are stored in `src/questions.js` as an array of objects with:
- `id`: Unique identifier
- `text`: Question text
- `answers`: Array where the first answer is always the correct one (gets shuffled on display)