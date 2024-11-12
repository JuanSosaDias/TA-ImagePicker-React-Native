import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import ImagePickerExample from "../Components/ImagePicker";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [imageTask, setImageTask] = useState(null);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      const newTask = {
        id: Date.now(),
        imageTask,
        text: task,
        isComplete: false,
      };
      setTasks([...tasks, newTask]);
      setTask("");
      setImageTask(null); // Reset image after adding task
    }
  };

  const handleDeleteTask = (id) => {
    const resultTasks = tasks.filter((tarea) => tarea.id !== id);
    setTasks(resultTasks);
  };

  const handleIsCompleted = (id) => {
    const updatedTasks = tasks.filter((tarea) => tarea.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setTask}
          value={task}
          placeholder="Escribe la tarea"
        />
        <ImagePickerExample setImageTask={setImageTask} />
        <Button onPress={handleAddTask} title="Agregar tarea" />
      </View>
      <ScrollView style={styles.tasksContainer}>
        {tasks.map((tarea) => (
          <View key={tarea.id} style={styles.task}>
            <Text>{tarea.text}</Text>
            {tarea.imageTask && (
              <Image source={{ uri: tarea.imageTask }} style={styles.image} />
            )}
            <TouchableOpacity
              onPress={() => handleIsCompleted(tarea.id)}
              style={styles.completedTaskButton}
            >
              <Text>Hecha</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(tarea.id)}
            >
              <Text>Eliminar tarea</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: "90%",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  tasksContainer: {
    width: "90%",
    marginTop: 10,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedTaskButton: {
    backgroundColor: "#4cbc3d",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});
