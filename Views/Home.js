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
  Modal,
} from "react-native";
import ImagePickerExample from "../Components/ImagePicker";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [imageTask, setImageTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
      setModalVisible(false);
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
      <Button onPress={() => setModalVisible(true)} title="Agregar tarea" />

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Tarea</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTask}
              value={task}
              placeholder="Escribe la tarea"
            />
            <ImagePickerExample setImageTask={setImageTask} />

            {/* Vista previa de la imagen seleccionada */}
            {imageTask && (
              <Image source={{ uri: imageTask }} style={styles.previewImage} />
            )}
            <View style={styles.addAndDeleteButtons}>
              <Button onPress={handleAddTask} title="Agregar" />
              <Button
                onPress={() => setModalVisible(false)}
                title="Cancelar"
                color="#ff6347"
              />
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.tasksContainer}>
        {tasks.map((tarea) => (
          <View key={tarea.id} style={styles.task}>
            <Text>{tarea.text}</Text>
            {tarea.imageTask && (
              <Image source={{ uri: tarea.imageTask }} style={styles.image} />
            )}
            <View style={styles.doneAndDeleteButtons}>
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
  tasksContainer: {
    marginTop: 10,
  },
  task: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: "80%",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  completedTaskButton: {
    backgroundColor: "#4cbc3d",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
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
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 10,
  },
  addAndDeleteButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  doneAndDeleteButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    marginTop: 10,
  },
});

