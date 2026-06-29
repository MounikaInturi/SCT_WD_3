# 🧬 Biology Quiz Game - Interactive Web App

**SkillCraft Technology Web Development Task 2**

A responsive quiz application with 3 question types, instant feedback, and detailed score review. Built with vanilla HTML, CSS, and JavaScript.

## 🚀 Live Demo
https://mounikainturi.github.io/SCT_WD_3/

## 📂 GitHub Repository
https://github.com/mounikainturi/SCT_WD_3

## 📸 Preview
*Glassmorphism UI with biology-themed gradient + progress tracking*

## 📋 Features & Task Requirements

| Requirement | How I Implemented It |
| --- | --- |
| **Multiple Question Types** | Single choice, Multiple choice, Fill in the blank |
| **Instant Feedback** | Shows correct/incorrect + highlights right answer immediately |
| **Score Tracking** | Live progress bar + final score out of 7 |
| **User Interaction** | Radio buttons, checkboxes, text inputs with validation |
| **Responsive Design** | Flexbox layout works on mobile, tablet, desktop |

## ✨ Key Features

1. **Dynamic Question Rendering**: JS loads different UI based on question type
2. **Smart Validation**: 
   - Single: Must select one option
   - Multiple: Must select at least one checkbox  
   - Fill: Checks answer case-insensitive
3. **Visual Feedback System**: 
   - ✅ Green for correct answers
   - ❌ Red for wrong answers  
   - Disabled inputs after submission
4. **Score Review Page**: Shows all questions + your answers + correct answers
5. **Progress Indicator**: Animated gradient bar tracks completion
6. **Keyboard Support**: `Enter` to submit, `Tab` to navigate
7. **Restart Function**: Reset quiz without page reload

## 🛠️ Tech Stack

- **HTML5**: Semantic elements, form controls
- **CSS3**: Glassmorphism `backdrop-filter`, CSS Grid, keyframe animations, gradients
- **Vanilla JavaScript**: DOM manipulation, event handling, state management, array methods
- **Zero Dependencies**: No frameworks or libraries used

## 📁 Project Structure
SCT_WD_2/
├── index.html      # Main structure: quiz screen + results screen
├── styles.css      # Biology theme: green gradients + glassmorphism
├── script.js       # Core logic: questions array + game state + scoring
└── README.md       # Documentationjavascript
## 🧪 Quiz Content - 7 Biology Questions

1. Powerhouse of the cell - `Single Choice`
2. Plant cell vs Animal cell parts - `Multiple Choice` 
3. Photosynthesis definition - `Fill in Blank`
4. Human heart chambers - `Single Choice`
5. DNA components - `Multiple Choice`
6. DNA full form - `Fill in Blank`
7. Universal blood donor - `Single Choice`

## 💻 Run Locally

```bash
# Clone the repository
git clone https://github.com/mounikainturi/SCT_WD_2.git

# Open in browser
cd SCT_WD_2
start index.html  # Windows
open index.html   # Mac🎯 What I Learned
State Management: Tracking currentQ, score, userAnswers without frameworksConditional UI: Rendering different input types from one questions arrayArray Methods: Using .every(), .includes(), .map() for answer validationCSS Glassmorphism: backdrop-filter: blur() + rgba() backgroundsUX Patterns: Disabling buttons, showing feedback, preventing double-submits🎨 Design Decisions
Color Palette: Teal #134e5e to green #71b280 = biology/nature themeTypography: Poppins for modern look, tabular-nums for scoresFeedback: Non-blocking - shows answer but lets user control pacingMobile First: Touch-friendly 44px+ tap targets on buttons/options👩‍💻 Author
Mounika InturiTask: SCT_WD_2 @ SkillCraft TechnologyDate: June 2026GitHub: @mounikainturiLive Demo: mounikainturi.github.io/SCT_WD_2
