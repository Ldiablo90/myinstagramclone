import { Pressable, Image, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
const Login = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require(`../../assets/instagramlogo.png`)} />
            <TextInput
                style={styles.inputs}
               
                placeholder='전화번호, 이메일 주소 또는 사용자 이름' />
            <TextInput
                style={styles.inputs}
                secureTextEntry={true}
                placeholder='비밀번호' />
            <Pressable style={styles.loginbtn} onPress={() => console.log('loginbtn')} disabled>
                <Text style={styles.loginbtnText}>로그인</Text>
            </Pressable>
            <TouchableOpacity onPress={() => console.log('fortget-passward')} style={[styles.moveContainer, styles.helpBtn]}>
                <Text style={[styles.moveText]}>로그인 상세 정보를 잊으셨나요?</Text>
                <Text style={[styles.moveText, styles.moveTextBold]}>로그인 도움말 보기.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.moveContainer, styles.signupBtn]} onPress={() => navigation.navigate('Signup')}>
                <Text style={[styles.moveText]}>계정이 없으신가요?</Text>
                <Text style={[styles.moveText, styles.moveTextBold]}>가입하기</Text>
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
    loginbtn: {
    width: '100%',
    height: 40,
    backgroundColor: '#99c4e9',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
},
    loginbtnText: {
    color: '#aaa',
    fontSize: '.7rem',
},
    moveContainer: { flexDirection: 'row' },
    moveText: { fontSize: '.6rem' },
    moveTextBold: { fontWeight: '600' },
    helpBtn: { marginVertical: 10 },
    signupBtn: {
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


export default Login
