import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../constants/styles";

const SocialLinks = ({  availableLinks, linkValues, setLinkValues }) => {
    const [selectedLinks, setSelectedLinks] = useState([]);
  
  const toggleLink = (link) => {
    if (selectedLinks.includes(link)) {
      setSelectedLinks(selectedLinks.filter((item) => item !== link));
      const newLinkValues = { ...linkValues };
      delete newLinkValues[link]; // הסרת הערך מה-state של הלינק
      setLinkValues(newLinkValues);
    } else {
      setSelectedLinks([...selectedLinks, link]);
    }
  };

  const handleInputChange = (link, value) => {
    setLinkValues({ ...linkValues, [link]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Social Links:</Text>
      
      {availableLinks.map((link) => (
        <Pressable
          key={link}
          onPress={() => toggleLink(link)}
          style={[
            styles.linkButton,
            selectedLinks.includes(link) && { backgroundColor: GlobalStyles.colors.mainColorLight },
          ]}
        >
          <Text style={styles.linkText}>{link}</Text>
        </Pressable>
      ))}

      {/* Show input fields for selected links */}
      {selectedLinks.map((link) => (
        <View key={link} style={styles.inputContainer}>
          <Text>{link} Link:</Text>
          <TextInput
            placeholder={`Enter ${link} link`}
            style={styles.input}
            value={linkValues[link] || ""} // הצגת הערך שהוזן
            onChangeText={(value) => handleInputChange(link, value)} // עדכון הערך כאשר משתנה
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  title: {
    marginVertical:8,
    fontFamily:'bold',
    letterSpacing:0.3,
    color:GlobalStyles.colors.textColor,
  },
  linkButton: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center'
  },
  linkText: {
    color:GlobalStyles.colors.textColor,
    fontFamily:"regular",
    letterSpacing:0.3,
    
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default SocialLinks;