import React, { useRef } from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import PageContainer from '../PageContainer'
import { Menu, MenuTrigger, MenuOption, MenuOptions } from 'react-native-popup-menu'
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

const MenuItem = ({text, onSelect, iconPack, iconName}) => {

    const Icon = iconPack ?? Feather

    return <MenuOption onSelect={onSelect}>
        <View style={styles.menuItemConatainer}>
            <Text style={styles.menuText}>{text}</Text>
            <Icon name={iconName} size={18}/>
        </View>
    </MenuOption>
}

const Bubble = ({text, type, date, setReply, replyingTo, name, imageUrl}) => {
    
    const bubbleStyle = {...styles.container}
    const textStyle = {... styles.text}
    const wrappreStyle = {... styles.wrappreStyle}
    const storedUsers = useSelector(state => state.users.storedUsers);
    const userData = useSelector(state => state.auth.userData);
    let isNeedPageContainer = true;

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
        <View style={wrappreStyle}>
            <Container onLongPress={()=>menuRef.current.props.ctx.menuActions.openMenu(id.current)} style={{width:'100%'}}>
                <View style={bubbleStyle}>

                    {
                        name && type !== "info" && <Text style={styles.nameText}>{name}</Text>
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
                        <Text style={textStyle}>{text}</Text>}

                    {
                        imageUrl && 
                        <Image style={styles.image} source={{uri:imageUrl}}/>
                    }

                { dateString && type !== "info" && 
                        <View style={styles.timeContainer}>
                            <Text style={styles.time}>{dateString}</Text>
                        </View>
                    }

                    <Menu name={id.current} ref={menuRef}>
                        <MenuTrigger/>
                        <MenuOptions>
                            <MenuItem iconName='copy' text='Copy to clipboard' onSelect={() => copyToClipboard(text)}/>
                            <MenuItem iconName='arrow-left-circle' text='Reply' onSelect={setReply}/>
                        </MenuOptions>

                

                    </Menu>
                </View>
            </Container>
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
