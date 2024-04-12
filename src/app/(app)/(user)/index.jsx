import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import FilterKPI from "../../../Component/FilterKpi";
import { AntDesign } from "@expo/vector-icons";
import AgentsCard from "../../../Component/AgentsCard";
import loadingLogo from "../../../../assets/IBRIZ_logo.svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  UseAgentKpis,
  useClientsByAgent,
  useFieldAgentsBySalesAgent,
} from "../../../Hooks/useQuery";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSession } from "../../../contexts/sessionContext";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  appLayout: {
    backgroundColor: "#FFF",
  },
  AgentsCardRow: {
    flexDirection: "row",
    marginTop: 10,
    marginRight: 40,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0432FF",
    justifyContent: "center",
    alignItems: "center",
    objectFit: "contain",
  },
});

export default function Index() {
  const { user } = useSession();
  const [kpiData, setKpiData] = useState([]);
  const {
    data: clientsByAgent,
    isLoading: isLoadingClients,
    isError: isErrorClients,
    error: errorClients,
    refetch: refetchClients,
  } = useClientsByAgent();

  const {
    data: fieldAgentsBySalesAgent,
    isLoading: isLoadingFieldAgents,
    isError: isErrorFieldAgents,
    error: errorFieldAgents,
    refetch: refetchFieldAgents,
  } = useFieldAgentsBySalesAgent();

  const {
    data: agentKpis,
    isLoading: isLoadingAgentKpis,
    isError: isErrorAgentKpis,
    isSuccess: isSuccessAgentKpis,
    refetch: refetchAgentKpis,
  } = UseAgentKpis();

  useEffect(() => {
    if (user?.data?.type === "field" && agentKpis?.data) {
      setKpiData([
        {
          value: agentKpis.data?.data?.totalClients || 0,
          unit: "",
          label: "Total customers",
          change: "",
        },
        {
          value: agentKpis?.data?.data?.totalPumpsRunning || 0,
          unit: "",
          label: "Total pump running",
          change: "",
        },
        {
          value: agentKpis?.data?.data?.pendingOrders || 0,
          unit: "",
          label: "Total pending orders",
          change: "",
        },
      ]);
    } else if (user?.data?.type === "sales" && agentKpis?.data) {
      setKpiData([
        {
          value: agentKpis?.data?.data?.totalFieldAgents || 0,
          unit: "",
          label: "Total field agents",
          change: "",
        },
        {
          value: agentKpis?.data?.data?.totalClients || 0,
          unit: "",
          label: "Total customer",
          change: "",
        },
        {
          value: agentKpis?.data?.data?.pendingOrders || 0,
          unit: "",
          label: "Total pending orders",
          change: "",
        },
      ]);
    }
  }, [agentKpis]);

  if (isLoadingClients || isLoadingFieldAgents) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={loadingLogo} width={"50%"} height={100} />
        <TouchableOpacity
          onPress={() => {
            refetchFieldAgents, refetchClients;
          }}
        >
          <Text style={{ marginTop: 10, fontWeight: "bold", color: "#FFF" }}>
            loading...
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isErrorFieldAgents && isErrorClients) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={loadingLogo} width={"50%"} height={100} />
        <TouchableOpacity onPress={(() => refetchFieldAgents, refetchClients)}>
          <Text style={{ marginTop: 10, fontWeight: "bold", color: "#FFF" }}>
            Error fetching data
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.appLayout}>
        <View style={styles.container}>
          <Text style={styles.title}>Overview</Text>
        </View>
        {kpiData &&
          kpiData.map((item, index) => (
            <FilterKPI key={index} kpiData={item} />
          ))}

        {fieldAgentsBySalesAgent &&
          fieldAgentsBySalesAgent.data?.count === 0 &&
          clientsByAgent &&
          clientsByAgent.data?.count === 0 && (
            <View
              style={{
                backgroundColor: "#FFF",
                alignSelf: "center",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignContent: "center",
                paddingVertical: 200,
              }}
            >
              <MaterialCommunityIcons name="set-none" size={24} color="black" />
              <Text style={{ fontSize: 20 }}>No data</Text>
            </View>
          )}

        {fieldAgentsBySalesAgent && fieldAgentsBySalesAgent.data?.count > 0 && (
          <View style={styles.container}>
            <Text style={styles.title}>Field Agents</Text>
            <AntDesign
              name="arrowright"
              size={24}
              color="black"
              style={{ marginRight: 10, marginTop: 15 }}
            />
          </View>
        )}
        <ScrollView
          horizontal
          contentContainerStyle={styles.AgentsCardRow}
          showsHorizontalScrollIndicator={false}
        >
          {fieldAgentsBySalesAgent &&
            fieldAgentsBySalesAgent.data &&
            Array.isArray(fieldAgentsBySalesAgent.data.data) &&
            fieldAgentsBySalesAgent.data.data.map((agent, index) => (
              <AgentsCard
                key={index}
                id={agent?._id}
                name={agent?.name}
                designation="Field Agent"
                totalCustomers={100}
              />
            ))}
        </ScrollView>
        {clientsByAgent && clientsByAgent.data?.count > 0 && (
          <View>
            <View style={styles.container}>
              <Text style={styles.title}>Customers</Text>
              <AntDesign
                name="arrowright"
                size={24}
                color="black"
                style={{ marginRight: 10, marginTop: 15 }}
              />
            </View>
            {clientsByAgent &&
              clientsByAgent.data &&
              Array.isArray(clientsByAgent.data.data) && (
                <ScrollView
                  horizontal
                  contentContainerStyle={styles.AgentsCardRow}
                  showsHorizontalScrollIndicator={false}
                >
                  {clientsByAgent.data.data.map((client, index) => (
                    <AgentsCard
                      key={index}
                      name={client?.name}
                      designation="Customer"
                      totalCustomers={100}
                      id={client?._id}
                    />
                  ))}
                </ScrollView>
              )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
