import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import pumpLogo from "../../../assets/svg/pump_logo.svg";
import clientLogo from "../../../assets/svg/client_logo.svg";
import agentLogo from "../../../assets/svg/agent_logo.svg";
const { width } = Dimensions.get("window");
const logoSize = width * 0.13;

const FilterKPI = ({ kpiData }) => {
  const kpiLogo =
    kpiData.label === "Total Energy Generated"
      ? pumpLogo
      : kpiData.label === "Total Carbon Offset"
      ? clientLogo
      : agentLogo;

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={pumpLogo}
            style={{
              width: logoSize,
              height: logoSize,
              backgroundColor: "#E0E0E0",
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Text style={styles.valueText}>
              {kpiData.value}
              <Text style={styles.unitText}> {kpiData.unit}</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>{kpiData.label}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 11,
    marginVertical: 15,
    backgroundColor: "#FFF",
    shadowColor: "#DFE5FF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5.5,
    elevation: 3,
    padding: 10,
    margin: 10,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 10,
  },
  logo: {
    width: logoSize,
    height: logoSize,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D7DCF0",
    backgroundColor: "rgba(13, 62, 255, 0.12)",
    padding: 7,
  },
  infoContainer: {
    flex: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  valueText: {
    color: "#1A2641",
    fontFamily: "Noto Sans",
    fontSize: 26,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  unitText: {
    color: "#1639FF",
    fontSize: 16,
  },
  labelText: {
    color: "#99A0B0",
    fontSize: 14,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  actionsContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#D7DCF0",
    backgroundColor: "rgba(4, 50, 255, 0.11)",
    paddingVertical: 3,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginRight: 10,
  },
  vectorIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  changeText: {
    color: "#1639FF",
  },
});

export default FilterKPI;
