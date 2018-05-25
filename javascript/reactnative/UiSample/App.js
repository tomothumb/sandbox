import React ,{Component} from 'react';
import { StyleSheet, Button, Text, View , ScrollView, ActionSheetIOS} from 'react-native';


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

var BUTTONS = [
    'Option 0',
    'Option 1',
    'Option 2',
    'Destruct',
    'Cancel',
];

var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;


class ActionButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            clicked: 'none',
        }
    }

    showActionSheet() {
        ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
            },
            (buttonIndex) => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
            });
    }

    render(){
        return (
            <View>
                <Button title="アクションボタン" onPress={this.showActionSheet} />
                <Text>
                    Clicked button: {this.state.clicked}
                </Text>
            </View>
        )
    }
}

const Card = () => {
    return(
        <View style={[styles.card]}>
            <View style={{flex:3}}>
                <ActionButton>あああああ</ActionButton>
            </View>

            <View style={{flex:4}}>
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
        height:150,
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

