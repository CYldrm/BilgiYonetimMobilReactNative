import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import api from "../services/api";
import carImages from "../assets/carImages";
import { FontAwesome } from "@expo/vector-icons"; // ⭐ Yıldız ikonları için

const { width } = Dimensions.get("window");

const CarDetailsScreen = () => {
  const route = useRoute();
  const { carModelId } = route.params;
  const [carDetails, setCarDetails] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    visitorName: "",
    visitorSurname: "",
    visitorAge: "",
    visitorMail: "",
    visitorComment: "",
    visitorComfort: 1,
    visitorFuelefficiency: 1,
    visitorPricePerformance: 1,
    visitorDesign: 1,
    visitorDurability: 1,
  });

  useEffect(() => {
    fetchCarDetails();
  }, []);

  const fetchCarDetails = async () => {
    try {
      const carResponse = await api.get("/carmodels/getall");
      const allCars = carResponse.data?.data || [];
      const selectedCar = allCars.find(car => car.carModelId === carModelId);
      setCarDetails(selectedCar || null);

      const carPhotos = carImages[carModelId] || [];
      setSelectedPhoto(carPhotos.length > 0 ? carPhotos[0] : null);

      const brandResponse = await api.get("/brands/getall");
      const allBrands = brandResponse.data?.data || [];
      const matchedBrand = allBrands.find(brand => brand.brandId === selectedCar?.brandId);
      setBrandName(matchedBrand ? matchedBrand.brandName : "Bilinmeyen Marka");

      const commentsResponse = await api.get("/visitors/getall");
      const allComments = commentsResponse.data?.data || [];
      const filteredComments = allComments.filter(comment => comment.carModelId === carModelId);
      setComments(filteredComments);
    } catch (error) {
      console.error("Veri çekilirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const newComment = {
        carModelId: carModelId,
        ...formData,
      };
      await api.post("/visitors/add", newComment);
      setComments([...comments, newComment]);
      setShowForm(false);
    } catch (error) {
      console.error("Yorum eklenirken hata:", error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{brandName}</Text>

      {selectedPhoto && <Image source={selectedPhoto} style={styles.mainImage} />}
      
      <FlatList
        data={carImages[carModelId] || []}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedPhoto(item)}>
            <Image source={item} style={styles.thumbnail} />
          </TouchableOpacity>
        )}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>🚗 Araç Adı: {carDetails?.carModelName}</Text>
        <Text style={styles.infoText}>⛽ Yakıt Türü: {carDetails?.carModelFuelType}</Text>
        <Text style={styles.infoText}>🔧 Motor Hacmi: {carDetails?.carModelEngineCapacity} L</Text>
        <Text style={styles.infoText}>⚡ Güç: {carDetails?.carModelPower}</Text>
        <Text style={styles.infoText}>💰 Fiyat: {carDetails?.carModelPrice} $</Text>
        <Text style={styles.description}>{carDetails?.carModelDescription}</Text>
      </View>

      <Text style={styles.commentTitle}>💬 Yorumlar</Text>
      {comments.map((comment, index) => (
        <View key={index} style={styles.commentCard}>
          <Text style={styles.commentName}>
            {comment.visitorName} {comment.visitorSurname} ({comment.visitorAge}):
          </Text>
          <Text style={styles.commentText}>{comment.visitorComment}</Text>
        </View>
      ))}

      <TouchableOpacity onPress={() => setShowForm(!showForm)} style={styles.addCommentButton}>
        <Text style={styles.addCommentText}>✍️ Yorum Yap</Text>
      </TouchableOpacity>

      {showForm && (
        <View style={styles.commentForm}>
          <TextInput placeholder="Adınız" onChangeText={(text) => handleInputChange("visitorName", text)} style={styles.input} />
          <TextInput placeholder="Soyadınız" onChangeText={(text) => handleInputChange("visitorSurname", text)} style={styles.input} />
          <TextInput placeholder="Yaşınız" keyboardType="numeric" onChangeText={(text) => handleInputChange("visitorAge", text)} style={styles.input} />
          <TextInput placeholder="E-posta" onChangeText={(text) => handleInputChange("visitorMail", text)} style={styles.input} />
          <TextInput placeholder="Yorumunuz" onChangeText={(text) => handleInputChange("visitorComment", text)} style={styles.input} multiline />

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Gönder</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  mainImage: { width: width * 0.9, height: 200, borderRadius: 10, alignSelf: "center" },
  thumbnail: { width: 60, height: 60, margin: 5, borderRadius: 5 },
  infoContainer: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginTop: 10 },
  infoText: { fontSize: 16, marginBottom: 5 },
  description: { fontSize: 14, color: "#555", marginTop: 10 },
  commentCard: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginTop: 10, elevation: 3 },
  commentName: { fontWeight: "bold", fontSize: 16, color: "#007bff" },
  addCommentButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 },
  addCommentText: { color: "white", fontWeight: "bold" },
  commentForm: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginTop: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  submitButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5, alignItems: "center" },
  submitButtonText: { color: "white", fontWeight: "bold" },
});

export default CarDetailsScreen;
