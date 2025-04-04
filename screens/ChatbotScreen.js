import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChatbotScreen = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const backendUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  const apiKey = "AIzaSyAEjjvb4Aslpq_COg_YLHgHWnmaAVzkMSk";

  const sendChat = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(`${backendUrl}?key=${apiKey}`, options);
      const data = await response.json();

      const modelResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from model.";

      setHistory((oldHistory) => [
        ...oldHistory,
        { role: "user", text: prompt },
        { role: "model", text: modelResponse },
      ]);
      setPrompt("");
    } catch (err) {
      alert("Bir hata oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.history} contentContainerStyle={{ paddingVertical: 20 }}>
        {history.map((item, index) => (
          <View
            key={index}
            style={[
              styles.message,
              item.role === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <MaterialCommunityIcons
              name={item.role === "user" ? "account-circle-outline" : "robot-outline"}
              size={24}
              color={item.role === "user" ? "#fff" : "#333"}
            />
            <Text style={item.role === "user" ? styles.userText : styles.botText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mesajınızı Giriniz..."
          value={prompt}
          onChangeText={setPrompt}
          editable={!loading}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendChat} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <MaterialCommunityIcons name="send" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef5ff",
    padding: 15,
  },
  history: {
    flex: 1,
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#007bff",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  userText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
  botText: {
    color: "#333",
    marginLeft: 8,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 4,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatbotScreen;