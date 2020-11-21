import * as DocumentPicker from "expo-document-picker";
import * as firebase from "firebase";

import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { Component } from "react";

import AsyncStorage from "@react-native-community/async-storage"
import { Button } from "native-base";
import Colors from "../Colors";
import { Pages } from "react-native-pages";
import ParallaxScrollView from "react-native-parallax-scrollview";
import { StatusBar } from "expo-status-bar";

// import axios from 'axios';

var url = "http://http://127.0.0.1:5000/api";

export default class AnalysisScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      isTouched: false,
    };
  }

  componentDidMount() {
    //AsyncStorage.clear()
    firebase.auth().onAuthStateChanged((res) => {
      if (res)
        this.setState({
          name: res.displayName,
          email: res.email,
        });
      else this.props.navigation.replace("SignInScreen");
    });
  }

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
    // axios.post('${url}', {
    //   doc:result.uri
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    this.props.navigation.navigate("AnalysisScreen");
  };

  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signd Out"))
      .catch((err) => Alert.alert(err.message));
  };

  render() {
    // return (
    // <View style={styles.container}>
    //   <View style={styles.logoContainer}>
    //       <Image source={require('../assets/logo.png')}/>
    //     </View>
    //     <View style={styles.userDetails}>
    //       <Text>Hey {this.state.name}</Text>
    //       <Text>You are signed in as: {this.state.email}</Text>
    //     </View>
    //     <Button style={styles.button} full rounded success
    //       onPress={()=>this.signOutUser()}>
    //       <Text style={styles.buttonText}>Sign Out</Text>
    //     </Button>
    //     <Button style={styles.button} full rounded
    //       onPress={this._pickDocument}
    //     >
    //       <Text style={styles.buttonText}>Select Document</Text>
    //     </Button>
    //     <StatusBar style="auto" />
    // </View>
    // );
    const { isTouched } = this.state;
    return isTouched ? (
      <ParallaxScrollView
        windowHeight={350}
        backgroundSource={require("../assets/chart.png")}
        navBarTitle="About Us"
        navBarTitleColor="black"
        navBarColor="white"
        headerView={<View></View>}
      >
        <ScrollView>
          <View style={styles.warningView}>
            <Text style={styles.warningTitleText}>About Us</Text>
            <Text style={styles.warningInfoText}>
              Smart Marketing Application is a platform to share awareness about
              a business or service between consumers and sellers. It is an
              excellent resource for gathering information needed to determine
              if that businesses or service is satisfying customer requirements.
              Yet, consumers will often fail to leave reviews if the process to
              do so is too lengthy, overly complicated, or if too much time has
              passed after visiting a business. Reading numerous reviews often
              requires sellers to dedicate a considerable amount of time to
              compose or examine and frequently provide extraneous amounts of
              information irrelevant to the business reviewed. Problems also
              arise from the use of oversimplified rating scales that lack
              context and become meaningless when consumers do not know what
              attributes scores are based on. The existence of these issues
              creates the demand for a tool that can collect, compile, and
              deliver relevant business reviews back to sellers quickly and in a
              user-friendly format.
            </Text>

            <Text style={styles.warningInfoText}>
              Smart marketing is the process of dividing the customer base into
              several groups of individuals that share a similarity in different
              ways that are relevant to marketing such as gender, age,
              interests, and miscellaneous spending habits. Companies that
              deploy smart marketing are under the notion that every customer
              has different requirements and require a specific marketing effort
              to address them appropriately. Companies aim to gain a deeper
              approach of the customer they are targeting. Therefore, their aim
              has to be specific and should be tailored to address the
              requirements of each and every individual customer. Furthermore,
              through the data collected, companies can gain a deeper
              understanding of customer preferences as well as the requirements
              for discovering valuable segments that would reap them maximum
              profit. This way, they can strategize their marketing techniques
              more efficiently and minimize the possibility of risk to their
              investment.
            </Text>
          </View>
        </ScrollView>
      </ParallaxScrollView>
    ) : (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/HomePage_Background.png")}
          style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
        >
          <TouchableHighlight
            onPress={() => this.setState({ isTouched: true })}
            style={{ flex: 1 }}
          >
            <Text></Text>
          </TouchableHighlight>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    //alignItems: "center",
    //margin: 20
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100,
  },
  userDetails: {},

  button: {
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
  },
  warningInfoText: {
    marginTop: 10,
    //fontFamily: "goldPlayMedium",
    color: Colors.helpText,
  },
  warningView: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  warningTitleText: {
    fontSize: 15,
    //fontFamily: "balooRegular"
  },
});
