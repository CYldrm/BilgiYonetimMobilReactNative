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
import questionGroup from "../assets/questionGroup"; // 📌 Resimler içe aktarıldı

const ReportsScreen = () => {
  const [questionGroups, setQuestionGroups] = useState([]);
  const [filteredQuestionGroups, setFilteredQuestionGroups] = useState([]); // 📌 Filtrelenmiş liste
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchQuestionGroups();
  }, []);

  const fetchQuestionGroups = async () => {
    try {
      const response = await api.get("/questiongroups/getall");
      const data = response.data?.data || [];
      setQuestionGroups(data);
      setFilteredQuestionGroups(data); // 📌 Başlangıçta tüm listeyi göster
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
      setFilteredQuestionGroups(questionGroups); // Eğer sorgu boşsa, tüm listeyi göster
    }else {
      const filteredList = questionGroups.filter((item) =>
        item.questionGroupName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredQuestionGroups(filteredList);
    }
  };

  // 📌 Rapor Kartı Bileşeni
  const renderReportItem = ({ item }) => {
    const reportImage = questionGroup[item.questionGroupId]?.[0] || null; // 📌 Resmi al

    return (
      <TouchableOpacity
        style={styles.reportCard}
        onPress={() =>
          navigation.navigate("ReportDetail", { questionGroupId: item.questionGroupId })
        }
      >
        {/* Resim kontrolü: Eğer resim varsa göster, yoksa boş bırak */}
        {reportImage ? (
          <Image source={reportImage} style={styles.reportImage} />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>Resim Yok</Text>
          </View>
        )}
        <Text style={styles.reportName}>{item.questionGroupName}</Text>
        <Text style={styles.reportDescription}>
          {item.questionGroupDescription || "Açıklama mevcut değil."}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Başlık */}
      <View style={styles.header}>
        <Text style={styles.title}>📊 RAPOR MERKEZİ</Text>
        <Text style={styles.subtitle}>Soru gruplarını keşfedin ve detayları inceleyin</Text>
      </View>

      {/* Arama Alanı */}
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Rapor adına göre arama yapın..."
          value={searchQuery}
          onChangeText={handleSearch} // 📌 Arama çubuğu çalışıyor
        />
      </View>

      {/* Rapor Listesi */}
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={filteredQuestionGroups} // 📌 Filtrelenmiş listeyi kullanıyoruz
          keyExtractor={(item) => item.questionGroupId.toString()}
          renderItem={renderReportItem}
          numColumns={2} // İki sütunlu grid gösterimi
          contentContainerStyle={styles.reportList}
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
  reportList: {
    paddingBottom: 20,
  },
  reportCard: {
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
  reportImage: {
    width: 140,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
  noImageContainer: {
    width: 140,
    height: 100,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  noImageText: {
    fontSize: 12,
    color: "#888",
  },
  reportName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  reportDescription: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
});

export default ReportsScreen;
