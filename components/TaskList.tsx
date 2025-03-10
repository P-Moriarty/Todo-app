import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


type Task = {
  title: string;
  description: string;
  id: number;
  text: string;
};

interface TaskListProps {
  tasks: Task[];
  onEditTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <View style={styles.taskListContainer}>
      {tasks.map((task) => (
        <View key={task.id} style={styles.taskItem}>
          <Text style={styles.taskText}>{task.title}</Text>
          <Text style={styles.taskText}>{task.description}</Text>
          <Text style={styles.taskText}>{task.text}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => onEditTask(task.id)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDeleteTask(task.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  taskListContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  taskItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    marginBottom: 10, 
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", 
    gap: 10, 
  },
  editButton: {
    backgroundColor: "#FF9C01",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default TaskList;
