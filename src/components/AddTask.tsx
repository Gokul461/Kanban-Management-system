import * as React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Paper,
  Typography,
  capitalize
} from "@mui/material";
import { Plus } from "lucide-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "white",
  boxShadow: 12,
  borderRadius: 3, // Rounded corners
  p: 4,
};

interface AddTaskProps {
  id: string;
  onAddTask: (task: {
    Title: string;
    Description: string;
    Type: string;
    Assignee: string;
    Id: string;
  }) => void;
}

export default function AddTask({ id, onAddTask }: AddTaskProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [tId, setTid] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTask = () => {
    if (title && description && tId && assignee) {
      
      
      onAddTask({ Title: title, Description: description, Type: id, Assignee: assignee.toUpperCase(), Id: tId.toUpperCase() });
      setTitle("");
      setDescription("");
      setAssignee("");
      setTid("");
      handleClose();
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div>
      <Button
        color="primary"
        variant="outlined"
        onClick={handleOpen}
        fullWidth
      >
        <span className="flex items-center gap-2">
          <span>Add Task</span>
          <Plus size={20} />
        </span>
      </Button>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Paper sx={style}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Add New Task
          </Typography>
          <Box mt={3} display="flex" gap={2} flexWrap="wrap">
              <TextField
                label="Task ID (Ex. T21)"
                variant="outlined"
                value={tId}
                onChange={(e) => setTid(e.target.value)}
                fullWidth
              />
            
              <TextField
                label="Task Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            
              <TextField
                label="Task Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={3}
                fullWidth
              />
    
              <TextField
                label="Assignee (Ex. TM1)"
                variant="outlined"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                fullWidth
              />
       
       </Box>
          <Box mt={3} display="flex" justifyContent="center" gap={2}>
            <Button
              onClick={handleAddTask}
              variant="contained"
              sx={{
                backgroundColor: "#4CAF50",
                "&:hover": { backgroundColor: "#388E3C" },
                borderRadius: 2,
                px: 3,
              }}
            >
              Add Task
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                backgroundColor: "#B0BEC5",
                "&:hover": { backgroundColor: "#90A4AE" },
                borderRadius: 2,
                px: 3,
              }}
            >
              Close
            </Button>
          </Box>
        </Paper>
      </Modal>
    </div>
  );
}
