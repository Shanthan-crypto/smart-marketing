import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase"

import { ActionSheet, Button, Form, Input, Item, Label, Root } from "native-base";
import {
  AsyncStorage,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import Colors from "../Colors";
import React from "react";
import moment from "moment";

const buttons = ["Camera", "Gallery", "Cancel"];

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    HeaderView = this.HeaderView.bind(this);
    UserDetails = this.UserDetails.bind(this);
    UserInfoView = this.UserInfoView.bind(this);
    PrimaryDetailsView = this.PrimaryDetailsView.bind(this);
    ProfilePictureView = this.ProfilePictureView.bind(this);
    DetailView = this.DetailView.bind(this);
    this.state={
        mobileNumber:"9666899200",
        lastName:"",
        location:"",
        age:"",
        imageUri:"https://bootdey.com/img/Content/avatar/avatar6.png"
    }
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.themeColor,
      shadowColor: "transparent",
      elevation: 0
    }
  };

  
  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signd Out"))
      .catch((err) => Alert.alert(err.message));
  };

  DetailView = props => {
    return (
      <View style={styles.detailView}>
        <Text style={styles.labelText}>{props.label}</Text>
        <Text style={styles.dataText}>{props.data}</Text>
      </View>
    );
  };

  UserDetails = props => {
    return Object.keys(props.parentDetails).map((currentKey, index) => {
      return props.parentDetails[currentKey] != null ? (
        <View key={index}>
          <DetailView
            label={Constants.NEW_USER_FORM.LABELS[currentKey]}
            data={
              currentKey == "dob" || currentKey == "expectedDueDate"
                ? moment(props.parentDetails[currentKey]).format(
                    Constants.DATE_FORMAT
                  )
                : props.parentDetails[currentKey].toString()
            }
          />
        </View>
      ) : null;
    });
  };

  
  pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [3, 4],
      quality: 0.2
    });
    if (!result.cancelled) {
      const imageUri = "data:image/jpeg;base64," + result.base64;
      this.setState({imageUri})
    }
  };

  pickImageFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [3, 4],
      quality: 0.2
    });
    if (!result.cancelled) {
      const imageUri = "data:image/jpeg;base64," + result.base64;
      this.setState({imageUri})
    }
  };

  showActionSheet = () => {
    ActionSheet.show(
      {
        options: buttons
      },
      buttonIndex => {
        buttonIndex
          ? buttonIndex == 1
            ? this.pickImageFromGallery()
            : ActionSheet.hide()
          : this.pickImageFromCamera();
      }
    );
  };

  HeaderView = () => {
    return (
      <View style={styles.header}>
        <View style={styles.firstPic}>
          <FontAwesome name="list-alt" size={30} color={Colors.themeColor} />
        </View>
        <View style={styles.secondPic}>
          <Image
            source={require("../assets/logo.png")}
            style={{ height: 30, width: 30, padding: 5 }}
          />
        </View>
        <View style={styles.firstPic}>
          <MaterialCommunityIcons
            name="math-integral"
            size={30}
            color={Colors.themeColor}
          />
        </View>
      </View>
    );
  };

  
  UserInfoView = () => {
    return (
      <View>
        <View style={styles.subHeadingView}>
          <Text style={styles.subHeadingText}>You</Text>
          <TouchableOpacity
            style={{ paddingRight: 7 }}
            onPress={() => alert("Hi..")}
          >
            <Entypo name="edit" size={25} color={Colors.themeColor} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  PrimaryDetailsView = () => {
    return (
      <View style={styles.bodyContent}>
        <Text style={styles.name}>Shanthan</Text>
        <Text style={styles.info}>shanthan.konka@gmail.com</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.signOutUser()}
          >
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
      </View>
    );
  };

  ProfilePictureView = () => {
    return (
      <View>
        <HeaderView />
        <Image style={styles.avatar} source={{ uri: this.state.imageUri }} />
        <TouchableOpacity
          style={styles.editProfilePicture}
          onPress={() => this.showActionSheet()}
        >
          <MaterialCommunityIcons
            name="account-edit"
            color={Colors.white}
            size={27}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <Root>
        <ScrollView style={styles.container}>
          <ProfilePictureView />
          <View style={styles.body}>
            <PrimaryDetailsView />
            <UserInfoView />
            <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Mobile number</Label>
            <Input autoCorrect={false} autoCapitalize='none'
              keyboardType="numeric"
              value={this.state.mobileNumber}
              onChangeText={mobileNumber=>this.setState({mobileNumber})}/>
          </Item>
          <Item floatingLabel>
            <Label>Last Name</Label>
            <Input autoCorrect={false} autoCapitalize='none'
              keyboardType="default"
              value={this.state.lastName}
              onChangeText={lastName=>this.setState({lastName})}/>
          </Item>
          <Item floatingLabel>
            <Label>Location</Label>
            <Input autoCorrect={false} autoCapitalize='none'
              keyboardType="default"
              value={this.state.location}
              onChangeText={location=>this.setState({location})}/>
          </Item>
          <Item floatingLabel>
            <Label>Age</Label>
            <Input autoCorrect={false} autoCapitalize='none'
              keyboardType="numeric"
              value={this.state.age}
              onChangeText={age=>this.setState({age})}/>
          </Item>
          </Form>
          </View>
        </ScrollView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.themeColor,
    height: 220
  },
  firstPic: {
    height: 40,
    width: 40,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginTop: 90
  },
  secondPic: {
    height: 40,
    width: 40,
    marginTop:50,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 150
  },
  editProfilePicture: {
    marginTop: 270,
    height: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    marginBottom: 5,
    borderRadius: 70,
    backgroundColor: Colors.themeColor
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    alignItems: "center",
    padding: 30
  },
  form: {
    //padding: 10,
    width: "100%",
    marginBottom: 30
  },
  name: {
    fontSize: 28,
    marginTop: 5,
    //fontFamily: "balooRegular",
    color: "#696969"
  },
  info: {
    fontSize: 16,
    //fontFamily: "goldPlayMedium",
    color: Colors.themeColor,
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: Colors.themeColor,
    marginTop: 10,
    textAlign: "center"
  },
  subHeadingView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  subHeadingText: {
    paddingLeft: 7,
    fontSize: 18,
    marginTop: 20,
    //fontFamily: "goldPlayMedium"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: Colors.themeColor
  },
  buttonText: {
    color: Colors.white,
    //fontFamily: "goldPlayMedium"
  },
  detailView: {
    backgroundColor: Colors.greyBackground,
    marginTop: 5
  },
  labelText: {
    //fontFamily: "balooRegular",
    paddingLeft: 7,
    paddingTop: 5
  },
  dataText: {
    //fontFamily: "goldPlayMedium",
    paddingLeft: 7,
    paddingVertical: 5
  }
});
