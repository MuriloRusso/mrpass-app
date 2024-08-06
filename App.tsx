import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <NavigationContainer>
        <AuthProvider>
          <StatusBar backgroundColor='#FE715B' /*barStyle="light-content"*/ translucent={false}/>
          <Routes/>
        </AuthProvider>
    </NavigationContainer>
  )
}