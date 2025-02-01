import { View, Text, TextInput, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";

const SocialLinks = ({selectedLinks, setSelectedLinks,availableLinks}) => {
 


  const toggleLink = (link) => {
    if (selectedLinks.includes(link)) {
      setSelectedLinks(selectedLinks.filter((item) => item !== link));
    } else {
      setSelectedLinks([...selectedLinks, link]);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select Social Links:</Text>
      
      {availableLinks.map((link) => (
        <Pressable
          key={link}
          onPress={() => toggleLink(link)}
          style={{
            backgroundColor: selectedLinks.includes(link) ? GlobalStyles.colors.mainColorLight : "white",
            padding: 10,
            marginVertical: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "black", textAlign: "center" }}>{link}</Text>
        </Pressable>
      ))}

      {/* Show input fields for selected links */}
      {selectedLinks.map((link) => (
        <View key={link} style={{ marginTop: 10 }}>
          <Text>{link} Link:</Text>
          <TextInput
            placeholder={`Enter ${link} link`}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 5,
              marginTop: 5,
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default SocialLinks;
