import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme/ThemeContext';
import { ToastProvider } from './src/widgets/CustomScaffoldMessage';
import { AppNavigator } from './src/navigation/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider>
          <AppNavigator />
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
