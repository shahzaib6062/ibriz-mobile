import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HarvestDataCard = ({ data }) => {
  console.log("🚀 ~ HarvestDataCard ~ data:", data);
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{item.label}: </Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
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
  },
  value: {
    fontSize: 16,
  },
});

export default HarvestDataCard;
