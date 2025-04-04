import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import api from "../services/api"; // Backend API bağlantısı
import { useNavigation } from "@react-navigation/native";
import Navbar from "../navigation/Navbar"; // Navbar bileşeni

// 📌 Marka logolarını assets/homepage klasöründen yükleme
const logos = {
  Audi: require("../assets/homepage/audilogo.png"),
  BMW: require("../assets/homepage/bmwlogo.png"),
  Fiat: require("../assets/homepage/fiatlogo.png"),
  Honda: require("../assets/homepage/hondalogo.png"),
  Jeep: require("../assets/homepage/jeeplogo.png"),
  Mercedes: require("../assets/homepage/mercedeslogo.png"),
  Renault: require("../assets/homepage/renaultlogo.png"),
  Toyota: require("../assets/homepage/toyotalogo.png"),
  Volkswagen: require("../assets/homepage/volkswagenlogo.png"),
  Volvo: require("../assets/homepage/volvologo.png"),
};

const HomeScreen = () => {
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await api.get("/brands/getall");
      setBrands(response.data.data.map((brand) => brand.brandName));
    } catch (error) {
      console.error("Markaları çekerken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Arama sorgusuna göre markaları filtreleme
  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* 📌 Navbar Eklendi */}
      <Navbar />

      {/* Üst Başlık */}
      <View style={styles.header}>
        <Text style={styles.title}>Dünyanın En Büyük Marka Değeri Veritabanı</Text>
        <Text style={styles.subtitle}>
          Marka değerleri, sıralamalar, raporlar ve araştırmalar için arama yapın.
        </Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Marka arayın"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Markalar Başlığı */}
      <Text style={styles.sectionTitle}>MARKALARIMIZ</Text>

      {/* Markaları Listeleme */}
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={filteredBrands}
          keyExtractor={(item) => item}
          numColumns={2} // 2 sütunlu grid formatında göster
          contentContainerStyle={{ paddingBottom: 20 }} // Son öğelerin ekrana tam oturmasını sağlar
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.brand}
              onPress={() => navigation.navigate("BrandDetails", { brandName: item })}
            >
              <Image source={logos[item]} style={styles.brandImage} />
              <Text style={styles.brandName}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

// 📌 **Stil Ayarları**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3, // Android gölge efekti
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  searchBar: {
    width: "90%",
    padding: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#00bcd4",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  brand: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  brandImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },
  brandName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5a5ff1",
    textAlign: "center",
  },
});

export default HomeScreen;
