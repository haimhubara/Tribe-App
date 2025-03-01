import { View, Text, StyleSheet, ScrollView ,Platform} from 'react-native';
import { GlobalStyles } from '../constants/styles';

const ShowCoupleStuf = ({ text, array }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {array.map((hobby, index) => (
          <View key={index} style={styles.hobbyButton}>
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
  },
  title: {
    marginVertical:8,
    fontFamily:'bold',
    letterSpacing:0.3,
    color:GlobalStyles.colors.textColor,
  },
  scrollView: {
    flexDirection: 'row',  // Items will be placed horizontally
    flexWrap: 'wrap',      // Allow items to wrap to the next line when necessary
    width: '100%',
    justifyContent: 'center',
  },
  hobbyButton: {
    padding: 10,
    backgroundColor: "#FAFAFA",
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    minWidth: 100,
    flexShrink: 1, 
  },
  selectedHobby: {
    backgroundColor: GlobalStyles.colors.mainColor,  // Highlight selected hobbies
  },
  hobbyText: {
    color:GlobalStyles.colors.textColor,
    fontFamily:"regular",
    letterSpacing:0.3,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
  },
    errorContainer:{
        marginVertical:5
    },
    errorText:{
        color:'red',
        fontSize:13,
        fontFamily:'regular',
        letterSpacing:0.3,
    }
});

export default ShowCoupleStuf;
