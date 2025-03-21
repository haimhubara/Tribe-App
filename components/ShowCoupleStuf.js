import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GlobalStyles } from '../constants/styles';

const COLORS = ["#DFF5FF", "#FEEFD5", "#E8FFD9", "#FBD6FC", "#FFF4E3", "#E2E0FF"];

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
    marginBottom: 16,
  },
  title: {
    marginVertical: 8,
    fontFamily: 'bold',
    letterSpacing: 0.3,
    fontSize: 16,
    color: GlobalStyles.colors.textColor,
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    minHeight: 35,
  },
  tagText: {
    fontFamily: 'regular',
    fontSize: 14,
    color: '#333',
    letterSpacing: 0.3,
  },
});
