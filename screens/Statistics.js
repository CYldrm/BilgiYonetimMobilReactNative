import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import api from "../services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const iconMapping = {
  Marka: "tag-outline",
  "Araç Modeli": "car-outline",
  "Sponsor Bayi": "storefront-outline",
  Denetim: "clipboard-check-outline",
  Çalışan: "account-group-outline",
  "Geri Bildirim": "message-text-outline",
};

const StatisticsScreen = () => {
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brands, carModels, dealers, surveys, users, visitors] = await Promise.all([
          api.get("/brands/getall"),
          api.get("/carmodels/getall"),
          api.get("/dealers/getall"),
          api.get("/surveys/getall"),
          api.get("/users/getall"),
          api.get("/visitors/getall"),
        ]);

        setStatistics({
          Marka: brands.data?.data?.length || 0,
          "Araç Modeli": carModels.data?.data?.length || 0,
          "Sponsor Bayi": dealers.data?.data?.length || 0,
          Denetim: surveys.data?.data?.length || 0,
          Çalışan: users.data?.data?.length || 0,
          "Geri Bildirim": visitors.data?.data?.length || 0,
        });
      } catch (error) {
        setError("Veri çekme sırasında bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0057e7" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const statisticsData = Object.keys(statistics).map((label, index) => ({
    id: index.toString(),
    label,
    value: statistics[label],
    icon: iconMapping[label],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bizi Tercih Ettiğiniz İçin Teşekkür Ederiz</Text>
      <FlatList
        data={statisticsData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <MaterialCommunityIcons name={item.icon} size={36} color="#0057e7" />
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#eef2f8",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#002f6c",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    margin: 10,
    width: "42%",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#002f6c",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0057e7",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
    fontWeight: "600",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ff4c4c",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default StatisticsScreen;