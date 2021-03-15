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
class Login extends Component {


        onFooterLinkPress = () => {
            this.props.navigation.navigate('Registration')
        }

        onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                const uid = response.user.uid
                console.log("LOGIN UID : ")
                myApiService.getUserByFireBaseUid(uid)
                    .then((json) => {
                        console.log("From get user Request : ")
                        console.log(json);
                        this.props.navigation.navigate('Home', { user: json })
                    })
                    .catch((error) => {
                        alert.error(error);
                    });
                        //console.log(user)
                //const usersRef = firebase.firestore().collection('users')

                /*usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                    })
                    .catch(error => {
                        alert(error)
                    });*/
            })
            .catch(error => {
                alert(error)
            })
    }



    constructor(props) {
        super(props);
        console.ignoredYellowBox = ['Setting a timer'];
        this.state = {
            email: '',
            password: '',
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
                        <TextInput
                            style={styles.input}
                            placeholder='E-mail'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) =>  this.setState({
                                email: text,
                            })}
                            value={this.state.email}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#aaaaaa"
                            secureTextEntry
                            placeholder='Password'
                            onChangeText={(text) =>  this.setState({
                                password: text,
                            })}
                            value={this.state.password}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.onLoginPress()}>
                            <Text style={styles.buttonTitle}>Log in</Text>
                        </TouchableOpacity>
                        <View style={styles.footerView}>
                            <Text style={styles.footerText}>Don't have an account? <Text onPress={this.onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
        );
    }
};
export default Login;
