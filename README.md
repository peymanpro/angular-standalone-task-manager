markdown
# ✅ Angular Standalone Task Manager

A modern task management application built with **Angular 19** using **Standalone Components** and **Atomic Design** pattern.

![Task Manager Screenshot](./screenshot.png)

## ✨ Features

- 📋 Add, edit, and delete tasks
- ✅ Mark tasks as complete / incomplete
- 🔍 Filter tasks by status (All, Active, Completed)
- 📱 Responsive design
- 💾 Data persisted in localStorage
- 🎨 Professional SVG icons
- 🧭 Multi-page routing (Home, About, Task Manager)
- 🎯 Reactive state management with BehaviorSubject

## 🛠️ Tech Stack

- Angular 19 (Standalone Components)
- TypeScript
- RxJS (BehaviorSubject)
- HTML5 / CSS3 (Pure CSS)
- Atomic Design pattern
- UUID for unique IDs

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or later)
- Angular CLI

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/angular-standalone-task-manager.git

# Navigate to project directory
cd angular-standalone-task-manager

# Install dependencies
npm install

# Run development server
ng serve
Navigate to http://localhost:4200/ to view the application.

📁 Project Structure
text
src/app/
├── features/
│   └── task/
│       ├── task.model.ts          # Task interface
│       └── task.service.ts        # State management with BehaviorSubject
├── pages/
│   ├── home/                      # Landing page
│   ├── about/                     # About page
│   └── task-manager/              # Main task management page
└── shared/
    ├── atoms/
    │   └── button/                # Reusable button component
    └── molecules/
        ├── task-item/             # Individual task display
        ├── task-edit/             # Add/Edit modal
        └── navbar/                # Navigation bar
🎯 Key Features Explained
Task Management
Add Task: Click the "Add New Task" button to open a modal form

Edit Task: Click the edit icon on any task to modify details

Delete Task: Remove tasks with a confirmation dialog

Complete Task: Toggle task status with a checkbox

Filtering
Filter tasks by status using the dropdown selector

Default filter shows Active tasks (incomplete)

Routing
Home: Landing page with welcome message

About: Project information

Task Manager: Full task management interface

📦 Build
bash
# Production build
ng build --configuration production

# Development build
ng build
🧪 Testing
bash
# Unit tests
ng test

# End-to-end tests (coming soon)
ng e2e
📝 Commit History
This project follows a clean commit history with meaningful messages:

text
feat(task-list): enhance task management with modal add, dropdown filter, and updated navbar layout
fix(navbar,about): wrap SVG icons in span containers for better alignment and consistency
feat(routing): add routing with Home and About pages
fix(state): replace window.reload with BehaviorSubject and switch UI to English
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

📄 License
This project is licensed under the MIT License.

