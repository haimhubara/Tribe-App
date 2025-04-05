import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GlobalStyles } from '../constants/styles';


const COLORS = [
  "#E3F2FD", // תכלת פסטלי
  "#FCE4EC", // ורוד רך
  "#E8F5E9", // ירוק מנטה עדין
  "#FFF8E1", // צהוב קרמי
  "#F3E5F5", // סגול לילה בהיר
  "#E0F7FA", // טורקיז ענן
];


const ShowCoupleStuf = ({ text, array }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
      <ScrollView contentContainerStyle={styles.scrollView} scrollEnabled={false}>
        {array.map((item, index) => (
          <View
            key={index}
            style={[
              styles.tag,
              { backgroundColor: COLORS[index % COLORS.length] }
            ]}
          >
            <Text style={styles.tagText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShowCoupleStuf;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: 17,
    fontWeight: "700",
    color: "#2D0C57",
    letterSpacing: 0.5,
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 36,
  },
  tagText: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 0.3,
  },
});
