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
import carImages from "../assets/carImages"; // 📌 Resimler içe aktarıldı

const CarModelsScreen = () => {
  const [carModels, setCarModels] = useState([]);
  const [filteredCarModels, setFilteredCarModels] = useState([]); // 📌 Filtrelenmiş liste
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCarModels();
  }, []);

  const fetchCarModels = async () => {
    try {
      const [carModelsResponse, brandsResponse] = await Promise.all([
        api.get("/carmodels/getall"),
        api.get("/brands/getall"),
      ]);

      const carList = carModelsResponse.data?.data || [];
      setCarModels(carList);
      setFilteredCarModels(carList); // 📌 Başlangıçta tüm modelleri göster

      setBrands(brandsResponse.data?.data || []);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Arama Çubuğu için Filtreleme
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query) {
      setFilteredCarModels(carModels); // Eğer sorgu boşsa, tüm listeyi göster
    } else {
      const filteredList = carModels.filter((item) =>
        item.carModelName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCarModels(filteredList);
    }
  };

  // 📌 Araç Kartı Bileşeni
  const renderCarItem = ({ item }) => {
    const carPhotos = carImages[item.carModelId]; // 📌 Araca ait resimler
    const carImage = carPhotos ? carPhotos[0] : null; // 📌 Sadece `1.jpg` olan ilk resmi al

    return (
      <TouchableOpacity
        style={styles.carCard}
        onPress={() => navigation.navigate("CarDetails", { carModelId: item.carModelId })}
      >
        {carImage ? (
          <Image source={carImage} style={styles.carImage} />
        ) : (
          <Text style={styles.noImageText}>Resim Yok</Text>
        )}
        <Text style={styles.carName}>{item.carModelName}</Text>
        <Text style={styles.carDescription}>{item.carModelDescription}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Başlık */}
      <View style={styles.header}>
        <Text style={styles.title}>ARAÇ MODELLERİ</Text>
        <Text style={styles.subtitle}>Araçları marka ve isme göre keşfedin</Text>
      </View>

      {/* Filtreleme Alanı */}
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Araç ismine göre arama yapın..."
          value={searchQuery}
          onChangeText={handleSearch} // 📌 Arama çubuğu çalışıyor
        />
      </View>

      {/* Araç Model Listesi */}
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={filteredCarModels} // 📌 Filtrelenmiş listeyi kullanıyoruz
          keyExtractor={(item) => item.carModelId.toString()}
          renderItem={renderCarItem}
          numColumns={2} // İki sütunlu grid gösterimi
          contentContainerStyle={styles.carList}
        />
      )}
    </View>
  );
};

// 📌 **Stil Ayarları**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#002f6c",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 14,
    color: "#cfd8e3",
    marginTop: 5,
  },
  filtersContainer: {
    marginVertical: 15,
  },
  searchBox: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  carList: {
    paddingBottom: 20,
  },
  carCard: {
    flex: 1,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  carImage: {
    width: 140,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
  noImageText: {
    fontSize: 12,
    color: "#ff0000",
    textAlign: "center",
    marginTop: 10,
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  carDescription: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
});

export default CarModelsScreen;
