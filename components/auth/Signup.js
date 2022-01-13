import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Image } from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

import { Formik } from 'formik';
import * as Yup from 'yup'

const Signup = ({ navigation }) => {

    const signUpFormSchema = Yup.object().shape({
        email: Yup.string().email().required('정확한 이메일형식으로 작성해주세요'),
        password: Yup.string().required().min(6, '비밀번호 6자리 이상 입력하세요'),
        name: Yup.string().required().min(2, '적합하지않은 이름입니다.')
    })

    const db = getFirestore();
    const auth = getAuth();
    const onSignUp = (email, password, name) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setDoc(doc(db, 'users', auth.currentUser.uid), { email, name });
                navigation.goBack()
            })
            .catch( err => console.log('이미 가입된 아이디 혹은 잘못된 입력값 입니다.'))

    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require(`../../assets/instagramlogo.png`)} />
            <View style={styles.formik}>
                <Formik
                    initialValues={{ email: '', password: '', name: '' }}
                    onSubmit={values => onSignUp(values.email, values.password, values.name)}
                    validationSchema={signUpFormSchema}
                    validateOnMount={true}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
                        <>
                            <View >
                                <TextInput
                                    style={styles.inputs}
                                    placeholder='이메일'
                                    autoCorrect={false} // 자동수정 비활성화
                                    autoFocus={true} // 페이지오픈시 포커스
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
                                    secureTextEntry={true} // 비밀번호 *** 처리
                                    autoCapitalize='none'
                                    textContentType='password'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                            </View>
                            <View>
                                <TextInput
                                    style={styles.inputs}
                                    placeholder='이름'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    textContentType='text'
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                            </View>
                            <Pressable style={[styles.signupbtn, { backgroundColor: isValid ? '#6BB0F5' : '#9ACAF7', }]} onPress={handleSubmit}>
                                <Text style={styles.signupbtnText}>회원가입</Text>
                            </Pressable>
                        </>
                    )}
                </Formik>
            </View>

            <TouchableOpacity style={[styles.moveContainer, styles.loginBtn]} onPress={() => navigation.goBack()}>
                <Text style={[styles.moveText]}>이미 계정이 있으신가요?</Text>
                <Text style={[styles.moveText, styles.moveTextBold]}>로그인하기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    logo: {
        width: 160,
        height: 45,
        marginBottom: 30
    },
    formik: {
        width: '100%',
        paddingHorizontal: '5%'
    },
    inputs: {
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gainsboro',
        borderRadius: 5,
        marginBottom: 15,
        fontSize: '.7rem',
        outlineStyle: 'none'
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
        color: 'white',
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
