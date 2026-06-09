import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Visualization() {
  
  const barData = {
    labels: ["North", "South", "East", "West", "Central"],
    datasets: [{ data: [2400, 3200, 1800, 4200, 2700] }],
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{ data: [100, 200, 300, 380, 450, 520, 600] }],
  };

  const pieData = [
    {
      name: "Product A",
      population: 40,
      color: "#7C5CFF",
      legendFontColor: "#E5E7EB",
      legendFontSize: 12,
    },
    {
      name: "Product B",
      population: 33,
      color: "#3B82F6",
      legendFontColor: "#E5E7EB",
      legendFontSize: 12,
    },
    {
      name: "Product C",
      population: 27,
      color: "#EC4899",
      legendFontColor: "#E5E7EB",
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.container}>

        <Text style={styles.title}>Visualizations</Text>

        <ScrollView style={styles.Cardcontainer} >

            {/* Bar Chart */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Sales by Region</Text>
                <Text style={styles.cardType}>Bar Chart</Text>
                </View>

                <BarChart
                data={barData}
                width={screenWidth - 60}
                height={180}
                yAxisLabel="$"
                yAxisSuffix=""
                chartConfig={chartConfig}
                style={styles.chart}
                />
            </View>

            {/* Line Chart */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Trend Analysis</Text>
                <Text style={styles.cardType}>Line Chart</Text>
                </View>

                <LineChart
                data={lineData}
                width={screenWidth - 60}
                height={180}
                chartConfig={chartConfig}
                style={styles.chart}
                />
            </View>

            {/* Pie Chart */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Category Distribution</Text>
                <Text style={styles.cardType}>Pie Chart</Text>
                </View>

                <PieChart
                data={pieData}
                width={screenWidth - 60}
                height={180}
                accessor="population"
                backgroundColor="transparent"
                chartConfig={chartConfig}
                paddingLeft="10"
                />
            </View>

            </ScrollView>
    </View>
     
  );
}

const chartConfig = {
  backgroundGradientFrom: "#050E1F",
  backgroundGradientTo: "#050E1F",

  decimalPlaces: 0,

  color: (opacity = 1) => `rgba(124,92,255, ${opacity})`,

  labelColor: () => "#9CA3AF",

  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#7C5CFF",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050E1F",
    padding: 10,
  },
  
  Cardcontainer: {
    flex: 1,
    backgroundColor: "#050E1F",
    paddingHorizontal: 5,
    paddingBottom:100,
  },

  title: {
    color: "#E5E7EB",
    fontSize: 24,
    fontWeight: "600",
    marginVertical:25,
    paddingHorizontal:10,
  },

  card: {
    backgroundColor: "#0F1A33",
    width:"auto",
    borderRadius: 14,
    justifyContent:"center",
    alignItems:"stretch",
    padding: 10,
    marginBottom: 10,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  cardTitle: {
    color: "#E5E7EB",
    fontWeight: "600",
  },

  cardType: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  chart: {
    borderRadius: 12,
    padding:2
  },
});