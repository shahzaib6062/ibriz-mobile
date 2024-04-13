import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomerCard from "../../../../Component/CustomerCard";
import avatar2 from "../../../../../assets/svg/avatar_2.svg";
import { useRoute } from "@react-navigation/native";
import { useClientsOfAgent } from "../../../../Hooks/useQuery";
import { Image } from "expo-image";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useSession } from "../../../../contexts/sessionContext";
import loadingLogo from "..././../../../assets/IBRIZ_logo.svg";
import { useNavigation } from "expo-router";
import backIcon from "../../../../../assets/svg/backArrow.svg";
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF",
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  titleDesignationText: {
    fontSize: 13,
    marginLeft: 10,
    color: "gray",
    marginTop: 5,
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pill: {
    backgroundColor: "#3498db",
    paddingHorizontal: 12,
    paddingTop: 3,
    borderRadius: 15,
    marginLeft: 10,
  },
  pillText: {
    color: "#fff",
    fontSize: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
  },
  CustomerCard: {
    display: "flex",
    flexDirection: "column",
  },
});

const Customers = () => {
  const navigation = useNavigation();
  const { user } = useSession();
  const route = useRoute();
  const agentId = user?.data?._id;
  const {
    data: customersData,
    isLoading: isLoadingCustomers,
    isError: isErrorCustomers,
    refetch,
  } = useClientsOfAgent(agentId);

  if (isLoadingCustomers) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0432FF",
          justifyContent: "center",
          alignItems: "center",
          objectFit: "contain",
        }}
      >
        <Image source={loadingLogo} width={"50%"} height={100} />
        <Text style={{ marginTop: 10, fontWeight: "bold", color: "#FFF" }}>
          Loading...
        </Text>
      </View>
    );
  }
  if (isErrorCustomers) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0432FF",
          justifyContent: "center",
          alignItems: "center",
          objectFit: "contain",
        }}
      >
        <Image source={loadingLogo} width={"50%"} height={100} />
        <TouchableOpacity onPress={refetch}>
          <Text style={{ marginTop: 10, fontWeight: "bold", color: "#FFF" }}>
            Error fetch again
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={backIcon}
            width={20}
            height={20}
            style={{ marginTop: 5 }}
          />
        </TouchableOpacity>
        <Image source={avatar2} style={styles.avatar} />
        <Text style={styles.titleText}>{user?.data?.name}</Text>
        <Text style={styles.titleDesignationText}>
          {user?.data?.type} {user?.data?.role}
        </Text>
      </View>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Assigned Customer</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>
            {customersData?.data?.count || "0"}
          </Text>
        </View>
      </View>
      {customersData &&
        customersData.data &&
        Array.isArray(customersData?.data?.data) && (
          <ScrollView
            horizontal
            contentContainerStyle={styles.CustomerCard}
            showsHorizontalScrollIndicator={false}
          >
            {customersData?.data?.data.map((customer, index) => (
              <CustomerCard
                key={index}
                name={customer?.name}
                designation="customer"
                phoneNumber="1234567890"
                address={customer?.clientLocation}
                id={customer._id}
                orderStatus={customer?.orderStatus}
              />
            ))}
          </ScrollView>
        )}
    </View>
  );
};

export default Customers;
