# Quiz Builder

A minimalistic quiz builder with drag-and-drop interface, built on Next.js with Tailwind CSS.

## 🚀 Features

- **📝 Quiz Creation** - Intuitive block-based editor
- **🖱️ Drag-and-Drop** - Reorder blocks with smooth drag-and-drop
- **🎨 Building Blocks**:
  - Heading
  - Question - supports single choice, multiple choice, and text answers
  - Button
  - Footer
- **💾 Local Storage** - All data persists in browser localStorage
- **📱 Responsive Design** - Works perfectly on desktop and mobile
- **🌐 Publish/Unpublish** - Control visibility of your quizzes
- **🎯 Sample Quizzes** - Pre-loaded examples for first-time users

## 🛠️ Tech Stack & Library Choices

### Core Framework
- **Next.js 14** - Chosen for its App Router, excellent developer experience, and built-in optimizations
- **React 18** - Industry standard with great hooks ecosystem

### Styling
- **Tailwind CSS** - Utility-first approach for rapid UI development and consistent design

### Drag & Drop
- **@hello-pangea/dnd** - Fork of react-beautiful-dnd with better maintenance and TypeScript support
- **Why not react-dnd?** - hello-pangea/dnd offers simpler API for vertical lists and better touch support

### State Management
- **React Hooks** - Built-in solution sufficient for this scale, no need for external libraries

### Storage
- **localStorage** - Simple client-side persistence for demo purposes

## 📸 Screenshots

### Dashboard
![Quiz List](/public/screenshots/quiz-list.png)
*Main dashboard showing all quizzes with status indicators and actions*

### Quiz Editor (Desktop)
![Quiz Editor Desktop](/public/screenshots/quiz-editor-desktop.png)
*Three-panel editor with drag-and-drop functionality and properties panel*

### Mobile Experience
![Quiz Editor Mobile](/public/screenshots/quiz-editor-mobile.png)
*Responsive design optimized for mobile devices*

### Published Quiz
![Quiz Preview](/public/screenshots/quiz-preview.png)
*How quizzes appear to end-users with interactive elements*

## 📱 Mobile Support

The application is responsive and works on mobile devices with the following considerations:

Touch-friendly interfaces for all interactive elements
Simplified drag-and-drop on mobile (tap to add, desktop for full reordering)
Optimized layouts for different screen sizes
Minimum supported width: 320px
Mobile Limitations

Full drag-and-drop reordering works best on desktop
Some advanced interactions may be limited on touch devices

## 🏃‍♂️ Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/quiz-builder.git
cd quiz-builder

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
