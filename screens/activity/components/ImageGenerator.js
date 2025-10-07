import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Modal, TextInput, ActivityIndicator } from "react-native";
import { launchImageLibraryAsync } from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

const ImageGenerator = ({ imageStyle, buttonStyle, imageRootStyle, onInputChange, selectedImage }) => {
    const [image, setImage] = useState(selectedImage?.uri ? selectedImage.uri : selectedImage);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setImage(selectedImage?.uri ? selectedImage.uri : selectedImage);
    }, [selectedImage]);

    async function pickImageHandle() {
        const result = await launchImageLibraryAsync({ allowsEditing: true, quality: 0.7 });
        if (!result.canceled) {
            const imageUri = result.assets?.[0]?.uri;
            setImage(imageUri);
            onInputChange("image", imageUri);
        }
    }

    return (
        <View style={[styles.root, imageRootStyle]}>
            <View style={[styles.imagePreview, imageStyle]}>
                {loading ? (
                    <ActivityIndicator size="large" color="#4A90E2" />
                ) : image ? (
                    <Image style={styles.image} source={{ uri: image }} />
                ) : (
                    <Text style={styles.placeholderText}>No Image</Text>
                )}
            </View>

            <View style={styles.buttonRow}>
                <Pressable style={[styles.pickButton, buttonStyle]} onPress={pickImageHandle}>
                    <Ionicons name="images" size={26} color="white" />
                </Pressable>
            </View>

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
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 35,
        marginTop: 10,
    },
    pickButton: {
        marginTop: 12,
        backgroundColor: '#4A90E2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 4,
    },

});

export default ImageGenerator;