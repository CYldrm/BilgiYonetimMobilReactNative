import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import api from "../services/api";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const DealersScreen = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      const response = await api.get("/dealers/getall");
      setDealers(response.data?.data || []);
    } catch (error) {
      setError("Bayileri yüklerken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const filteredDealers = dealers.filter((dealer) =>
    dealer.dealerCity.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TÜRKİYE SPONSOR BAYİLERİMİZ</Text>

      {/* 🔍 Arama Kutusu */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Şehir Ara..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 📌 Bayi Listesi */}
      <FlatList
        data={filteredDealers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dealerCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.dealerCode}>{item.dealerCode}</Text>
              <View style={styles.cityBadge}>
                <Text style={styles.cityText}>{item.dealerCity}</Text>
              </View>
            </View>

            <Text style={styles.dealerAddress}>{item.dealerAddress}</Text>

            {/* 📞 Telefon butonu */}
            <TouchableOpacity
              style={styles.phoneButton}
              onPress={() => Linking.openURL(`tel:${item.dealerPhoneNo}`)}
            >
              <MaterialIcons name="phone" size={20} color="white" />
              <Text style={styles.phoneText}>{item.dealerPhoneNo}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

// 📌 **Modern Tasarım Stilleri**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#007bff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: "#333",
  },
  dealerCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderLeftWidth: 6,
    borderLeftColor: "#007bff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dealerCode: {
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "600",
    color: "#555",
    opacity: 0.7,
  },
  cityBadge: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  cityText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  dealerAddress: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
    lineHeight: 20,
  },
  phoneButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  phoneText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 14,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
});

export default DealersScreen;
