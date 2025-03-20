import React from "react";
import Sidebar from "./Sidebar";
import Column from "./Columns";

const Kanban: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[260px] bg-gray-200 border-r border-gray-300">
        <Sidebar />
      </div>

      <div className="flex flex-col h-screen w-full space-y-4">
        <Column />
      </div>
    </div>
  );
};

export default Kanban;
