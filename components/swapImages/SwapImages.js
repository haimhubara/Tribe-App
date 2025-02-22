import { View, StyleSheet, FlatList, Animated } from "react-native";
import { useRef, useState, useMemo } from "react";
import SwapImageItem from "./SwapImageItem";
import Paginator from "./Paginator";

const SwapImages = ({editStyle}) => {
  const [pickedImage1, setPickedImage1] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4TVnfVleEzvfrqBMIPXout0yvmsE8mG06-Q&s");
  const [pickedImage2, setPickedImage2] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrC9W1F6WXWyo0UI9IIjzNt9vrxEZuutd2tg&s");
  const [pickedImage3, setPickedImage3] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwY9le94JCZXkhSvKMHw6tTWaw63fKYw4Kag&s");
  const [pickedImage4, setPickedImage4] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi62Ukuh91htgq0vshq-OvMsJ_TFm5pWe3mw&s");
  const [pickedImage5, setPickedImage5] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6eldETOcJ_UASc6aCXVFdAogAuRdtsS4K9w&s");
  const [pickedImage6, setPickedImage6] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQslIkUH1REifLSpM9i0AKwU8P8wQpirPooxg&s");

  const images = useMemo(() => [
    { id: "1", uri: pickedImage1 ,setImage:setPickedImage1 },
    { id: "2", uri: pickedImage2 ,setImage:setPickedImage2 },
    { id: "3", uri: pickedImage3 ,setImage:setPickedImage3 },
    { id: "4", uri: pickedImage4 ,setImage:setPickedImage4 },
    { id: "5", uri: pickedImage5 ,setImage:setPickedImage5 },
    { id: "6", uri: pickedImage6 ,setImage:setPickedImage6 },
  ], [pickedImage1, pickedImage2, pickedImage3, pickedImage4, pickedImage5, pickedImage6]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <Paginator data={images} scrollX={scrollX} />
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SwapImageItem editStyle={editStyle} imageUri={item.uri} setImageUri={item.setImage} />}
        horizontal
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        nestedScrollEnabled={true}
        scrollEventThrottle={32}
        viewabilityConfig={viewConfig}
        onViewableItemsChanged={viewableItemsChanged}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SwapImages;
