import * as React from 'react'
import { View,Text,StyleSheet } from 'react-native'

export default function HomeScreen({navigation}){

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // This will hide the header
    });
  }, [navigation]);

    return (
        <View style={styles.container}>
          <Text>HomeScreen HomeScreen madafaka</Text>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});