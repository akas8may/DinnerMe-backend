import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <Toast />
    </NavigationContainer>
  );
}


//tree -I "node_modules"


// - Build Command: `npm run vercel-build` or `npm run build`
// - Development Command: None
// - Install Command: `yarn install`, `pnpm install`, `npm install`, or `bun install`
// - Output Directory: `public` if it exists, or `.`
// ? Want to modify these settings? yes
// ? Which settings would you like to overwrite (select multiple)?
// ? Do you want to change additional project settings? no
// 🔗  Linked to kulshresthaakki-5511s-projects/backend (created .vercel and added it to .gitignore)
// 🔍  Inspect: https://vercel.com/kulshresthaakki-5511s-projects/backend/DaAfSZXg4DPJcAYtDBC7ye7AuEfM [5s]
// ✅  Production: https://backend-qq772zrel-kulshresthaakki-5511s-projects.vercel.app [27s]
// 🔗  Aliased: https://backend-snowy-kappa-94.vercel.app [27s]
// 📝  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
// 💡  To change the domain or build command, go to https://vercel.com/kulshresthaakki-5511s-projects/backend/settings