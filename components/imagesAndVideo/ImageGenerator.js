import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { launchImageLibraryAsync } from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from "react";

const ImageGenerator = ({ imageStyle, buttonStyle, imageRootStyle, selectedImage, setSelectedImage }) => {
    async function pickImageHandle() {
        const result = await launchImageLibraryAsync({ allowsEditing: true, quality: 0.7 });
        if (!result.canceled) {
            const imageUri = result.assets?.[0]?.uri;
            setSelectedImage(imageUri);
        }
    }

    return (
        <View style={[styles.root, imageRootStyle]}>
            <View style={[styles.imagePreview, imageStyle]}>
                {selectedImage ? (
                    <Image style={styles.image} source={{ uri: selectedImage }} />
                ) : (
                    <Text style={styles.placeholderText}>No Image</Text>
                )}
            </View>

            <Pressable style={[styles.button, buttonStyle]} onPress={pickImageHandle}>
                <Ionicons name="images" size={26} color="white" />
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    root: { alignItems: 'center', marginVertical: 10 },
    imagePreview: {
        width: 280,
        height: 290,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
        overflow: 'hidden'
    },
    image: { width: '100%', height: '100%', resizeMode: "cover" },
    placeholderText: { color: 'gray', fontSize: 16 },
    button: {
        marginTop: 12,
        backgroundColor: '#4A90E2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
});

export default ImageGenerator;