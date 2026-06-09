import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Dashboard</Text>

      {/* KPI Cards */}
      <View style={styles.grid}>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total</Text>
          <Text style={styles.cardValue}>14,450</Text>
          <Text style={styles.cardGrowth}>↑ 12.5%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Average</Text>
          <Text style={styles.cardValue}>2,890</Text>
          <Text style={styles.cardGrowth}>↑ 8.3%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Maximum</Text>
          <Text style={styles.cardValue}>4,210</Text>
          <Text style={styles.cardSub}>Peak value</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Minimum</Text>
          <Text style={styles.cardValue}>1,890</Text>
          <Text style={styles.cardSub}>Lowest value</Text>
        </View>

      </View>

      {/* Performance Section */}
      <View style={styles.performance}>

        <View style={styles.performanceHeader}>
          <Text style={styles.performanceTitle}>
            Performance Overview
          </Text>

          <Text style={styles.viewAll}>View All</Text>
        </View>

        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Completion Rate</Text>
          <Text style={styles.metricValue}>75%</Text>
        </View>

        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: "75%" }]} />
        </View>

        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Data Quality</Text>
          <Text style={styles.metricValue}>92%</Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[styles.progressFillGreen, { width: "92%" }]}
          />
        </View>

      </View>

    </ScrollView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#050E1F",
    padding: 20,
  },

  title: {
    color: "#E5E7EB",
    fontSize: 24,
    fontWeight: "600",
    marginVertical:25,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#0F1A33",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },

  cardLabel: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  cardValue: {
    color: "#E5E7EB",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 6,
  },

  cardGrowth: {
    color: "#22C55E",
    marginTop: 4,
  },

  cardSub: {
    color: "#9CA3AF",
    marginTop: 4,
  },

  performance: {
    marginTop: 20,
    backgroundColor: "#0F1A33",
    padding: 16,
    borderRadius: 14,
  },

  performanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  performanceTitle: {
    color: "#E5E7EB",
    fontWeight: "600",
  },

  viewAll: {
    color: "#7C5CFF",
  },

  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  metricLabel: {
    color: "#9CA3AF",
  },

  metricValue: {
    color: "#E5E7EB",
  },

  progressBackground: {
    height: 6,
    backgroundColor: "#1F2A44",
    borderRadius: 10,
    marginTop: 6,
  },

  progressFill: {
    height: 6,
    backgroundColor: "#7C5CFF",
    borderRadius: 10,
  },

  progressFillGreen: {
    height: 6,
    backgroundColor: "#22C55E",
    borderRadius: 10,
  },

});