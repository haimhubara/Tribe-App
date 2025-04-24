import { View, StyleSheet, FlatList, Animated, Text } from "react-native";
import { useRef, useState, useMemo } from "react";
import SwapImageItem from "./SwapImageItem";
import Paginator from "./Paginator";

const SwapImages = ({ editStyle, imagess,isEdit, setImages,uploadImagesHandle,videoUrl }) => {

  const defaultImage = "https://via.placeholder.com/150/FFFFFF?text=No+Image"; 

  const images = useMemo(() => {
    const imageItems = Object.entries(imagess || {})
      .map(([key, uri]) => ({
        id: key,
        uri: uri,
        type: 'image'
      }))
      .filter(image => isEdit || (image.uri && image.uri !== defaultImage));
  
    const videoItem = videoUrl
      ? [{
          id: 'video',
          uri: videoUrl,
          type: 'video'
        }]
      : [];
  
    return [...imageItems, ...videoItem]; // אם אתה רוצה שהווידאו יופיע בסוף
  }, [imagess, videoUrl, isEdit]);

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
        renderItem={({ item }) => (
          <SwapImageItem 
            editStyle={editStyle} 
            imageUri={item.uri} 
            imageId={item.id}
            setImages={setImages}
            type={item.type}
            uploadImagesHandle={uploadImagesHandle}
          />
        )}
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
