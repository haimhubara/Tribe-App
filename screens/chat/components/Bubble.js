import React, { useRef, useState } from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { GlobalStyles } from '../../../constants/styles'
import { PageContainer } from '../../../components'
import { Menu, IconButton, Divider } from 'react-native-paper';
import uuid from 'react-native-uuid'
import * as Clipboard from 'expo-clipboard'
import Feather from '@expo/vector-icons/Feather';
import { useSelector } from 'react-redux'


function format24Hour(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
  }



const Bubble = ({text, type, date, setReply, replyingTo, name, imageUrl}) => {
    
    const bubbleStyle = {...styles.container}
    const textStyle = {... styles.text}
    const wrappreStyle = {... styles.wrappreStyle}
    const storedUsers = useSelector(state => state.users.storedUsers);
    const userData = useSelector(state => state.auth.userData);
    let isNeedPageContainer = true;
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const menuRef = useRef(null);
    const id = useRef(uuid.v4());

    let Container = View;
    const dateString = date && format24Hour(date);


    switch(type){
        case  "system":
            textStyle.color = "#65644A";
            bubbleStyle.backgroundColor = GlobalStyles.colors.beige;
            bubbleStyle.alignItems = 'center';
            bubbleStyle.marginTop = 10;
            break;

        case "error":
            bubbleStyle.backgroundColor = GlobalStyles.colors.errorColor
            textStyle.color = "white";
            bubbleStyle.marginTop = 10;
            break;

        case "myMessage":
            wrappreStyle.justifyContent = 'flex-start';
            bubbleStyle.marginTop = 10;
            bubbleStyle.backgroundColor = "#E7FED6";
            bubbleStyle.maxWidth = "90%";
            Container = TouchableWithoutFeedback;
            break;

        case "theirMessage":
            wrappreStyle.justifyContent = 'flex-end';
            bubbleStyle.maxWidth = "90%";
            Container = TouchableWithoutFeedback;
            bubbleStyle.marginTop = 12;
            break;

        case "reply":
            bubbleStyle.backgroundColor = '#EEEEEE';
            isNeedPageContainer=false;
            textStyle.fontSize = 10;
             break;

        case "info":
            bubbleStyle.backgroundColor = 'white';
            bubbleStyle.alignItems ="center";
           
            break;
        case  "start":
            textStyle.color = "#65644A";
            bubbleStyle.backgroundColor = GlobalStyles.colors.beige;
            bubbleStyle.alignItems = 'center';
            bubbleStyle.marginTop = 10;
            break;
        
    

        default:
            break;

    }

    const copyToClipboard = async text => {
        try {
            await Clipboard.setStringAsync(text);
        } catch (error) {
            console.log(error);
        }
      
    }

    const replayingToUser = replyingTo &&(storedUsers[replyingTo.sentBy] === undefined ? userData : storedUsers[replyingTo.sentBy]) ;

  return (
    <PageContainer bool={!isNeedPageContainer} style={{paddingHorizontal:0}} >
          <View >
                           <Menu
                                visible={visible}
                                onDismiss={closeMenu}
                                 anchor={
                                    <View style={wrappreStyle}>
                                         <Container onLongPress={openMenu} style={{width:'100%'}}>
                                             <View style={bubbleStyle}>

                                                 {
                                                     name && type !== "info" &&  type !== "start" && <Text style={styles.nameText}>{name}</Text>
                                                 }

                                                 {
                                                    replayingToUser &&
                                                     <Bubble
                                                        type='reply'
                                                        text={replyingTo.text}
                                                        name = {`${replayingToUser.firstName} ${replayingToUser.lastName}`}
                                                    />
                                                }
                                                { !imageUrl &&
                                                    <Text style={textStyle}>{text}</Text>
                                                }

                                                {
                                                   imageUrl && 
                                                    <Image style={styles.image} source={{uri:imageUrl}}/>
                                                }

                                                { dateString && type !== "info" &&  type !== "start" && 
                                                      <View style={styles.timeContainer}>
                                                          <Text style={styles.time}>{dateString}</Text>
                                                        </View>
                                                }
                                                        
                                                    
                                             </View>
                                         </Container>
                                     </View>
                                 }
                            >
                                <Menu.Item
                                onPress={() => {
                                    copyToClipboard(text);
                                    closeMenu();
                                }}
                                title="Copy to clipboard"
                                leadingIcon="content-copy"
                                />
                                <Divider />
                                <Menu.Item
                                onPress={() => {
                                    setReply()
                                    closeMenu();
                                }}
                                title="Reply"
                                leadingIcon="reply"
                                />
                            </Menu>

                        </View>
       
    </PageContainer>
  )
}

const styles = StyleSheet.create({
    wrappreStyle:{
        flexDirection:"row",
        justifyContent:'center'
    },
    text:{
        fontFamily:'regular',
        letterSpacing:0.3,
        color:GlobalStyles.colors.textColor,
        
    },
    container:{
        backgroundColor:'white',
        borderRadius:6,
        padding:5,
        marginBottom:10,
        borderColor:"#E2DACC",
        borderWidth:1
    },
    menuItemConatainer:{
        flexDirection:'row',
        padding:5
    },
    menuText:{
        flex:1,
        fontFamily:'regular',
        letterSpacing:0.3,
        color: GlobalStyles.colors.textColor,
        fontSize:16
    },
    timeContainer:{
        flexDirection:"row",
        justifyContent:'flex-start'
    },
    time:{
        fontFamily:'regular',
        letterSpacing:0.3,
        color:GlobalStyles.colors.gery,
        fontSize:12
    },
    nameText:{
        fontFamily:'medium',
        letterSpacing:0.3,
    },
    image:{
        width:300,
        height:300,
        marginBottom:5
    }

});

export default Bubble
