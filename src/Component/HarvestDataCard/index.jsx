import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
  
} from "react-native";

const HarvestDataCard = ({ data , index}) => {
  const [showFullText, setShowFullText] = useState({});
  const [selectedFullText, setSelectedFullText] = useState(null);

  const handleValueClick = (index, value) => {
    if (value instanceof Array) {
      const reverseArray = value.slice().reverse();
      openGoogleMaps(reverseArray);
    } else {
      setShowFullText((prev) => ({ ...prev, [index]: !prev[index] }));
      setSelectedFullText(value);
    }
  };

  const closeFullTextModal = () => {
    setSelectedFullText(null);
  };

  const truncateText = (text, maxLength) => {
    if (typeof text !== "string") {
      return text;
    }
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const openGoogleMaps = (location) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location.join(",")
    )}`;
    Linking.openURL(url);
  };

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.container}>
          <Text style={styles.heading}>Visit # {index + 1}</Text>
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
                  {item.value instanceof Array ? "View Location" : truncateText(item.value, 25)}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <Modal
        visible={selectedFullText !== null}
        onRequestClose={closeFullTextModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.fullText}>{selectedFullText}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeFullTextModal}
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  container: {
    padding: 15,
    borderTopWidth: 0.8,
    borderTopColor: "#E0E0E0",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
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
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  value: {
    fontSize: 16,
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
  fullText: {
    fontSize: 16,
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

