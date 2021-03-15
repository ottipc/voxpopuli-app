import React, {Component} from 'react';
import {Image, ImageBackground, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import City from '../components/City';
import CardItem from '../components/CardItem';
import Demo from '../assets/data/demo_vox.js';
import myApiService from '../api/apiService';
import { firebase } from '../src/firebase/config'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//const votedata = myApiService.getAllVotes();
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})
class Registration extends Component {

    onFooterLinkPress = () => {
        this.props.navigation.navigate('Login')
    }

    onRegisterPress = () => {
        if (this.state.setPassword !== this.state.setConfirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.setEmail, this.state.setPassword)
            .then((response) => {
                const uid = response.user.uid
                //console.log(response)
                const data = {
                    id: uid,
                    email:this.state.setEmail
                }
                //const usersRef = firebase.firestore().collection('users')
                console.log("User persisting in voxipo database")

                myApiService.persistUser(this.state.setEmail, uid)
                this.props.navigation.navigate('Login', {user: data})

                /*usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        alert("Navigate")
                        console.log("Navigate......")

                        //navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        console.log("Error")
                        console.log(error)
                        alert(error)
                    });*/
            })
            .catch((error) => {
                alert(error)
            });
    }



    constructor(props, navigation) {
        super(props);
        console.ignoredYellowBox = ['Setting a timer'];
        console.log("*************************** Constructor *****************************************************")
        this.state = {
            navigation: navigation,
            voteData: [],
            fullName: '',
            setFullName: '',
            setEmail: '',
            setPassword: '',
            confirmPassword: '',
            setConfirmPassword: ''


        }
    }
    render() {
            return (

                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        style={{ flex: 1, width: '100%' }}
                        keyboardShouldPersistTaps="always">
                        <Image
                            style={styles.logo}
                            source={require('../assets/icons/app-icon.jpg')}
                        />
                      {/*  <TextInput
                            style={styles.input}
                            placeholder='Full Name'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) =>  this.setState({
                                setFullName: text,
                            })}
                            value={this.state.setFullName}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />*/}
                        <TextInput
                            style={styles.input}
                            placeholder='E-mail'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) =>  this.setState({
                                setEmail: text,
                            })}
                            value={this.state.setEmail}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#aaaaaa"
                            secureTextEntry
                            placeholder='Password'
                            onChangeText={(text) =>  this.setState({
                                setPassword: text,
                            })}
                            value={this.state.setPassword}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#aaaaaa"
                            secureTextEntry
                            placeholder='Confirm Password'
                            onChangeText={(text) =>  this.setState({
                                setConfirmPassword: text,
                            })}
                            value={this.state.setConfirmPassword}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.onRegisterPress()}>
                            <Text>Create account</Text>
                        </TouchableOpacity>
                        <View style={styles.footerView}>
                            <Text style={styles.footerText}>Already have an account? <Text onPress={this.onFooterLinkPress} style={styles.footerLink}>Login</Text></Text>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
        );
    }
};

export default Registration;
