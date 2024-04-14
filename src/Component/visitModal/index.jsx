import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from "expo-location";
import { useSession } from "../../contexts/sessionContext";
import { useAddVisit } from "../../Hooks/mutations";
import MapView, { Marker } from "react-native-maps";
import { TextInput } from "react-native-gesture-handler";

const AddVisitModal = ({ isVisible, onClose, clientId }) => {
  const { user } = useSession();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLocationSuccess, setLocationSuccess] = useState(false);
  const [isMapVisible, setMapVisible] = useState(false);
  const [mapRegion, setMapRegion] = useState({});
  const [remark, setRemark] = useState("");

  useEffect(() => {
    setMapVisible(false);
    setLocation(false);
    setSelectedDate(null);
    setSelectedDate(false);
    setRemark("");
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        // Handle permission denial (optional)
      }
    };

    requestLocationPermission();
  }, []);

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
  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
    }
  }, [location]);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    setLocationSuccess(true);
    setMapVisible(true);
  };
  const checkSubmitDisabled = () => {
    if (!selectedDate) {
      return true;
    }
    if (!remark) {
      return true;
    }
    if (!location) {
      return true;
    }
    return false;
  };
  const handleAddVisitData = () => {
    if (!selectedDate) {
      return;
    }
    if (!remark) {
      return;
    }
    if (!location) {
      return;
    }
    const visitData = {
      harvestDateTime: selectedDate.toISOString(),
      client: clientId,
      recordedBy: user?.data?._id,
      visitLocation: [location.longitude, location.latitude],
      remarks: remark,
    };
    setMapVisible(false);
    addVisit(visitData);
    setSelectedDate(null);
    setLocation(null);
    setLocationSuccess(false);
    setRemark("");
    onClose();
  };

  const closeLocation = () => {
    setSelectedDate(null);
    setRemark("");
    setLocation(null);
    setLocationSuccess(false);
    setMapVisible(false);
    setMapRegion({});
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeLocation}
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
          {isMapVisible && (
            <View style={styles.container}>
              <MapView
                style={styles.map}
                region={mapRegion}
                marker={
                  location && {
                    coordinate: {
                      latitude: location.latitude,
                      longitude: location.longitude,
                    },
                  }
                }
              />
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={getLocationAsync}>
            <Text style={styles.buttonText}>Get Live Location</Text>
          </TouchableOpacity>
          {isLocationSuccess && (
            <Text style={styles.successText}>
              Location successfully obtained!
            </Text>
          )}
          <View style={styles.remarkField}>
            <TextInput
              style={styles.remarkInput}
              multiline={true}
              numberOfLines={4}
              onChangeText={setRemark}
              value={remark}
              placeholder="Enter any relevant remarks for this visit."
            />
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              checkSubmitDisabled() && styles.disabledButton,
            ]}
            onPress={handleAddVisitData}
            disabled={checkSubmitDisabled()}
          >
            <Text style={styles.buttonText}>Add Visit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={closeLocation}>
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
  map: {
    width: 250,
    height: 200,
  },
  remarkField: {
    marginBottom: 10, // Add spacing for readability
  },
  remarkLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5, // Add spacing between label and input
  },
  remarkInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16, // Adjust font size for consistency
    minHeight: 80, // Set minimum height for multiline input
  },
});

export default AddVisitModal;
