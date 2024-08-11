import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import FilterKPI from "../../../Component/FilterKpi";
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
import { EvilIcons } from "@expo/vector-icons";
import { useVisitKpis } from "../../../Hooks/mutations";
import Picker from "../../../Component/Picker";

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
  const { user, handleLogout } = useSession();
  const [kpiData, setKpiData] = useState([]);
  
  const {
    data: clientsByAgent,
    isLoading: isLoadingClients,
    isError: isErrorClients,
    error: errorClients,
    refetch: refetchClients,
  } = useClientsByAgent({ forceFetch: true });

  const {
    data: fieldAgentsBySalesAgent,
    isLoading: isLoadingFieldAgents,
    isError: isErrorFieldAgents,
    error: errorFieldAgents,
    refetch: refetchFieldAgents,
  } = useFieldAgentsBySalesAgent({ forceFetch: true });

  const {
    data: agentKpis,
    isLoading: isLoadingAgentKpis,
    isError: isErrorAgentKpis,
    isSuccess: isSuccessAgentKpis,
    refetch: refetchAgentKpis,
  } = UseAgentKpis({ forceFetch: true });

  const {
    data: visitKpis,
    isLoading: isLoadingVisitKpis,
    isError: isErrorVisitKpis,
    isSuccess: isSuccessVisitKpis,
    refetch: refetchVisitKpis,
    mutate: mutateVisitKpis,
  } = useVisitKpis({ forceFetch: true });

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const formattedStartDate = currentMonth.toISOString().split("T")[0] + "T00:00:00.000";
    const formattedEndDate = currentDate.toISOString().split("T")[0] + "T23:59:59.999";
    const payload = { startDate: formattedStartDate, endDate: formattedEndDate, agentId: user?.data?._id };
    mutateVisitKpis(payload);
  }, []);

  useEffect(() => {
    if (user?.data?.type === "field" && agentKpis?.data) {
      setKpiData([
        {
          value: agentKpis.data?.data?.totalClients || 0,
          unit: "",
          label: "Total customers",
          change: "",
          icon: "addusergroup",
        },
        {
          value: agentKpis?.data?.data?.totalPumpsRunning || 0,
          unit: "",
          label: "Total pump running",
          change: "",
          icon: "antdesign",
        },
        {
          value: agentKpis?.data?.data?.pendingOrders || 0,
          unit: "",
          label: "Total pending orders",
          change: "",
          icon: "clockcircleo",
        },
        {
          value: visitKpis?.data?.totalVisits || 0,
          unit: "",
          label: "Total visits",
          change: "",
          icon: "checkcircleo",
        }
      ]);
    } else if (user?.data?.type === "sales" && agentKpis?.data) {
      setKpiData([
        {
          value: agentKpis?.data?.data?.totalFieldAgents || 0,
          unit: "",
          label: "Total field agents",
          change: "",
          icon: "user",
        },
        {
          value: agentKpis?.data?.data?.totalClients || 0,
          unit: "",
          label: "Total customers",
          change: "",
          icon: "addusergroup",
        },
        {
          value: agentKpis?.data?.data?.pendingOrders || 0,
          unit: "",
          label: "Total pending orders",
          change: "",
          icon: "clockcircleo",
        },
        {
          value: visitKpis?.data?.totalVisits || 0,
          unit: "",
          label: "Total visits",
          change: "",
          icon: "checkcircleo",
        }
      ]);
    }
  }, [agentKpis, visitKpis]);

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
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ marginTop: 10, fontWeight: "bold", color: "#FFF" }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isErrorFieldAgents && isErrorClients) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={loadingLogo} width={"50%"} height={100} />
        <TouchableOpacity onPress={refetchFunc}>
          <Text style={{ marginTop: 10, fontWeight: "bold", color: "#FFF" }}>
            Error fetching data
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ marginTop: 10, fontWeight: "bold", color: "#FFF" }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const refetchFunc = () => {
    refetchClients();
    refetchFieldAgents();
    refetchAgentKpis();

  };

  const handleFilterChange = (value) => {
    console.log('Selected filter:', value);
    mutateVisitKpis({ startDate: value.startDate, endDate: value.endDate, agentId: user?.data?._id });
  };

  return (
    <ScrollView>
      
      <View style={styles.appLayout}>
        <View style={styles.container}>
        <View style={{ position: 'absolute', right: 0, top: 0, marginTop: 5, marginRight: 10 }} >
      <Picker onFilterChange={handleFilterChange} />
      </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.title}>Overview</Text>  
            </View>
            <View>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "end",
                  marginTop: 20,
                  justifyContent: 'flex-end',
                }}
                onPress={refetchFunc}
              >
                <Text
                  style={{
                    marginLeft: 10,
                    fontWeight: "bold",
                    color: "#0432FF",
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  Refresh
                </Text>
                <EvilIcons name="refresh" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
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

        {user?.data?.type === "sales" &&
          fieldAgentsBySalesAgent &&
          fieldAgentsBySalesAgent.data?.count > 0 && (
            <View style={styles.container}>
              <Text style={styles.title}>Field Agents</Text>
            </View>
          )}
        <ScrollView
          horizontal
          contentContainerStyle={styles.AgentsCardRow}
          showsHorizontalScrollIndicator={false}
        >
          {user?.data?.type === "sales" &&
            fieldAgentsBySalesAgent &&
            fieldAgentsBySalesAgent.data &&
            Array.isArray(fieldAgentsBySalesAgent.data.data) &&
            fieldAgentsBySalesAgent.data.data.map((agent, index) => (
              <AgentsCard
                key={index}
                id={agent?._id}
                name={agent?.name}
                designation="Field Agent"
                visitCount={ visitKpis?.data?.visitCountByFieldAgent[agent?._id] || 0}
                email={agent?.email}
                totalCustomers={100}
                orderStatus={agent?.orderStatus}
              />
            ))}
        </ScrollView>
        {clientsByAgent && clientsByAgent.data?.count > 0 && (
          <View>
            <View style={styles.container}>
              <Text style={styles.title}>Customers</Text>
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
                      email={client?.email}
                      totalCustomers={100}
                      id={client?._id}
                      orderStatus={client?.orderStatus}
                      visitCount={ visitKpis?.data?.visitCountByFieldAgent[client?._id] || 0}
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
