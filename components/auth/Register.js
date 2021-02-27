import React, { Component } from 'react'
import {View, Button, TextInput } from 'react-native'
import firebase from 'firebase'

export class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            age: '',
            height: '',
            weight: ''
        }

        this.onSignUp=this.onSignUp.bind(this)
    }

    onSignUp(){
        const { email, password, name, age, height, weight} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email,
                    age,
                    height,
                    weight
                })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View>
                <TextInput 
                    placeholder = "Email"
                    onChangeText={(email) => this.setState({email})}    
                />
                <TextInput 
                    placeholder = "Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}    
                />
                <TextInput 
                    placeholder = "Name"
                    onChangeText={(name) => this.setState({name})}    
                />
                <TextInput 
                    placeholder = "Age"
                    keyboardType = "numeric"
                    secureTextEntry={true}
                    onChangeText={(age) => this.setState({age})}    
                />
                <TextInput 
                    placeholder = "Height"
                    keyboardType = "numeric"
                    secureTextEntry={true}
                    onChangeText={(height) => this.setState({height})}    
                />
                <TextInput 
                    placeholder = "Weight"
                    keyboardType = "numeric"
                    secureTextEntry={true}
                    onChangeText={(weight) => this.setState({weight})}    
                />

                <Button
                    onPress={() => this.onSignUp()} 
                    title = "Sign Up"
                />
            </View>
        )
    }
}

export default Register
