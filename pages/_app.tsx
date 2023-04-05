// import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { globalStyles } from "../src/commons/styles/globalStyles";
import ApolloSetting from "../src/components/commons/apollo";
import Layout from "../src/components/commons/layout";

// --------------------------firebase-------------------------
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATxbuGOwmi0pmsthc40DQwOyiq7haaLeI",
  authDomain: "heejae-react-class.firebaseapp.com",
  projectId: "heejae-react-class",
  storageBucket: "heejae-react-class.appspot.com",
  messagingSenderId: "946565987804",
  appId: "1:946565987804:web:8d936566eaedce40bfe319",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// //--------------------------firebase-------------------------

function App({ Component }: AppProps) {
  return (
    <ApolloSetting>
      <>
        <Global styles={globalStyles} />
        <Layout>
          <Component />
        </Layout>
      </>
    </ApolloSetting>
  );
}

export default App;
