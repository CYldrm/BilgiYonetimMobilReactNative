import React from "react";
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ContactUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="email-newsletter" size={60} color="#fff" />
        <Text style={styles.headerTitle}>Bize Ulaşın</Text>
        <Text style={styles.headerDescription}>
          Görüşleriniz, sorularınız ve iş birliği teklifleriniz için bizimle iletişime geçin!
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <ContactCard
          icon="phone"
          title="Genel İletişim"
          details={[
            { label: "📞 Telefon", value: "+90 (216) 123 45 67", link: "tel:+902161234567" },
            { label: "📧 E-posta", value: "info@otomotivplatformu.com", link: "mailto:info@otomotivplatformu.com" },
            { label: "🌐 Web Sitesi", value: "www.otomotivplatformu.com", link: "https://www.otomotivplatformu.com" },
          ]}
        />

        <ContactCard
          icon="map-marker"
          title="Adresimiz"
          details={[
            { label: "🏢 Merkez Ofis", value: "Otomotiv Teknoloji Merkezi, Anadolu Caddesi No:45, Kadıköy, İstanbul" },
          ]}
        />

        <ContactCard
          icon="headset"
          title="Destek Hattı"
          details={[
            { label: "💬 Canlı Destek", value: "Pzt-Cum: 09:00-18:00, Cmt: 10:00-16:00" },
            { label: "📧 E-posta Desteği", value: "support@otomotivplatformu.com", link: "mailto:support@otomotivplatformu.com" },
            { label: "📞 Hızlı Destek Hattı", value: "0850 800 90 90", link: "tel:08508009090" },
          ]}
        />

        <ContactCard
          icon="instagram"
          title="Sosyal Medyada Biz"
          details={[
            { label: "📱 Instagram", value: "@otomotivplatformu", link: "https://instagram.com/otomotivplatformu" },
            { label: "🐦 Twitter", value: "@otoPlatform", link: "https://twitter.com/otoPlatform" },
            { label: "📘 Facebook", value: "Otomotiv Platformu", link: "https://facebook.com/OtomotivPlatformu" },
            { label: "💼 LinkedIn", value: "Otomotiv Platformu", link: "https://linkedin.com/company/otomotivplatformu" },
          ]}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Hedefimiz</Text>
        <Text style={styles.footerText}>
          Sizlerden gelen geri bildirimlerle platformumuzu sürekli geliştiriyoruz. Daha iyi bir hizmet için bize ulaşın! 🚀
        </Text>
      </View>
    </ScrollView>
  );
};

const ContactCard = ({ icon, title, details }) => (
  <View style={styles.card}>
    <MaterialCommunityIcons name={icon} size={32} color="#0057e7" />
    <Text style={styles.cardTitle}>{title}</Text>
    {details.map((detail, idx) => (
      <TouchableOpacity
        key={idx}
        onPress={() => detail.link && Linking.openURL(detail.link)}
        disabled={!detail.link}
      >
        <Text style={[styles.cardText, detail.link && styles.linkText]}>{detail.label}: {detail.value}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f0f5ff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#0057e7",
    borderRadius: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  headerDescription: {
    fontSize: 16,
    color: "#e0eaff",
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0057e7",
    marginVertical: 8,
  },
  cardText: {
    fontSize: 16,
    color: "#444",
    marginVertical: 3,
  },
  linkText: {
    color: "#0057e7",
    textDecorationLine: "underline",
  },
  footer: {
    padding: 20,
    backgroundColor: "#0057e7",
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  footerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  footerText: {
    fontSize: 16,
    color: "#e0eaff",
    textAlign: "center",
    marginTop: 10,
  },
});

export default ContactUsScreen;
