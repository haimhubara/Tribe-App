import { View, StyleSheet ,Animated,useWindowDimensions} from "react-native";

const Paginator = ({ data,scrollX }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={styles.container}>
          {
            data.map((_, i) => {
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
    
              // יצירת אנימציה לכל נקודה בהתבסס על scrollX
              const dotSize = scrollX.interpolate({
                inputRange,
                outputRange: [10, 20, 10], // שינוי הגודל בהתבסס על מיקום הסקירה
                extrapolate: 'clamp',
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3,1,0.3], // שינוי הגודל בהתבסס על מיקום הסקירה
                extrapolate: 'clamp',
              });
    
              return (
                <Animated.View 
                  key={i} 
                  style={[styles.dot, { width: dotSize,opacity:opacity}]} 
                />
              );
            })
          }
        </View>
      );
    };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    margin: 4 
  }
});

export default Paginator;
