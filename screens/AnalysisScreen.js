import { Text, TouchableHighlight, View } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import React from "react";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUri: [],
      fileNames: [],
    };
  }

  componentDidMount = async () => {
    const fileDetails = await AsyncStorage.getItem("fileDetails");
    if (fileDetails != null) {
      files = JSON.parse(fileDetails);
      this.setState({ fileUri: files.fileUri, fileNames: files.fileNames });
      //alert(files.fileNames[0])
    }
  };

  render() {
    const { fileUri, fileNames } = this.state;
    return fileNames.map((currentFile, index) => {
      return (
        <View key={index}>
          <TouchableHighlight style={{ paddingVertical: 15, paddingLeft: 5 }} onPress={()=>this.props.navigation.navigate("AnalysisScreen")}>
            <Text>{currentFile}</Text>
          </TouchableHighlight>
          <View style={{ height: 1, backgroundColor: "black" }}></View>
        </View>
      );
    });
  }
}
