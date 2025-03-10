import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import { fetchTodos, saveTodoToApi } from "@/API/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Task = {
  id: number;
  text: string;
  title: string;
  description: string;
};

const TabTwoScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       setLoading(true);
  //       const token = await AsyncStorage.getItem("userToken"); // Replace with your token storage logic
  //       if (!token) {
  //         throw new Error("User not authenticated");
  //       }
  //       const fetchedTasks = await fetchTodos(token);
  //       setTasks(
  //         fetchedTasks.map((task) => ({
  //           id: task.id,
  //           text: task.title,
  //           title: task.title,
  //           description: task.completed ? "Completed" : "Not completed",
  //         }))
  //       );
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to load tasks.");
  //       setLoading(false);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  const addTask = async (taskTitle: string, taskDescription: string) => {
    try {
      // Save the task to the API
      const savedTask = await saveTodoToApi(taskTitle, taskDescription);
  
      // Add the saved task to the local state
      const newTask: Task = {
        id: savedTask.id,
        text: savedTask.title,
        title: savedTask.title,
        description: savedTask.description,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      Alert.alert("Error", "Failed to add the task. Please try again.");
    }
  };
  

  const editTask = (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setTaskToEdit(task);
      setNewTaskText(task.text);
      setIsEditing(true);
    }
  };

  const saveEditedTask = () => {
    if (taskToEdit) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskToEdit.id ? { ...task, text: newTaskText, title: newTaskText } : task
        )
      );
      setIsEditing(false);
      setTaskToEdit(null);
      setNewTaskText("");
    }
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/TaskDetails.jpg")}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Task Details</ThemedText>
      </ThemedView>
      <ThemedText>This is how you get started.</ThemedText>
      <View style={styles.container}>
        <TaskInput onAddTask={addTask} />
      </View>
      {/* <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      </View> */}

      {/* {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={50} color="#D0D0D0" />
        </View>
      ) : (
        tasks.length > 0 && (
          <View style={styles.taskListContainer}>
            <TaskList tasks={tasks} onEditTask={editTask} onDeleteTask={deleteTask} />
          </View>
        )
      )} */}

      {isEditing && (
        <Modal visible={isEditing} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Task</Text>
              <TextInput
                style={styles.modalInput}
                value={newTaskText}
                onChangeText={setNewTaskText}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.saveButton} onPress={saveEditedTask}>
                  <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  taskListContainer: {
    flex: 1,
    marginTop: 20,
    padding: 10,
  },
  headerImage: {
    height: 298,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
  },
  modalInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  saveButton: {
    backgroundColor: "#4CAF50", 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#FF3B30", 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default TabTwoScreen;
