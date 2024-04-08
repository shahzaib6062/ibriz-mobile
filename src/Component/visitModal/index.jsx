import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from "expo-location";
import { useSession } from "../../contexts/sessionContext";
import { useAddVisit } from "../../Hooks/mutations";

const AddVisitModal = ({ isVisible, onClose, clientId }) => {
  const { user } = useSession();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLocationSuccess, setLocationSuccess] = useState(false);
  const {
    mutate: addVisit,
    isLoading: addVisitLoading,
    error: addVisitError,
    isSuccess: addVisitSuccess,
  } = useAddVisit();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    setLocationSuccess(true);
  };

  const handleAddVisitData = () => {
    const visitData = {
      harvestDateTime: selectedDate.toISOString(),
      client: clientId,
      recordedBy: user?.data?._id,
      visitLocation: [location.longitude, location.latitude], // Extracting latitude and longitude
    };
    onClose();
    addVisit(visitData);
    setSelectedDate(null);
    setLocation(null);
    setLocationSuccess(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Visit Details</Text>
          <TouchableOpacity style={styles.button} onPress={showDatePicker}>
            <Text style={styles.buttonText}>
              {selectedDate
                ? selectedDate.toLocaleString()
                : "Select Date & Time"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={getLocationAsync}>
            <Text style={styles.buttonText}>Get Live Location</Text>
          </TouchableOpacity>
          {isLocationSuccess && (
            <Text style={styles.successText}>
              Location successfully obtained!
            </Text>
          )}
          <TouchableOpacity
            style={[styles.button, !selectedDate && styles.disabledButton]}
            onPress={handleAddVisitData}
            disabled={!selectedDate}
          >
            <Text style={styles.buttonText}>Add Visit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  successText: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddVisitModal;
