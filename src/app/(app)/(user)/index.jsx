import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import FilterKPI from "../../../Component/FilterKpi";
import TimeLineFilter from "../../../Component/TimeLineFilter";
import { AntDesign } from "@expo/vector-icons";
import AgentsCard from "../../../Component/AgentsCard";

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
    // backgroundColor: "#FFF",
  },
  AgentsCardRow: {
    flexDirection: "row",
    marginTop: 10,
    marginRight: 40,
  },
});

export default function Index() {
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

  return (
    <ScrollView>
      <View style={styles.appLayout}>
        <View style={styles.container}>
          <Text style={styles.title}>Overview</Text>
        </View>
        {kpiData.map((item, index) => (
          <FilterKPI key={index} kpiData={item} />
        ))}
        <View style={styles.container}>
          <Text style={styles.title}>Sales Agent</Text>
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            style={{ marginRight: 10, marginTop: 15 }}
          />
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.AgentsCardRow}
          showsHorizontalScrollIndicator={false}
        >
          <AgentsCard
            avatar="avatar_url"
            name="John Doe"
            designation="Sales Agent"
            totalCustomers={100}
            groupAvatars={["avatar_url_1", "avatar_url_2", "avatar_url_3"]}
          />
          <AgentsCard
            avatar="avatar_url"
            name="John Doe"
            designation="Sales Agent"
            totalCustomers={100}
            groupAvatars={["avatar_url_1", "avatar_url_2", "avatar_url_3"]}
          />
          <AgentsCard
            avatar="avatar_url"
            name="John Doe"
            designation="Sales Agent"
            totalCustomers={100}
            groupAvatars={["avatar_url_1", "avatar_url_2", "avatar_url_3"]}
          />
        </ScrollView>

        <View style={styles.container}>
          <Text style={styles.title}>Field Agent</Text>
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            style={{ marginRight: 10, marginTop: 15 }}
          />
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.AgentsCardRow}
          showsHorizontalScrollIndicator={false}
        >
          <AgentsCard
            avatar="avatar_url"
            name="John Doe"
            designation="Field Agent"
            totalCustomers={100}
            groupAvatars={["avatar_url_1", "avatar_url_2", "avatar_url_3"]}
          />
          <AgentsCard
            avatar="avatar_url"
            name="John Doe"
            designation="Field Agent"
            totalCustomers={100}
            groupAvatars={["avatar_url_1", "avatar_url_2", "avatar_url_3"]}
          />
          <AgentsCard
            avatar="avatar_url"
            name="John Doe"
            designation="Field Agent"
            totalCustomers={100}
            groupAvatars={["avatar_url_1", "avatar_url_2", "avatar_url_3"]}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
}
