import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CarModelsScreen from "../screens/CarModelsScreen";
import CarDetailsScreen from "../screens/CarDetailsScreen";
import DealersScreen from "../screens/DealersScreen";
import ReportsScreen from "../screens/ReportsScreen";
import ReportDetailScreen from "../screens/ReportDetailScreen";
import StatisticsScreen from "../screens/Statistics"; // 📌 Yeni İstatistik Ekranı Eklendi
import AboutUsScreen from "../screens/AboutUsScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import ChatbotScreen from "../screens/ChatbotScreen";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: "Ana Sayfa" }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: "Giriş Yap" }} 
        />
        <Stack.Screen 
          name="CarModels" 
          component={CarModelsScreen} 
          options={{ title: "Araç Modelleri" }} 
        />
        <Stack.Screen 
          name="CarDetails" 
          component={CarDetailsScreen} 
          options={{ title: "Araç Detayları" }} 
        />
        <Stack.Screen 
          name="Dealers" 
          component={DealersScreen} 
          options={{ title: "Bayiler" }} 
        />
        <Stack.Screen 
          name="Reports" 
          component={ReportsScreen} 
          options={{ title: "Raporlar" }} 
        />
        <Stack.Screen 
          name="ReportDetail" 
          component={ReportDetailScreen} 
          options={{ title: "Rapor Detayı" }} 
        />
        <Stack.Screen 
          name="Statistics" 
          component={StatisticsScreen} 
          options={{ title: "İstatistikler" }} 
        />
         <Stack.Screen 
          name="AboutUs" 
          component={AboutUsScreen} 
          options={{ title: "Hakkımızda" }} 
        />
        <Stack.Screen 
          name="ContactUs" 
          component={ContactUsScreen} 
          options={{ title: "Bize Ulaş" }} 
        />
        <Stack.Screen 
          name="Chatbot" 
          component={ChatbotScreen} 
          options={{ title: "Yapay Zeka" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
