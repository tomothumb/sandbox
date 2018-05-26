import React ,{Component} from 'react';
import { StyleSheet, Button, Text, TextInput, View , ScrollView, Alert,
    ActionSheetIOS,AlertIOS,DatePickerIOS,ImagePickerIOS} from 'react-native';
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
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor,
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor,
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


const MainStack = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        Profile: { screen: ProfileScreen },
    },
    {
        initialRouteName: 'Home',
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
            </View>
        );
    }
}

class Settings2Screen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings 2!</Text>
                <Button
                    title="go to Setting!"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
            </View>
        );
    }
}

const HomeStack = createStackNavigator({
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

