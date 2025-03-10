import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const TaskInput = ({
  onAddTask,
}: {
  onAddTask: (title: string, description: string) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      onAddTask(title, description); // Pass all fields to the parent
      setTitle(""); // Clear the title input
      setDescription(""); // Clear the description input
    }
  };

  return (
    <View style={styles.inputContainer}>
      {/* Title Input */}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      {/* Description Input */}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, styles.descriptionInput]}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#353636",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 50,
    marginBottom: 10,
    color: "#fff", // Ensure text is visible on dark background
  },
  descriptionInput: {
    minHeight: 80, // Provide more space for multi-line text
  },
  addButton: {
    backgroundColor: "#FF9C01",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TaskInput;
