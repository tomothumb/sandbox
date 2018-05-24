import React from 'react';
import { StyleSheet, Text, View , ScrollView} from 'react-native';


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

const MainArea = () => {
    return(
        <ScrollView style={styles.mainarea}>

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

