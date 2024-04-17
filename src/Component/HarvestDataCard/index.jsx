import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const HarvestDataCard = ({ data }) => {
  const [showFullText, setShowFullText] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleValueClick = (index, value) => {
    if (value instanceof Array) {
      setSelectedLocation(value);
    } else {
      setShowFullText((prev) => ({ ...prev, [index]: !prev[index] }));
    }
  };

  const closeMapViewModal = () => {
    setSelectedLocation(null);
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{item.label}: </Text>
          <TouchableOpacity onPress={() => handleValueClick(index, item.value)}>
            <Text
              style={[
                styles.value,
                item.value instanceof Array && styles.link,
                showFullText[index] ? styles.valueFull : styles.valueTruncated,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.value instanceof Array ? "View Location" : item.value}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      <Modal
        visible={selectedLocation !== null}
        onRequestClose={closeMapViewModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedLocation && (
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: selectedLocation[0],
                  longitude: selectedLocation[1],
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: selectedLocation[0],
                    longitude: selectedLocation[1],
                  }}
                  title="Location"
                />
              </MapView>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeMapViewModal}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderTopWidth: 0.8,
    borderTopColor: "#E0E0E0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    width: "50%",
  },
  value: {
    fontSize: 16,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  valueTruncated: {
    flex: 1,
    flexWrap: "wrap",
  },
  valueFull: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    minWidth: 300,
    maxWidth: "80%",
  },
  map: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  closeText: {
    color: "#000",
  },
});

export default HarvestDataCard;
