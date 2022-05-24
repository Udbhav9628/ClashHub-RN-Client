import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SIZES, COLORS } from "../constants/Theame";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Join_Match_action } from "../store/Match/Matchaction";

const BottomPopup = ({
  modalVisible,
  setModalVisible,
  MatchId,
  Disable,
  setDisable,
}: {
  modalVisible: any;
  setModalVisible: any;
  MatchId: any;
  Disable: boolean;
  setDisable: Function;
}) => {
  const { loading } = useSelector((state: any) => state.Join_Match_Reducer);

  const dispatch = useDispatch();
  const Join_Match_Action_Func = bindActionCreators(
    Join_Match_action,
    dispatch
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        <View
          style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: COLORS.black,
              }}
            >
              Pay And Join Match
            </Text>
          </View>
          <Text
            style={{
              marginTop: 15,
              fontSize: 30,
              fontWeight: "bold",
              color: COLORS.black,
            }}
          >
            &#x20B9; 10
          </Text>
          <TouchableOpacity
            onPress={() => {
              Join_Match_Action_Func(MatchId, "10");
              setDisable(true);
            }}
            disabled={Disable}
            style={{
              height: 55,
              width: 100,
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.padding,
              marginBottom: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: Disable
                ? COLORS.transparentPrimray
                : COLORS.primary,
              marginHorizontal: SIZES.padding,
            }}
          >
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Pay
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    position: "absolute",
    bottom: 2,
    left: 2,
    right: 2,
    margin: 20,
    height: 200,
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    padding: 5,
    shadowColor: COLORS.black,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default BottomPopup;
