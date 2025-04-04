import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import api from "../services/api";
import { useRoute } from "@react-navigation/native";
import questionGroup from "../assets/questionGroup"; // Görseller için import

const ReportDetailScreen = () => {
  const route = useRoute();
  const { questionGroupId } = route.params;
  const [groupDetails, setGroupDetails] = useState(null);
  const [surveyCount, setSurveyCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [processName, setProcessName] = useState("");
  const [surveys, setSurveys] = useState([]);
  const [filterDealerCode, setFilterDealerCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportDetails();
  }, []);

  const fetchReportDetails = async () => {
    try {
      const [groupRes, surveyRes, processRes, dealerRes, userRes, questionRes] = await Promise.all([
        api.get("/questiongroups/getall"),
        api.get("/surveys/getall"),
        api.get("/processes/getall"),
        api.get("/dealers/getall"),
        api.get("/users/getall"),
        api.get("/questions/getall"),
      ]);

      const allGroups = groupRes.data?.data || [];
      const selectedGroup = allGroups.find((g) => g.questionGroupId === parseInt(questionGroupId));
      if (!selectedGroup) return;
      setGroupDetails(selectedGroup);

      const relatedProcess = processRes.data?.data?.find(
        (p) => p.id === selectedGroup.questionprocessid
      );
      setProcessName(relatedProcess?.processName || "Bilinmiyor");

      const allSurveys = surveyRes.data?.data || [];
      const allDealers = dealerRes.data?.data || [];
      const allUsers = userRes.data?.data || [];

      const relatedSurveys = allSurveys
        .filter((s) => s.questionGroupId === parseInt(questionGroupId))
        .map((survey, index) => {
          const dealer = allDealers.find((d) => d.dealerId === survey.dealerId);
          const user = allUsers.find((u) => u.userCode === survey.auditorName);

          return {
            ...survey,
            numberedProcess: index + 1,
            dealerCode: dealer?.dealerCode || "Bayi Kodu Yok",
            dealerCity: dealer?.dealerCity || "Şehir Yok",
            dealerAddress: dealer?.dealerAddress || "Adres Yok",
            auditorFullName: user ? `${user.userName} ${user.userSurname}` : "Kişi Bilgisi Yok",
            formattedDate: new Date(survey.surveyDate).toLocaleDateString("tr-TR") || "Tarih Yok",
          };
        });

      setSurveys(relatedSurveys);
      setSurveyCount(relatedSurveys.length);
      setQuestionCount(questionRes.data?.data.length || 0);
    } catch (error) {
      console.error("Veri yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSurveys = surveys.filter((survey) =>
    survey.dealerCode.toLowerCase().includes(filterDealerCode.toLowerCase())
  );

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <FlatList
      style={styles.container}
      data={filteredSurveys}
      keyExtractor={(item) => item.dealerCode}
      ListHeaderComponent={
        <>
          {/* Üst Başlık */}
          <View style={styles.header}>
            <FontAwesome5 name="chart-bar" size={28} color="#fff" />
            <Text style={styles.title}>RAPOR MERKEZİ</Text>
            <Text style={styles.subtitle}>Marka sıralama raporları ve detayları</Text>
          </View>

          {/* Grup Bilgileri */}
          {groupDetails && (
            <View style={styles.detailsContainer}>
              <Image source={questionGroup[questionGroupId]?.[0] || null} style={styles.image} />
              <Text style={[styles.processTitle, { fontWeight: "bold", textAlign: "center", fontSize: 18 }]}>
                {groupDetails.questionGroupName}
              </Text>

              <Text style={[styles.processDescription, { textAlign: "center" }]}>
                <Text style={styles.italicText}>{groupDetails.questionGroupDescription}</Text>
              </Text>

              <View style={styles.infoTable}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    <MaterialIcons name="work-outline" size={18} /> Süreç Adı:
                  </Text>
                  <Text style={styles.answerText}>{processName}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    <MaterialIcons name="verified-user" size={18} /> Denetim Aktifliği:
                  </Text>
                  <Text style={styles.answerText}>Aktif</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    <MaterialIcons name="assessment" size={18} /> Yapılan Denetim Sayısı:
                  </Text>
                  <Text style={styles.answerText}>{surveyCount}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    <MaterialIcons name="question-answer" size={18} /> Soru Sayısı:
                  </Text>
                  <Text style={styles.answerText}>{questionCount}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Arama Kutusu */}
          <Text style={[styles.sectionTitle, { fontWeight: "bold", textAlign: "center" }]}>
            📋 Yapılan Denetimler
          </Text>
          <TextInput
            style={styles.searchBox}
            placeholder="🔍 Bayi Kodu ile filtrele..."
            value={filterDealerCode}
            onChangeText={setFilterDealerCode}
          />
        </>
      }
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.surveyItem}>
          <Text>🏢 <Text style={styles.boldText}>Bayi:</Text> {item.dealerCode} ({item.dealerCity})</Text>
          <Text>📍 <Text style={styles.boldText}>Adres:</Text> {item.dealerAddress}</Text>
          <Text>👤 <Text style={styles.boldText}>Denetleyen:</Text> {item.auditorFullName}</Text>
          <Text>📅 <Text style={styles.boldText}>Tarih:</Text> {item.formattedDate}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

// 📌 **Stil Ayarları**
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 10 },
  header: { alignItems: "center", padding: 20, backgroundColor: "#002f6c", borderRadius: 10 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginTop: 5 },
  subtitle: { fontSize: 14, color: "#cfd8e3", marginTop: 5 },
  detailsContainer: { padding: 15, backgroundColor: "#fff", borderRadius: 10, marginTop: 15 },
  image: { width: "100%", height: 200, borderRadius: 10 },
  searchBox: { borderWidth: 1, borderRadius: 8, padding: 8, marginVertical: 10 },
  surveyItem: { padding: 10, backgroundColor: "#fff", marginTop: 10, borderRadius: 8 },

  // ⚡️ Güncellenmiş ve renklendirilmiş stiller buradan başlıyor
  infoTable: { justifyContent: "center", alignItems: "center", marginTop: 10, padding: 10 },
  row: { flexDirection: "row", justifyContent: "center", marginVertical: 5, backgroundColor: "#eef5ff", borderRadius: 8, padding: 6 },
  boldText: { fontWeight: "bold", textAlign: "center", color: "#0057e7" },
  answerText: { textAlign: "center", marginLeft: 5, color: "#333" },
  // ⚡️ Güncellenmiş ve renklendirilmiş stiller burada bitiyor
});


export default ReportDetailScreen;
