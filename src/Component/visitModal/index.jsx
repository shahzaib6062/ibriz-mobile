import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Switch } from "react-native";
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
  const [pumpStatus, setPumpStatus] = useState(false); // New state for pump status

  useEffect(() => {
    setMapVisible(false);
    setLocation(false);
    setSelectedDate(null);
    setRemark("");
    setPumpStatus(false); // Reset pump status when the modal is opened
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
      pumpStatus: pumpStatus ? "On" : "Off", // Include pump status in the visit data
    };
    setMapVisible(false);
    addVisit(visitData);
    setSelectedDate(null);
    setLocation(null);
    setLocationSuccess(false);
    setRemark("");
    setPumpStatus(false); // Reset pump status after submitting
    onClose();
  };

  const closeLocation = () => {
    setSelectedDate(null);
    setRemark("");
    setLocation(null);
    setLocationSuccess(false);
    setMapVisible(false);
    setMapRegion({});
    setPumpStatus(false); // Reset pump status when closing the modal
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
              numberOfLines={2}
              onChangeText={setRemark}
              value={remark}
              placeholder="Enter relevant remarks for this visit."
            />
          </View>

          {/* Pump Status Toggle */}
          <View style={styles.pumpStatusContainer}>
            <Text style={styles.pumpStatusLabel}>Pump Status:</Text>
            <Switch
              value={pumpStatus}
              onValueChange={(value) => setPumpStatus(value)}
            />
            <Text style={styles.pumpStatusText}>
              {pumpStatus ? "On" : "Off"}
            </Text>
          </View>
<View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <TouchableOpacity
            style={[
              styles.addButton,
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
  addButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 5,
    marginBottom: 10,
    width: "40%",
    alignItems: "center",
    marginRight: 10,
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
    width: "40%",
    alignItems: "center",
    marginLeft: 10,
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
    marginBottom: 10,
  },
  remarkLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  remarkInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    minHeight: 80,
  },
  pumpStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  pumpStatusLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  pumpStatusText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default AddVisitModal;
