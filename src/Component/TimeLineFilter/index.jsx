import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const TimeLineFilter = ({ data }) => {
  const [value, setValue] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectItem = (item) => {
    setValue(item.value);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.dropdown, isDropdownOpen && styles.openDropdown]}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {value ? (
          <Text style={styles.selectedItem}>
            {data.find((item) => item.value === value)?.label}
          </Text>
        ) : (
          <Text style={styles.placeholder}>Select item</Text>
        )}
        <AntDesign name="down" size={20} color="black" />
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownContent}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={styles.item}
              onPress={() => handleSelectItem(item)}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default TimeLineFilter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    overflow: "hidden",
    zIndex: 1,
  },
  openDropdown: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  selectedItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholder: {
    flex: 1,
    fontSize: 16,
    color: "gray",
  },
  dropdownContent: {
    backgroundColor: "white",
    borderColor: "gray",
    borderTopWidth: 0,
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: -1,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
});
