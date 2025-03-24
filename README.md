# Kanban Board Project 🏗️

## 📌 Overview
The **Kanban Board** is a task management system that helps teams organize their workflow visually using draggable task cards. This project is built using **React**, **Material-UI**, and **@hello-pangea/dnd** for seamless drag-and-drop functionality. It supports task assignment, local storage persistence, and filtering by assignee.

## 🚀 Features
- **Drag & Drop** 🖱️: Move tasks across different stages (Backlog, In Progress, Review, Done).
- **Task Filtering** 🔍: Filter tasks based on assigned team members.
- **Dynamic Task Management** ✏️: Add new tasks dynamically.
- **Responsive UI** 📱: Built with Material-UI for a clean, modern look.

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Material-UI
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Drag & Drop**: `@hello-pangea/dnd`

## 📁 Project Structure
```
📦 Kanban-Board
├── 📂 src
│   ├── 📂 components
│   │   ├── Column.tsx  # Main Kanban Board UI
│   │   ├── AddTask.tsx  # Task creation modal
│   ├── 📂 data
│   │   ├── Ticket.ts  # Task list data
│   │   ├── TeamMember.ts  # Team members list
│   ├── App.tsx  # Entry point
│   ├── index.tsx  # Main render file
│
├── 📜 package.json
├── 📜 README.md
```

## 🎨 UI Preview
![Kanban Board Preview](https://via.placeholder.com/1000x500.png?text=Kanban+Board+UI+Preview)

## 🏗️ Installation
```sh
# Clone the repository
git clone https://github.com/Gokulsl/Kanban.git
cd Kanban

# Install dependencies
yarn install  # or npm install

# Start the development server
yarn start  # or npm start
```

## 🎯 Usage
1. Open the app in your browser (`http://localhost:3000`).
2. Add tasks using the **Add Task** button.
3. Drag & Drop tasks between columns.
4. Filter tasks using the dropdown.

## 🔄 Drag & Drop Logic
```tsx
const onDragEnd = (result: DropResult) => {
  if (!result.destination) return;
  const { source, destination, draggableId } = result;
  const updatedTasks = [...tasks];
  const movedTaskIndex = updatedTasks.findIndex((task) => task.Id === draggableId);
  if (movedTaskIndex === -1) return;

  updatedTasks[movedTaskIndex] = { ...updatedTasks[movedTaskIndex], Type: destination.droppableId };
  setTasks(updatedTasks);
};
```

## 🤝 Contributors
- **Gokulnath S** 🚀 ([GitHub](https://github.com/Gokulsl))
- 
### Screenshot of the design


![image](https://github.com/user-attachments/assets/a0eba4fb-caa3-4d4b-ae8a-78970da36f26)

## 📜 License
This project is licensed under the MIT License.

---
🚀 Happy Coding! 🎯


