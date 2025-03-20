import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Card, CardContent, Avatar, Chip, AvatarGroup } from "@mui/material";
import Projects from "./Data/Ticket";
import Team from "./Data/TeamMemeber";
import { Star } from "lucide-react";
import AddTask from "./AddTask";

interface Task {
  Id: string;
  Title: string;
  Description: string;
  Type: string;
  Assignee: string;
}

interface ColumnType {
  id: string;
  label: string;
  color: "default" | "secondary" | "info" | "success";
}

const columns: ColumnType[] = [
  { id: "Backlog", label: "Backlog", color: "default" },
  { id: "In Progress", label: "In Progress", color: "secondary" },
  { id: "Review", label: "Review", color: "info" },
  { id: "Done", label: "Done", color: "success" },
];

const Column: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(Projects);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    console.log(result);
    const { source, destination, draggableId } = result;
    const updatedTasks = [...tasks];
    const movedTaskIndex = updatedTasks.findIndex((task) => task.Id === draggableId);
    if (movedTaskIndex === -1) return;
    
    const movedTask = updatedTasks[movedTaskIndex];
    
    if (source.droppableId === destination.droppableId) {
      const columnTasks = updatedTasks.filter((task) => task.Type === source.droppableId);
      const [removed] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, removed);
      
      const newTasks = updatedTasks.filter((task) => task.Type !== source.droppableId);
      setTasks([...newTasks, ...columnTasks]);
    } else {
      updatedTasks[movedTaskIndex] = { ...movedTask, Type: destination.droppableId };
      setTasks(updatedTasks);
    }
  };

  const handleAdd = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="custom-scroll-container bg-gray-50">
      <div className="flex flex-col items-start justify-start p-4 space-y-4 ms-1">
        <h1 className="text-2xl font-bold mb-2">
          <span className="flex items-center gap-3">Kanban Board<Star fill="yellow" size={24} /></span>
        </h1>
        <p className="font-medium text-gray-500">Manage and organize your tasks</p>
        <h3 className="font-semibold">Members on Board</h3>
        <AvatarGroup total={10}>
          <Avatar alt="Remy Sharp" src="src/assets/avatar1.avif" />
          <Avatar alt="Travis Howard" src="src/assets/avatar2.avif" />
          <Avatar alt="Cindy Baker" src="src/assets/avatar6.avif" />
          <Avatar alt="Agnes Walker" src="src/assets/avatar5.avif" />
          <Avatar alt="Trevor Henderson" src="src/assets/avatar6.avif" />
        </AvatarGroup>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-around bg-white space-x-2 mt-2 border-t-1 pt-6 border-gray-300">
          {columns.map((column) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-72 min-h-[300px] px-5 py-4 divide-dashed border-solid md:border-dotted bg-gray-100"
                >
                  <div className="flex flex-col mb-4">
                    <Chip
                      label={column.label}
                      color={column.color}
                      variant="filled"
                      sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, marginBottom: "1rem" }}
                    />
                    <AddTask id={column.id} onAddTask={(newTask) => handleAdd(newTask)} />
                  </div>
                  {tasks.filter((task) => task.Type === column.id).map((task, index) => {
                    const assignee = Team.find((teamMember) => teamMember.Id === task.Assignee);
                    return (
                      <Draggable key={task.Id} draggableId={task.Id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2 rounded-lg border cursor-pointer border-gray-200 shadow-sm transition-transform transform hover:scale-105 hover:shadow-md"
                          >
                            <CardContent>
                              <h2 className="font-semibold text-medium">{task.Title}</h2>
                              <p className="text-gray-600 text-xs">{task.Description}</p>
                              {assignee && (
                                <div className="flex items-center space-x-2 mt-2">
                                  <Avatar src={assignee.Image} sx={{ width: 24, height: 24 }} />
                                  <h6 className="text-gray-600 text-xs">{assignee.Name}</h6>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Column;
