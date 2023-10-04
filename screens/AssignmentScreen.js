import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "../config";
const windowWidth = Dimensions.get('window').width;
// I AM WORKING OUT
const AssignmentScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

//Body Filteration by QUERY
  const [filteredItems, setFilteredItems] = useState([]); // Filtered data based on search query


  const fetchEventData = async () => {
    try {
      const response = await fetch("https://api.homebaba.ca/assignment-all/");
      const apiResponse = await response.json();
      console.log(apiResponse.data.results);
      if (apiResponse.data.results && Array.isArray(apiResponse.data.results)) {
        const simplifiedData = apiResponse.data.results.map((item) => {
          return {
            mainImg: item.mainimage,
            allimg: item.image,
            project_name: item.project_name,
            project_type: item.project_type,
            price_info: (item.price_starting_from === 0.0) 
            ? "TBD"
            : `$${item.price_starting_from}`,
            project_address: item.project_address,
            postalcode: item.postalcode,
            occupancy:item.occupancy,
            city:item.city,
            developer:item.developer,
            latitude:item.latitude,
            longitude:item.longitude,
            
          };
        });
  
        setData(simplifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const filterDataByQuery = (query) => {
    if (query === "") {
      return data; // If the query is empty, return the original data
    }
  
    const lowercaseQuery = query.toLowerCase(); // Convert the query to lowercase for case-insensitive search
  
    return data.filter((item) => {
      const city = item.city ? item.city.name.toLowerCase() : ''; // Check if item.city exists and convert to lowercase
  
      // Check if project name contains the query or if city name contains the query
      const isCityMatch = city.includes(lowercaseQuery);
  
      return  isCityMatch;
    });
  };
  
  
  useEffect(() => {
    console.log("Data:", data); // Check if data is loaded
    const filtered = filterDataByQuery(searchQuery);
    console.log("Filtered Data:", filtered); // Check the filtered data
    setFilteredItems(filtered);
  }, [searchQuery, data]);





  
  const toggleFavorite = () => {
    setIsFavorite(prevState => !prevState);
  };

  const filterDataByCity = (city) => {
    if (city === "") {
      return data;
    }
    return data.filter(item => item.city && item.city.name.toLowerCase() === city.toLowerCase());
  };
  



  useEffect(() => {
    fetchEventData();
  }, []);
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      {item.map(cardData => (
        <TouchableOpacity
          key={cardData.project_name}
          style={[styles.cardContainer, { width: windowWidth / 2 - 24 }]}
          onPress={() => navigation.navigate("AssignmentDetails", { cardData })}
        >
          <View style={styles.imageContainer}>
            <Image
            style={styles.cardImage}
            resizeMode="cover"
            source={{ uri: cardData.mainImg }}
          />
          </View>
          <Text style={styles.cardType}>{cardData.project_type}</Text>
          {/* <Text style={styles.priceInfo}>{cardData.price_info}</Text> */}
          <Text style={styles.project_address}>{cardData.project_address}</Text>
          <Text style={styles.city_name}>{cardData.city.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const groupDataIntoRows = (data, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < data.length; i += itemsPerRow) {
      const row = data.slice(i, i + itemsPerRow);
      rows.push(row);
    }
    return rows;
  };

  const filteredData = filterDataByCity(selectedCity);

//FEAT 1 

const handleSearch = (text) => {
  setSearchQuery(text);
};

//FEAT1 END

  // FEAT1
  const filteredDataWithSearch = searchQuery
    ? filterDataByQuery(searchQuery)
    : filteredData;
    //FEAT1 END

    // PREVIOUS BEFORE FEAT 1 const rows = groupDataIntoRows(filteredData, 2);
    const rows = groupDataIntoRows(filteredDataWithSearch, 2);
  return (
    <View style={[styles.container]}>
{/* Search bar */}
<View style={styles.searchContainer}>
        <Icon name="magnify" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by City or Project Name"
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>





    <FlatList
      data={rows}
      renderItem={renderRow}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },  
  card: {
    margin: 8,
    backgroundColor: "#FBF4F4",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
  filterContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Align items and filter icon horizontally
  },
  picker: {
    width: "100%",
    height: 40,
  },
  
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
    fontFamily: "UberMoveBold",
  },
  cardType: {
    fontSize: 13,
    // fontWeight: "bold",
    // color: Colors.airGreen,
    fontFamily: "AirbnbCerealBook",
    marginBottom:1
    
  },
  city_name: {
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.airGreen,
    fontFamily: "AirbnbCerealBook",
    marginBottom:1
    
  },
  priceInfo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
    fontFamily: "UberMoveRegular",
  },
  project_address: {
    fontSize: 13,
    color: "#666",
    fontFamily: "UberMoveRegular",

  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: 40,
  },
  filterIconContainer: {
    marginLeft: 16,
  },
  filterIcon: {
    fontSize: 24,
  },
  //Overlay
  imageContainer: {
    position: "relative",
    overflow: "hidden", // This ensures the overlay doesn't exceed the image size

  },
  overlayRectangle: {
    borderRadius: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 95,
    height: 30, // Adjust the height as needed
    backgroundColor: "rgba(251, 225, 4, 0.9)",

    // backgroundColor: "rgba(145, 70, 105,0.8)",
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    
  },
  overlayTextTop: {
    fontSize: 12,
    color: "#000",
    fontFamily: "UberMoveMedium",
    marginBottom: 45,
  },
  overlayTextBottom: {
    fontSize: 12,
    color: "#000",
    fontFamily: "UberMoveMedium",
  },
});

export default AssignmentScreen;