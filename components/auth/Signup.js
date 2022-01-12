import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Image } from 'react-native'

const Signup = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require(`../../assets/instagramlogo.png`)} />
            <TextInput
                style={styles.inputs}
                placeholder='이름' />
            <TextInput
                style={styles.inputs}
                placeholder='이메일' />
            <TextInput
                style={styles.inputs}
                secureTextEntry={true}
                placeholder='비밀번호' />
            <Pressable style={styles.signupbtn} onPress={() => console.log('Signup')}>
                <Text style={styles.signupbtnText}>회원가입</Text>
            </Pressable>
            <TouchableOpacity style={[styles.moveContainer, styles.loginBtn]} onPress={() => navigation.goBack()}>
                <Text style={[styles.moveText]}>이미 계정이 있으신가요?</Text>
                <Text style={[styles.moveText, styles.moveTextBold]}>로그인하기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        backgroundColor:'white'
    },
    logo: {
        width: 160,
        height: 45,
        marginBottom: 30
    },
    inputs: {
        width: '100%',
        height: 40,
        backgroundColor: 'whitesmoke',
        borderColor: '#bbb',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: '.7rem',
        paddingLeft: 10,
        outlineStyle:'none'
    },
    signupbtn: {
    width: '100%',
    height: 40,
    backgroundColor: '#99c4e9',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
},
    signupbtnText: {
    color: '#aaa',
    fontSize: '.7rem',
},
    moveContainer: { flexDirection: 'row' },
    moveText: { fontSize: '.6rem' },
    moveTextBold: { fontWeight: '600' },
    helpBtn: { marginVertical: 10 },
    loginBtn: {
    position: 'fixed',
    bottom: 0,
    left: 0, right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderTopWidth: 2,
    borderTopColor: 'whitesmoke'
}
});


export default Signup
