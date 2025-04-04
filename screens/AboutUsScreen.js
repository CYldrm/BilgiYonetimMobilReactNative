import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AboutUsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
       {/* <MaterialCommunityIcons name="car-estate" size={48} color="#fff" />*/}
        <Text style={styles.bannerTitle}>Bizi Daha İyi Tanıyın</Text>
      </View>

      <View style={styles.content}>
        <Section title="Biz Kimiz?" icon="account-group">
          <Text style={styles.text}>
            Otomotiv sektöründe yenilikçi bir anlayışla yola çıkan bir ekip olarak, Türkiye’deki bayiler ve otomotiv şirketleri için daha etkili ve sürdürülebilir bir denetim sistemi oluşturmayı hedefliyoruz.
          </Text>
        </Section>

        <Section title="Tarihçemiz" icon="history">
          <Text style={styles.text}>
            Kuruluşumuzdan bu yana, otomotiv sektöründeki sorunlara modern çözümler üretmeyi kendimize misyon edindik. Bayii denetimlerini kolaylaştıran, kullanıcı dostu ve yapay zeka destekli çözümler sunuyoruz.
          </Text>
        </Section>

        <Section title="Ne Yapıyoruz?" icon="cog-outline">
          <Text style={styles.text}>
            Platformumuz, bayilerde yapılan denetim süreçlerini dijitalleştirerek, standart sorular üzerinden değerlendirme yapılmasına olanak tanır.
          </Text>
        </Section>

        <Section title="Amacımız" icon="target-account">
          <Text style={styles.text}>
            Müşteri odaklı ve sürdürülebilir bir otomotiv sektörü oluşturmayı hedefliyoruz.
          </Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>• Adil rekabet ortamı oluşturmak</Text>
            <Text style={styles.listItem}>• Kalite standartlarını yükseltmek</Text>
            <Text style={styles.listItem}>• Kullanıcı deneyimini sürekli iyileştirmek</Text>
          </View>
        </Section>

        <Section title="Gelecek Vizyonumuz" icon="eye-outline">
          <Text style={styles.text}>
            İnovasyon ve teknolojiyi birleştirerek sektöre öncülük etmeye devam etmek istiyoruz. Hedefimiz küresel çapta bir model olmak.
          </Text>
        </Section>

        <Section title="Bizimle İletişime Geçin" icon="email-outline">
          <Text style={styles.text}>
            Sorularınız, önerileriniz veya projelerimizle ilgili daha fazla bilgi almak için bizimle her zaman iletişime geçebilirsiniz. Daha iyi bir otomotiv sektörü için birlikte çalışalım!
          </Text>
        </Section>
      </View>
    </ScrollView>
  );
};

const Section = ({ title, icon, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <MaterialCommunityIcons name={icon} size={26} color="#0057e7" />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2f8" },
  banner: {
    backgroundColor: "#0057e7",
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 6,
  },
  bannerTitle: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  content: { padding: 20 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#0057e7",
    fontWeight: "bold",
    marginLeft: 8,
  },
  text: { fontSize: 16, color: "#555", lineHeight: 24 },
  listContainer: { marginTop: 10, paddingLeft: 10 },
  listItem: { fontSize: 16, color: "#555", marginBottom: 6 },
});

export default AboutUsScreen;