import React from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import FilterKPI from "../../../Component/FilterKpi";
import TimeLineFilter from "../../../Component/TimeLineFilter";
import { AntDesign } from "@expo/vector-icons";
import AgentsCard from "../../../Component/AgentsCard";
import {
  useClientsByAgent,
  useFieldAgentsBySalesAgent,
} from "../../../Hooks/useQuery";
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
});

export default function Index() {
  const { user, removeUser } = useSession();
  const {
    data: clientsByAgent,
    isLoading,
    error,
    refetch,
  } = useClientsByAgent();

  const {
    data: fieldAgentsBySalesAgent,
    isLoading: isLoadingFieldAgentsBySalesAgent,
    error: errorFieldAgentsBySalesAgent,
    refetch: refetchFieldAgentsBySalesAgent,
  } = useFieldAgentsBySalesAgent();

  const filterOptions = [
    { value: "Last Hour", label: "Last Hour" },
    { value: "Last Day", label: "Last Day" },
    { value: "This Week", label: "This Week" },
    { value: "This Month", label: "This Month" },
    { value: "This Year", label: "This Year" },
  ];
  const kpiData = [
    {
      value: 1000,
      unit: "kWh",
      label: "Total Energy Generated",
    },
    {
      value: 500,
      unit: "tons",
      label: "Total Carbon Offset",
    },
    {
      value: 200,
      unit: "hours",
      label: "Total Working Time",
    },
  ];
  const logout = () => {
    removeUser();
  };

  return (
    <ScrollView>
      <Button onPress={logout} title="Logout" />
      <View style={styles.appLayout}>
        <View style={styles.container}>
          <Text style={styles.title}>Overview</Text>
        </View>
        {kpiData.map((item, index) => (
          <FilterKPI key={index} kpiData={item} />
        ))}
        {fieldAgentsBySalesAgent && fieldAgentsBySalesAgent.data && (
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
        {clientsByAgent && clientsByAgent.data && (
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
                      totalCustomers={100} // You can modify this according to your data
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
