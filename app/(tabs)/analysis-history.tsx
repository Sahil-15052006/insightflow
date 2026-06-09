import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";

export default function AnalysisHistory() {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <Text style={styles.title}>Analysis History</Text>

      {/* Search */}
      <TextInput
        placeholder="Search datasets..."
        placeholderTextColor="#6B7280"
        style={styles.search}
      />

      {/* Card 1 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Q4 Sales Analysis</Text>
        <Text style={styles.cardMeta}>5 charts • 8 insights</Text>

        <View style={styles.tags}>
          <Text style={styles.tag}>Sales</Text>
          <Text style={styles.tag}>Revenue</Text>
        </View>

        <Text style={styles.time}>2h ago</Text>
      </View>

      {/* Card 2 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Customer Segmentation</Text>
        <Text style={styles.cardMeta}>3 charts • 5 insights</Text>

        <View style={styles.tags}>
          <Text style={styles.tagBlue}>Customers</Text>
          <Text style={styles.tagBlue}>Demographics</Text>
        </View>

        <Text style={styles.time}>1d ago</Text>
      </View>

      {/* Card 3 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Marketing ROI</Text>
        <Text style={styles.cardMeta}>4 charts • 6 insights</Text>

        <View style={styles.tags}>
          <Text style={styles.tagGreen}>Marketing</Text>
          <Text style={styles.tagGreen}>ROI</Text>
        </View>

        <Text style={styles.time}>3d ago</Text>
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
    fontSize: 22,
    fontWeight: "600",
    marginVertical: 25,
  },

  search: {
    backgroundColor: "#0F1A33",
    borderRadius: 12,
    padding: 12,
    color: "#E5E7EB",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1F2A44",
  },

  card: {
    backgroundColor: "#0F1A33",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },

  cardTitle: {
    color: "#E5E7EB",
    fontWeight: "600",
    fontSize: 16,
  },

  cardMeta: {
    color: "#9CA3AF",
    marginTop: 4,
  },

  tags: {
    flexDirection: "row",
    marginTop: 10,
  },

  tag: {
    backgroundColor: "#7C5CFF",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 10,
    marginRight: 6,
  },

  tagBlue: {
    backgroundColor: "#3B82F6",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 10,
    marginRight: 6,
  },

  tagGreen: {
    backgroundColor: "#22C55E",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 10,
    marginRight: 6,
  },

  time: {
    color: "#6B7280",
    marginTop: 10,
    fontSize: 12,
  },

});