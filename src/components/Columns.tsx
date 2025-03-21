import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Card, CardContent, Avatar, Chip, AvatarGroup } from "@mui/material";
import Projects from "./Data/Ticket";
import Team from "./Data/TeamMemeber";
import { Star, Funnel } from "lucide-react";
import AddTask from "./AddTask";

interface Task {
  Id: string;
  Title: string;
  Description: string;
  Type: string;
  AssigneeName: string;
  AssigneeId: string;
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
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string>("");

  const onDragStart = (result: any) => {
    setDraggingTaskId(result.draggableId);
  };

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
    setTasks((prevTasks) => [...prevTasks, { ...newTask, Id: crypto.randomUUID() }]);
  };

  return (
    <div className="overflow-hidden bg-gray-50">
      <div className="bg-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-start">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              Kanban Board <Star fill="yellow" size={28} />
            </h1>
            <p className="text-gray-500 mt-1">Manage and organize your tasks</p>
            <h3 className="font-semibold mt-3">Members on Board</h3>
            <AvatarGroup total={10} sx={{ mr: 12, mt: 2 }}>
              {Team.slice(0, 5).map((member) => (
                <Avatar key={member.Id} alt={member.Name} src={member.Image} />
              ))}
            </AvatarGroup>
          </div>

          <div className="flex items-center space-x-4 mr-5 mb-2 relative top-16">
            <h3 className="font-semibold"><span className="flex flex-row justify-center items-center gap-2"><Funnel size={16}/>Filter By :</span></h3>
            <select onChange={(e) => setSelectedAssignee(e.target.value)} className="border-1 border-gray-400 rounded-md p-2">
              <option value="">All</option>
              {Team.map((member) => (
                <option key={member.Id} value={member.Name}>
                  {member.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="flex justify-around h-[800px] bg-white space-x-2 mt-2 border-t-1 pt-6 border-gray-300">
          {columns.map((column) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-75 h-[490px] px-5 py-4 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden"
                >
                  <div className="flex flex-col mb-4">
                    <Chip
                      label={column.label}
                      color={column.color}
                      variant="filled"
                      sx={{ fontWeight: 600, marginBottom: "1rem" }}
                    />
                    <AddTask id={column.id} onAddTask={(newTask) => handleAdd({ ...newTask, Id: crypto.randomUUID() })} />
                  </div>

                  <div className="overflow-y-auto overflow-x-hidden h-[350px] p-1">
                    {tasks
                      .filter(
                        (task) =>
                          task.Type === column.id &&
                          (!selectedAssignee || task.AssigneeName === selectedAssignee)
                      )
                      .map((task, index) => {
                        const assignee = Team.find((member) => member.Id === task.AssigneeId);
                        return (
                          <Draggable key={task.Id} draggableId={task.Id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-2 rounded-lg border cursor-pointer border-gray-200 shadow-sm transition-transform ${
                                  snapshot.isDragging ? "opacity-50 scale-95" : "hover:scale-105 hover:shadow-md"
                                }`}
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
