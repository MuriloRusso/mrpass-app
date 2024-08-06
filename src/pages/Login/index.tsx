import React, { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { AuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigateStackRoutes } from '../../routes/app.routes';

export default function Login() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const navigator = useNavigation<NativeStackNavigationProp<NavigateStackRoutes>>()


  const {signIn, erro} = useContext(AuthContext);

  const handleLogin = async () => {
    await signIn({ email,  password })
  };

  return (
    <View style={{ alignItems: 'center', width: "100%" }}>
      <View style={{ ...styles.container, maxWidth: '90%' }}>
        <Text style={styles.title}>MRPass</Text>
        <Text style={{fontSize: 18}}>Gerenciamento de Senhas</Text>
        {
          erro &&
            <View style={[styles.alertDanger, styles.alert]}>
              <Text style={[styles.alertDanger, styles.textCenter]}>{erro}</Text>
            </View>
        }
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="E-mail"
          keyboardType="numeric"
          placeholderTextColor="#777777"
          >
        </TextInput>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Senha"
          secureTextEntry={true}
          keyboardType="numeric"
          placeholderTextColor="#777777"
        >
        </TextInput>
        <TouchableOpacity
          style={styles.btn}
          onPress={handleLogin}
          accessibilityLabel=""
        >
          <Text style={[styles.textWhite, styles.textCenter]}>
            Entrar
          </Text>
        </TouchableOpacity>
        <StatusBar backgroundColor='#FE715B' /*barStyle="light-content"*/ translucent={false}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300
  },
  title: {
    color: '#FE715B',
    fontSize: 35,
    fontWeight: '500'
  },
  input: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#ededfb',
    fontSize: 18,
    borderColor: "transparent",
    width: "100%",
    // borderColor: 'blue'
  },
  btn: {
    padding: 15,
    backgroundColor: '#FE715B',
    width: '100%',
    margin: 10,
    maxWidth: 500,
  },
  textWhite: {
    color: '#ffffff',
  },
  textCenter: {
    textAlign: 'center',
  },
  alert: {
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 5,
    maxWidth: '100%',
  },
  alertDanger: {
    backgroundColor: "#FFE8EE",
    color: "#EE6C90",
  }
});
