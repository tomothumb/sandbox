import React ,{Component} from 'react';
import { StyleSheet, Button, Text, TextInput, View , ScrollView, Alert,ActionSheetIOS} from 'react-native';


const Header = () => {
  return(
      <View style={[{ flexDirection: 'row'},styles.header]}>
          <View style={[{flex: 1,width:'30%'},styles.header_inner]}><Text style={styles.header_inner_text}>☆</Text></View>
          <View style={[{flex: 2,width:'40%'},styles.header_inner]}><Text style={styles.header_inner_text}>ホーム</Text></View>
          <View style={[{flex: 1,width:'30%'},styles.header_inner]}><Text style={styles.header_inner_text}>☆</Text></View>
      </View>
  )
};

const TabBar = () => {
    return(
        <View style={[{ flexDirection: 'row'},styles.tabbar]}>
            <View style={[{flex: 1,width:'20%'},styles.tabbar_inner]}><Text style={styles.tabbar_inner_text}>1</Text></View>
            <View style={[{flex: 1,width:'20%'},styles.tabbar_inner]}><Text style={styles.tabbar_inner_text}>2</Text></View>
            <View style={[{flex: 1,width:'20%'},styles.tabbar_inner]}><Text style={styles.tabbar_inner_text}>3</Text></View>
            <View style={[{flex: 1,width:'20%'},styles.tabbar_inner]}><Text style={styles.tabbar_inner_text}>4</Text></View>
            <View style={[{flex: 1,width:'20%'},styles.tabbar_inner]}><Text style={styles.tabbar_inner_text}>5</Text></View>
        </View>
    )
};

class ActionButton extends Component{
    constructor(props){
        super(props);
    }

    showActionSheet() {
        ActionSheetIOS.showActionSheetWithOptions({
                options: [
                    'Option 0',
                    'Option 1',
                    'Option 2',
                    'Destruct',
                    'Cancel',
                ],
                cancelButtonIndex: 3,
                destructiveButtonIndex: 4,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    Alert.alert("Accepted");
                }
            });
    }

    shareSheetWithMessage() {
        ActionSheetIOS.showShareActionSheetWithOptions({
                message: 'Secret message.'
            },
            (error) => {},
            (success, sharing_method) => {}
        );
    }

    shareSheetWithMessageAndSubject() {
        ActionSheetIOS.showShareActionSheetWithOptions({
                message: 'Secret message.',
                subject: 'SECRET'
            },
            (error) => {},
            (success, sharing_method) => {}
        );
    }

    shareSheetWithUrl() {
        ActionSheetIOS.showShareActionSheetWithOptions({
                url: 'https://www.google.com'
            },
            (error) => {},
            (success, sharing_method) => {}
        );
    }

    shareSheetWithMessageAndUrl() {
        ActionSheetIOS.showShareActionSheetWithOptions({
                url: 'https://www.google.com',
                message: 'Secret message.',
            },
            (error) => {},
            (success, sharing_method) => {}
        );
    }

    render(){
        return (
            <View>
                <Button title="アクションボタン1" onPress={this.showActionSheet} />
                <Button title="アクションボタン2" onPress={this.shareSheetWithMessage} />
                <Button title="アクションボタン3" onPress={this.shareSheetWithMessageAndSubject} />
                <Button title="アクションボタン4" onPress={this.shareSheetWithUrl} />
                <Button title="アクションボタン5" onPress={this.shareSheetWithMessageAndUrl} />
            </View>
        )
    }
}

const Card = () => {
    return(
        <View style={[styles.card]}>
            <View style={{flex:5}}>
                <ActionButton>あああああ</ActionButton>
            </View>

            <View style={{flex:4}}>
                <TextInput>aa</TextInput>
            <Text style={styles.maintext}>本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文</Text>
            </View>
            <View style={{flex:1,flexDirection:"row"}}>
                <View style={{flex:1}}><Text style={styles.subtext}>辻本</Text></View>
                <View style={{flex:1}}><Text style={styles.subtext}>4日前</Text></View>
            </View>
        </View>
    )
};
const MainArea = () => {
    return(
        <ScrollView style={styles.mainarea}>
        <View>
            <Card />
        </View>
        </ScrollView>
    )
};

const App = () => {
  return (
      <View style={styles.container}>
          <Header />
          <MainArea />
          <TabBar />
      </View>
    );
};
export default App;

const styles = StyleSheet.create({
    header:{
        height:'10%',
        borderBottomWidth:1,
        borderBottomColor:'#CCC'
    },
    header_inner:{
    },
    header_inner_text:{
        padding:20,
        paddingTop:35,
        textAlign:"center",
        fontSize:16,
        fontWeight:'bold'
    },
    tabbar:{
        height:'10%',
        borderTopWidth:1,
        borderTopColor:'#CCC'
    },
    tabbar_inner:{
    },
    tabbar_inner_text:{
        padding:20,
        textAlign:"center"
    },

     mainarea:{
         height:'80%'
     },
    card_wrapper:{

    },
    card:{
        height:400,
        // width:'100%',
        borderWidth:1,
        borderColor:"#CCCCCC",
        borderRadius:5,
        margin:3,
        padding:5,
    },
    maintext:{
        fontSize:13,
        color:'#000000'
    },

    subtext:{
        fontSize:11,
        color:'#666666'
    },
  container: {
        // flex: 1,
      // backgroundColor: '#ffC',
      // alignItems: 'center',
      // justifyContent: 'center',
  },
});

