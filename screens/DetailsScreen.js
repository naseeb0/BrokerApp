import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import { Colors } from "../config";
import { ScrollView } from 'react-native-gesture-handler';
const DetailsScreen = ({ route }) => {
  const { cardData } = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.cardImage}
        resizeMode="cover"
        source={{ uri: cardData.images }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.detailsContainer}>
        <Text style={styles.cardTitle}>{cardData.project_name}</Text>
        <Text style={styles.cardType}>{cardData.project_type}</Text>
        <Text style={styles.priceInfo}>{cardData.price_info}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome5 name="map-marker-alt" style={styles.icon} />
            <View style={styles.infoTextContainer}>
    <Text style={styles.infoText}>{cardData.project_address}</Text>
  </View>        
   </View>
          <View style={styles.infoRow}>
            <FontAwesome5 name="mail-bulk" style={styles.icon} />
            <Text style={styles.infoText}>{cardData.postalcode}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome5 name="users" style={styles.icon} />
            <Text style={styles.infoText}>{cardData.occupancy}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome5 name="city" style={styles.icon} />
            <Text style={styles.infoText}>{cardData.city.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <FontAwesome5 name="globe-americas" style={styles.icon} />
            <Text style={styles.infoText}>
              {`${cardData.latitude}, ${cardData.longitude}`}
            </Text>
          </View>

        </View>
        <Text style={styles.sectionTitle}>Deposit Structure</Text>
        <Text style={styles.bulletPoint}>- $20,000 at Signing</Text>
        <Text style={styles.bulletPoint}>- $20,000 at 60 days</Text>
        <Text style={styles.bulletPoint}>- $20,000 at 90 days</Text>
        <Text style={styles.bulletPoint}>- $20,000 at 120 days</Text>
        <Text style={styles.sectionTitle}>Offers are conditional on</Text>
        <Text style={styles.bulletPoint}>- Financing and Lawyer’s Review</Text>
        <Text style={styles.sectionTitle}>Incentives:</Text>
        <Text style={styles.bulletPoint}>- 10% Deposit</Text>
        <Text style={styles.bulletPoint}>- Carpet Free Main Floor</Text>
        <Text style={styles.bulletPoint}>- Kitchen island With Flush Breakfast Bar</Text>
        <Text style={styles.bulletPoint}>- Primary Ensuite With Double Sinks & Tiled</Text>
        <Text style={styles.bulletPoint}>- Walk-In Shower With Glass Panels Included</Text>
        <Text style={styles.bulletPoint}>- 5 Appliances Included</Text>
        <Text style={styles.bulletPoint}>- Air Conditioner Included</Text>
        <Text style={styles.bulletPoint}>- Pre-Approvals Accepted</Text>



        
      </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.stickyFooter}>
        <View style={styles.developerInfo}>
          <View style={styles.developerImageContainer}>
            <Image
              source={{ uri: cardData.developer.image }}
              style={styles.developerImage}
              resizeMode="contain" // Set resizeMode to 'contain'
            />
          </View>
          <Text style={styles.developerName}>{cardData.developer.name}</Text>
        </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={handleEmailPress}>
              <FontAwesome5 name="envelope" style={styles.buttonIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handlePhonePress}>
              <FontAwesome5 name="phone" style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
      </View>

    </View>
    
  );
};

// Handle email press
const handleEmailPress = (email) => {
  Linking.openURL(`mailto:nasheeb.dangi@gmail.com?subject=Email for Inquiry&body=I am interested can you please provide me more information`);
};

// Handle phone press
const handlePhonePress = (phone) => {
  Linking.openURL(`tel:977-9860334399`);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: 250,
    borderRadiusTop: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,

  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "#000",
  },
  cardType: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  priceInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  infoContainer: {
    marginTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoTextContainer: {
    flex: 1, // This will make sure the text container expands to fill the available space
  },
  icon: {
    fontSize: 18,
    color: '#555',
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  developerImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  stickyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.airGreyD
  },
  developerImage: {
    width: 32, // Adjust the width as needed
    height: 32, // Adjust the height as needed
    borderRadius: 16  },
  developerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  developerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:Colors.white
    
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }, 
  developerImageContainer: {
    marginRight: 6,
  
  },
  iconButton: {
    backgroundColor: Colors.airGreen, // You can adjust the button color
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  buttonIcon: {
    fontSize: 18,
    color: '#fff',
  },


  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "#000",
  },
  bulletPoint: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
});

export default DetailsScreen;
