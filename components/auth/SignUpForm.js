import React, { useState } from 'react'
import Input from '../../components/Input'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SubmitButton from '../../components/buttons/SubmitButton'
import { GlobalStyles } from '../../constants/styles';
import InputPicker from '../InputPicker';
import DatePicker from '../DatePicker';
import { StyleSheet, Text } from 'react-native';
import HobbiesPicker from '../HobbiesPicker';
import SocialLinks from '../SocialLinks';



const SignUpForm = ({next, setNext}) => {
  const [date,setDate] = useState(new Date());
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [linkValues, setLinkValues] = useState({})

  return (
    <>
         <Text  style={styles.Header}>Sign up</Text>
        <Input label="First Name" iconName="user-o" IconPack={FontAwesome}/>
        <Input label="Last Name" iconName="user-o" IconPack={FontAwesome}/>
        <Input label="Email" iconName="mail" IconPack={Feather}/>
        <Input label="Password" iconName="lock" IconPack={Feather}/>
        <Input label="Confirm Password" iconName="lock" IconPack={Feather}/>
        <Input label="Username" iconName="user-o" IconPack={FontAwesome}/>
        <InputPicker label="Gender" iconName="human-male-female" IconPack={MaterialCommunityIcons}
          options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
        />
         <InputPicker label="Religion" iconName="globe" IconPack={FontAwesome}
         options={[
          { label: 'Christianity', value: 'Christianity' },
          { label: 'Islam', value: 'Islam' },
          { label: 'Judaism', value: 'Judaism' },
        ]}
        />
         <Input label="Phone number" iconName="phone" IconPack={Feather}/>
         <DatePicker label='Day of birth' iconName='date' IconPack={Fontisto}   date={date} setDate={setDate}/>
         
        <HobbiesPicker selectedHobbies={selectedHobbies} setSelectedHobbies={setSelectedHobbies} text="Select your hobbies" array={['Reading', 'Traveling', 'Cooking', 'Sports', 'Music', 'Gaming', 'Photography', 'Art']}/>
        <HobbiesPicker text="Select Languages" array={["Hebrew","Arabic","English","Russin"]} selectedHobbies={languages} setSelectedHobbies={setLanguages}/>
        <SocialLinks setLinkValues={setLinkValues} linkValues={linkValues}  availableLinks={ ["Facebook", "Instagram", "Twitter"]} />
        <SubmitButton style={{marginTop:20}} onPress={()=>{setNext(prevState =>!prevState)}} title="Next" color={GlobalStyles.colors.mainColor}/>
       
  </>
       
  )
}

const styles = StyleSheet.create({
  Header:{
    textAlign:'center',
    fontSize:32,
    fontFamily:'bold',
    letterSpacing:0.3,
    color:GlobalStyles.colors.textColor,
  }
})

export default SignUpForm
