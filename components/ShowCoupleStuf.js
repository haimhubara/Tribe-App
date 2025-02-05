import { View, Text, StyleSheet, ScrollView ,Platform} from 'react-native';
import { GlobalStyles } from '../constants/styles';

const ShowCoupleStuf = ({ text, array }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {array.map((hobby, index) => (
          <View key={index} style={styles.hobbyBox}>
            <Text style={styles.hobbyText}>{hobby}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    flex:1,
    flexDirection: 'row', // Items will be placed horizontally
    flexWrap: 'wrap', // Allow items to wrap to the next line when necessary
    width: '100%',
    alignItems:'flex-start'
  },
  hobbyBox: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.nearWhite,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    width: Platform.OS === 'web' ? '40%' : '30%'
  },
  hobbyText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
});

export default ShowCoupleStuf;
