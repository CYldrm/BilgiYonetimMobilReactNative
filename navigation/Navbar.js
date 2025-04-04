import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Navbar = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("CarModels");

  const handleNavigation = (screen) => {
    setActiveTab(screen);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.navbarContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.navbar}>
          {/* Araç Modelleri */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => handleNavigation("CarModels")}
          >
            <Icon
              name="car"
              size={22}
              color={activeTab === "CarModels" ? "#007bff" : "#555"}
            />
            <Text style={[styles.navText, activeTab === "CarModels" && styles.activeText]}>
              Araç Modelleri
            </Text>
          </TouchableOpacity>

          {/* Bayiler */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => handleNavigation("Dealers")}
          >
            <Icon
              name="storefront-outline"
              size={22}
              color={activeTab === "Dealers" ? "#007bff" : "#555"}
            />
            <Text style={[styles.navText, activeTab === "Dealers" && styles.activeText]}>
              Bayiler
            </Text>
          </TouchableOpacity>

          {/* Raporlar */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => handleNavigation("Reports")}
          >
            <Icon
              name="file-chart-outline"
              size={22}
              color={activeTab === "Reports" ? "#007bff" : "#555"}
            />
            <Text style={[styles.navText, activeTab === "Reports" && styles.activeText]}>
              Raporlar
            </Text>
          </TouchableOpacity>

          {/* Veri Tabanımız */}
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => handleNavigation("Statistics")} // burası değiştirildi
            >
              <Icon
                name="database"
                size={22}
                color={activeTab === "Statistics" ? "#007bff" : "#555"}
              />
              <Text style={[styles.navText, activeTab === "Statistics" && styles.activeText]}>
                Veri Tabanımız
              </Text>
            </TouchableOpacity>


          {/* Hakkımızda */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => handleNavigation("AboutUs")}
          >
            <Icon
              name="information-outline"
              size={22}
              color={activeTab === "AboutUs" ? "#007bff" : "#555"}
            />
            <Text style={[styles.navText, activeTab === "AboutUs" && styles.activeText]}>
              Hakkımızda
            </Text>
          </TouchableOpacity>

          {/* Bize Ulaş */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => handleNavigation("ContactUs")}
          >
            <Icon
              name="email-outline"
              size={22}
              color={activeTab === "ContactUs" ? "#007bff" : "#555"}
            />
            <Text style={[styles.navText, activeTab === "ContactUs" && styles.activeText]}>
              Bize Ulaş
            </Text>
          </TouchableOpacity>

          {/* Yapay Zeka */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => handleNavigation("Chatbot")}
          >
            <Icon
              name="robot-outline"
              size={22}
              color={activeTab === "Chatbot" ? "#007bff" : "#555"}
            />
            <Text style={[styles.navText, activeTab === "Chatbot" && styles.activeText]}>
              Yapay Zeka 🤖
            </Text>
          </TouchableOpacity>

          {/* Giriş Yap */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleNavigation("Login")}
          >
            <Icon name="account-circle-outline" size={22} color="white" />
            <Text style={styles.loginText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// 📌 **Navbar Stilleri**
const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  navItem: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 15,
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "bold",
    marginTop: 4,
  },
  activeText: {
    color: "#007bff",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginLeft: 15,
  },
  loginText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default Navbar;
