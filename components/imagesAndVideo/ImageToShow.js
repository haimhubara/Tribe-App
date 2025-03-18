import React, { useState } from "react";
import { View, Image, StyleSheet, Modal, Pressable, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';


const ImageToShow = ({ imageUrl, imageStyle, rootStyle }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.root, rootStyle]}>
    
      <Pressable onPress={() => setModalVisible(true)}>
        <View style={[styles.imagePreview, imageStyle]}>
          <Image 
            style={styles.image}
            source={typeof imageUrl === "string" && imageUrl.startsWith("http") ? { uri: imageUrl } : imageUrl} 
          />
        </View>
      </Pressable>

     
      {imageUrl && <Modal visible={modalVisible} transparent={true} animationType="fade">
          <Pressable style={styles.modalContainer} onPress={() => setModalVisible(false)}>
              <View style={styles.modalHeader}>
                  <Ionicons name="arrow-back" size={32} color="black" onPress={() => setModalVisible(false)} />
                   <Text style={styles.modalTitle}>Image Preview</Text>
             </View>
            <Image style={styles.fullScreenImage} source={typeof imageUrl === "string" && imageUrl.startsWith("http") ? { uri: imageUrl } : imageUrl} />
          </Pressable>
        </Modal>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  imagePreview: {
    borderWidth: 0.1,
    width: 180,
    height: 200,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    resizeMode: "cover",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 16, 
    marginTop:32
  },
  modalTitle: {
    backgroundColor: "white",
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1, 
},
  fullScreenImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 10,
  },
});

export default ImageToShow;
