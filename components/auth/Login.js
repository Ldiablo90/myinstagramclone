import { Pressable, Image, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup'

import { fireAuth } from '../../firebase'

const { getAuth, signInWithEmailAndPassword } = fireAuth

const Login = ({ navigation }) => {

    const auth = getAuth()

    const signInFormSchema = Yup.object().shape({
        email: Yup.string().email().required(''),
        password: Yup.string().required().min(6, '')
    })

    const onSignIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then()
            .catch(err => { console.log('이메일 혹은 패스워드 확인 부탁드립니다.') })
    }

    return (
        <View style={styles.container}>

            <View style={styles.content}>
                <Image style={styles.logo} source={require(`../../assets/instagramlogo.png`)} />
                <View style={styles.formik}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={values => onSignIn(values.email, values.password)}
                        validationSchema={signInFormSchema}
                        validateOnMount={true}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
                            <>
                                <View >
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder='이메일'
                                        autoCorrect={false} // 자동수정 비활성화

                                        autoCapitalize='none'
                                        textContentType='emailAddress'
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                </View>
                                <View>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder='비밀번호'
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        textContentType='password'
                                        secureTextEntry={true}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                </View>
                                <Pressable style={[styles.loginbtn, { backgroundColor: isValid ? '#6BB0F5' : '#9ACAF7', }]} onPress={handleSubmit} disabled={!isValid}>
                                    <Text style={styles.loginbtnText}>로그인</Text>
                                </Pressable>
                            </>
                        )}
                    </Formik>
                </View>

                <TouchableOpacity onPress={() => console.log('fortget-passward')} style={[styles.moveContainer, styles.helpBtn]}>
                    <Text style={[styles.moveText]}>로그인 상세 정보를 잊으셨나요?</Text>
                    <Text style={[styles.moveText, styles.moveTextBold]}>로그인 도움말 보기.</Text>
                </TouchableOpacity>

            </View>
            <TouchableOpacity style={[styles.moveContainer, styles.signupBtn]} onPress={() => navigation.navigate('Signup')}>
                <Text style={[styles.moveText]}>계정이 없으신가요?</Text>
                <Text style={[styles.moveText, styles.moveTextBold]}>가입하기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '10%',
        backgroundColor: 'white'
    },
    content:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    logo: {
        width: 160,
        height: 45,
        marginBottom: 30
    },
    formik: {
        width:'100%',
    },
    inputs: {
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderWidth: 1,
        fontSize:12,
        borderColor: 'gainsboro',
        borderRadius: 5,
        marginBottom: 15,
    },
    loginbtn: {
        width: '100%',
        height: 40,
        fontSize:12,
        backgroundColor: '#99c4e9',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginbtnText: {
        color: 'white',
    },
    moveContainer: { flexDirection: 'row' },
    moveText: { fontSize:10, paddingHorizontal:1 },
    moveTextBold: { fontWeight: '600' },
    helpBtn: { marginVertical: 10 },
    signupBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderTopWidth: 2,
        borderTopColor: 'whitesmoke'
    }
});


export default Login
