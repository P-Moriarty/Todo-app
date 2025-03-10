// import { Tabs } from 'expo-router';
import React from 'react';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
// import { Platform } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthLayout() {
//   const colorScheme = useColorScheme();

  return (
    <>
    <Stack>
        <Stack.Screen
            name="index"
            options={{
                title: "Login",
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="signup"
            options={{
                title: "Signup",
                headerShown: false,
            }}
        />
    </Stack>

    {/* <Loader isLoading={loading} /> */}
    <StatusBar backgroundColor="#161622" style="light" />
</>
  );
}
