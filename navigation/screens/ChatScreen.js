import * as React from 'react'
import { View,Text,StyleSheet } from 'react-native'

export default function ChatScreen({navigation}){
React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // This will hide the header
    });
  }, [navigation]);

    return (
        <View style={styles.container}>
          <Text>ChatScreen</Text>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});