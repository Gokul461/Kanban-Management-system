import React from "react";
import Team from "./Data/TeamMemeber";
import { Avatar } from "@mui/material";
import { LayoutDashboard } from "lucide-react";

interface TeamMember {
  Id: string;
  Name: string;
  Role: string;
  Image: string;
}

const Sidebar: React.FC = () => {
  return (
    <div className="bg-white p-4 h-screen w-64 shadow-lg flex flex-col">
      <h2 className="font-bold text-xl py-4">
        <span className="flex items-center gap-2">
          Kanban App
          <LayoutDashboard color="blue" strokeWidth={1} fill="blue" />
        </span>
      </h2>
      <hr className="border-gray-300 mb-5" />
      <h3 className="text-lg font-semibold py-2 ps-2">Team Members</h3>
      <div className="pr-2 custom-scroll-container ps-2">
        {Team.map((member: TeamMember) => (
          <div
            key={member.Id}
            className="mb-2 flex items-center space-x-3 p-3 rounded-lg border border-gray-200 shadow-sm transition-transform hover:scale-105 hover:shadow-md hover:bg-gray-100"
          >
            <Avatar src={member.Image} alt={member.Name} sx={{ width: 36, height: 36 }} />
            <div className="text-sm">
              <h6 className="font-medium text-gray-800">{member.Name}</h6>
              <p className="text-gray-500">{member.Role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
