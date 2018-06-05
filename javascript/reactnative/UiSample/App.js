import React ,{Component} from 'react';
import { StyleSheet, Button, Text, TextInput, View , ScrollView, Alert,
    ActionSheetIOS,AlertIOS,DatePickerIOS,ImagePickerIOS,
    TouchableOpacity,AsyncStorage
} from 'react-native';
import {Col, Row, Grid} from "react-native-easy-grid";
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';


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
                if (buttonIndex === 1) {
                    AlertIOS.alert(
                        'Sync Complete',
                        'All your data are belong to us.'
                    );
                }
                if(buttonIndex === 2){
                    AlertIOS.prompt(
                        'Enter a value',
                        null,
                        text => console.log("You entered "+text)
                    );
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
                <DatePickerIOS
                    date={ new Date()}
                    onDateChange={()=>{}}
                />
{/*                <Button title="アクションボタン5" onPress={()=>{
                    ImagePickerIOS.canRecordVideos(()=>{});
                    ImagePickerIOS.canUseCamera(()=>{});
                    // ImagePickerIOS.openSelectDialog({},()=>{},()=>{});
                    ImagePickerIOS.openCameraDialog({},()=>{},()=>{});

                }} />*/}


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

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
    };
    render (){
        return (
            <View style={styles.container}>
                <MainArea />
                <Button
                    title="Go to Profile"
                    onPress={() => this.props.navigation.navigate('Profile', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    })}
                />
            </View>
        );
    }
};

class ProfileScreen extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
            title: navigation.getParam('otherParam', 'Profile'),
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('MyModal')}
                    title="Modal"
                    color="#999"
                />
            ),
            // headerStyle: {
            //     backgroundColor: navigationOptions.headerTintColor,
            // },
            // headerTintColor: navigationOptions.headerStyle.backgroundColor,
        };
    };
    render (){
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');

        return (
            <View style={styles.container}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>

                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title="Go to Profile... again"
                    onPress={() => this.props.navigation.push('Profile')}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />

                <Button
                    title="Update the title"
                    onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
                />
            </View>
        );
    }
};


class ModalScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>This is a modal!</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Dismiss"
                />
            </View>
        );
    }
}

const EasyGridDemoScreen = () => {
    return (
        <ScrollView>
            <Text style={flex_styles.line}>LINE</Text>

            <Grid>
                <Col style={flex_styles.bg_color3}><Text>col</Text></Col>
                <Col style={flex_styles.bg_color5}><Text>col</Text></Col>
            </Grid>

            <Grid>
                <Col size={1} style={flex_styles.bg_color1}><Text>col size=1</Text></Col>
                <Col size={2} style={flex_styles.bg_color3}><Text>col size=2</Text></Col>
                <Col size={1} style={flex_styles.bg_color5}><Text>col size=1</Text></Col>
            </Grid>

            <Grid>
                <Col style={flex_styles.bg_color1}><Text>col</Text></Col>
                <Col style={flex_styles.bg_color3}><Text>col</Text></Col>
                <Col size={4} style={flex_styles.bg_color5}><Text>col size=4</Text></Col>
            </Grid>

            <Text style={flex_styles.line}>LINE</Text>

            <Grid style={{height:200}}>
                <Row size={1} style={flex_styles.bg_color1}><Text>col</Text></Row>
                <Row size={2} style={flex_styles.bg_color3}><Text>col</Text></Row>
                <Row size={4} style={flex_styles.bg_color5}><Text>col size=4</Text></Row>
            </Grid>

            <Text style={flex_styles.line}>LINE</Text>

            <Grid style={{height:200}}>
                <Row size={1} style={flex_styles.bg_color1}><Text>col</Text></Row>
                <Row size={2} style={flex_styles.bg_color3}><Text>col</Text></Row>
                <Row size={4} style={flex_styles.bg_color5}>
                    <Col size={1} style={flex_styles.bg_color1}><Text>col size=1</Text></Col>
                    <Col size={2} style={flex_styles.bg_color3}>
                        <Row size={1} style={flex_styles.bg_color2}><Text>col</Text></Row>
                        <Row size={2} style={flex_styles.bg_color4}><Text>col</Text></Row>
                    </Col>
                    <Col size={1} style={flex_styles.bg_color5}><Text>col size=1</Text></Col>
                </Row>
            </Grid>

            <Text style={flex_styles.line}>LINE</Text>

        </ScrollView>
    )
};

const FlexDemoScreen = () => {
    return(
        <ScrollView>
            <Text>flex_row</Text>
            <View style={flex_styles.flex_row}>
                <Text style={[flex_styles.flex_row_item,flex_styles.flex_row_item1,flex_styles.box_color1]}>flex_row_item1</Text>
                <Text style={[flex_styles.flex_row_item,flex_styles.flex_row_item2,flex_styles.box_color2]}>flex_row_item2</Text>
                <Text style={[flex_styles.flex_row_item,flex_styles.flex_row_item3,flex_styles.box_color3]}>flex_row_item3</Text>
            </View>

            <Text style={flex_styles.line}>LINE</Text>

            <Text>flex_column</Text>
            <View style={flex_styles.flex_column}>
                <Text style={[flex_styles.flex_column_item,flex_styles.flex_column_item1,flex_styles.box_color1]}>flex_column_item1</Text>
                <Text style={[flex_styles.flex_column_item,flex_styles.flex_column_item2,flex_styles.box_color2]}>flex_column_item2</Text>
                <Text style={[flex_styles.flex_column_item,flex_styles.flex_column_item3,flex_styles.box_color3]}>flex_column_item3</Text>
            </View>

            <Text style={flex_styles.line}>LINE</Text>

            <Text>Nested flex</Text>

            <View style={[flex_styles.flex_row]}>
                <View style={[flex_styles.flex_column,{flex:1,margin:10}]}>
                    <Text style={[flex_styles.flex_column_item,flex_styles.flex_column_item1,flex_styles.box_color1]}>flex_column_item1</Text>
                    <Text style={[flex_styles.flex_column_item,flex_styles.flex_column_item2,flex_styles.box_color2]}>flex_column_item2</Text>
                    <Text style={[flex_styles.flex_column_item,flex_styles.flex_column_item3,flex_styles.box_color3]}>flex_column_item3</Text>
                </View>
                <View style={[flex_styles.flex_column,{flex:2,margin:10}]}>
                    <Text style={[flex_styles.flex_column_item,flex_styles.flex_column_item3,flex_styles.box_color3]}>flex_column_item3</Text>
                    <Text style={[flex_styles.flex_column_item,flex_styles.flex_column_item2,flex_styles.box_color2]}>flex_column_item2</Text>
                    <Text style={[flex_styles.flex_column_item,flex_styles.flex_column_item1,flex_styles.box_color1]}>flex_column_item1</Text>
                </View>
            </View>

            <Text style={flex_styles.line}>LINE</Text>

            <Text>FINISH</Text>


            <View style={[flex_styles.flex_grid]}>
                <Text style={[flex_styles.flex_grid_item,flex_styles.flex_grid_item1,flex_styles.box_color1]}>flex_column_item1</Text>
                <Text style={[flex_styles.flex_grid_item,flex_styles.flex_grid_item2,flex_styles.box_color2]}>flex_column_item2</Text>
                <Text style={[flex_styles.flex_grid_item,flex_styles.flex_grid_item3,flex_styles.box_color3]}>flex_column_item3</Text>
                <Text style={[flex_styles.flex_grid_item,flex_styles.flex_grid_item4,flex_styles.box_color4]}>flex_column_item4</Text>
                <Text style={[flex_styles.flex_grid_item,flex_styles.flex_grid_item5,flex_styles.box_color5]}>flex_column_item5</Text>
            </View>

        </ScrollView>
    );
}

const flex_styles = StyleSheet.create({
    line:{
        margin:10,
        height:2,
        backgroundColor:'#000'
    },
    bg_color1:{
        backgroundColor:'#000'
    },
    bg_color2:{
        backgroundColor:'#333'
    },
    bg_color3:{
        backgroundColor:'#666'
    },
    bg_color4:{
        backgroundColor:'#999'
    },
    bg_color5:{
        backgroundColor:'#CCC'
    },

    box_color1:{
        color:'#FFF',
        backgroundColor:'#000'
    },
    box_color2:{
        color:'#FFF',
        backgroundColor:'#333'
    },
    box_color3:{
        color:'#FFF',
        backgroundColor:'#666'
    },
    box_color4:{
        color:'#FFF',
        backgroundColor:'#999'
    },
    box_color5:{
        color:'#000',
        backgroundColor:'#CCC'
    },

    //flexDirection:'row'

    flex_row:{
        flexDirection:'row'
    },
    flex_row_item:{
        height:60,
        padding:10
    },
    flex_row_item1:{
        flex:1
    },
    flex_row_item2:{
        flex:2
    },
    flex_row_item3:{
        flex:3
    },

    //flexDirection:'column'
    flex_column:{
        height:200,
        flexDirection:'column'
    },
    flex_column_item:{
        padding:10
    },
    flex_column_item1:{
        flex:1
    },
    flex_column_item2:{
        flex:2
    },
    flex_column_item3:{
        flex:3
    },

    // flexWrap
    flex_grid:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    flex_grid_item:{
        height:60,
        width:120,
        margin:10,
        padding:10
    },
    flex_grid_item1:{
        height:20
    },
    flex_grid_item2:{
        height:40
    },
    flex_grid_item3:{
        height:60
    },
    flex_grid_item4:{
        height:80
    },
    flex_grid_item5:{
        height:100
    }
});
const MainStack = createStackNavigator(
    {
        EasyGridDemo: { screen: EasyGridDemoScreen},
        FlexDemo: { screen: FlexDemoScreen },
        Home: { screen: HomeScreen },
        Profile: { screen: ProfileScreen },
    },
    {
        initialRouteName: 'EasyGridDemo',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);


const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainStack,
        },
        MyModal: {
            screen: ModalScreen,
        },
    },
    {
        mode: 'card',
        headerMode: 'none',
    }
);

class App extends React.Component {
    render() {
        return <RootStack />;
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
                <Button
                    title="go to Setting 2!"
                    onPress={() => this.props.navigation.navigate('Settings2')}
                />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex:1,padding:10, width:50, backgroundColor:'#CCC'}} >aaaa</Text>
                    <Text style={{ flex:1,padding:10, width:50, backgroundColor:'#999'}} >bbbb</Text>
                    <Text style={{ flex:1,padding:10, width:50, backgroundColor:'#666'}} >CCCCC</Text>
                </View>
            </View>
        );
    }
}

class Settings2Screen extends React.Component {

    saveData(){
        let obj = {
            name : 'John',
            email: 'test@example.com',
            country: 'japan'
        };
        AsyncStorage.setItem('user',JSON.stringify(obj));
    }

    displayData = async () => {
        try{
            let user = await AsyncStorage.getItem('user');
            let parsed_user = JSON.parse(user);
            alert(parsed_user.email);
        }catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings 2!</Text>
                <Button
                    title="go to Setting!"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
                <Button
                    title="Go to Profile"
                    onPress={() => this.props.navigation.navigate('Profile', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    })}
                />

                <TouchableOpacity onPress={this.saveData}>
                    <Text>Click me to save data</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.displayData}>
                    <Text>Click me to display data</Text>
                </TouchableOpacity>




            </View>
        );
    }
}

const HomeStack = createStackNavigator({
    EasyGridDemo: EasyGridDemoScreen,
    FlexDemo: FlexDemoScreen,
    Home: HomeScreen,
    Profile: ProfileScreen
});
const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Settings2: Settings2Screen
});


export default createBottomTabNavigator(
    {
        Home: HomeStack,
        Settings: SettingsStack,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'Settings') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                } else {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'green',
            inactiveTintColor: 'gray',
        },
    }
);

// export default App;

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

