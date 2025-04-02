import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Modal, TextInput, ActivityIndicator } from "react-native";
import { launchImageLibraryAsync } from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const ImageGenerator = ({ imageStyle, buttonStyle, imageRootStyle, onInputChange, selectedImage }) => {
    const [image, setImage] = useState(selectedImage?.uri ? selectedImage.uri : selectedImage);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPromptModalVisible, setPromptModalVisible] = useState(false);
    const [isGenerateEnabled, setIsGenerateEnabled] = useState(false);


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

    async function generateImageFromPrompt(userPrompt) {
        try {
            if (!userPrompt || userPrompt.trim() === "") {
                alert("Please enter a prompt.");
                return;
            }
    
            setLoading(true);
    
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer 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`
                },
                body: JSON.stringify({
                    prompt: userPrompt,
                    n: 1,
                    size: "512x512",
                }),
            });
    
            const data = await response.json();
            //console.log("OpenAI DALL·E response:", data);
    
            if (response.ok && data?.data?.[0]?.url) {
                const generatedImageUrl = data.data[0].url;
                setImage(generatedImageUrl);
                onInputChange("image", generatedImageUrl);
            } else {
                const errorMessage = data?.error?.message || "Image generation failed. Please try again.";
                alert(errorMessage);
                console.error("DALL·E error:", data);
            }
        } catch (e) {
            console.error("Image generation failed:", e);
            alert("Something went wrong while generating the image.");
        } finally {
            setLoading(false);
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

                <Pressable disabled={true} style={[styles.generateButton, buttonStyle]} onPress={() => setPromptModalVisible(true)}>
                    <Ionicons name="sparkles-sharp" size={26} color="white" />
                </Pressable>
            </View>

            <Modal
                visible={isPromptModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setPromptModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter a prompt</Text>
                        <TextInput
                            placeholder="A cat on the moon..."
                            style={styles.input}
                            value={prompt}
                            onChangeText={setPrompt}
                        />
                        <View style={styles.modalButtons}>
                            <Pressable onPress={() => setPromptModalVisible(false)}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={() => {
                                setPromptModalVisible(false);
                                generateImageFromPrompt(prompt);
                            }}>
                                <Text style={styles.generateText}>Generate</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
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
    generateButton: {
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
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center"
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    cancelText: {
        color: "gray",
        fontSize: 16,
    },
    generateText: {
        color: "#4A90E2",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ImageGenerator;