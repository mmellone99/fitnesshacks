import React from 'react'
import { Text, View, Button } from 'react-native';

export default function Landing({navigation}) {
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button 
                title = "Sign-up"
                onPress = {() =>  navigation.navigate("Sign-Up")}/>
            <Button 
                title = "Login"
                onPress = {() =>  navigation.navigate("Login")}/>    
        </View>
    )
}
