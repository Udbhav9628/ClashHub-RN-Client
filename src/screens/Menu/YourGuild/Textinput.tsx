import React from "react";
import { View, Text, TextInput } from "react-native";
import { COLORS, Dpheight, SIZES } from "../../../constants/Theame";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Textinput = ({
  containerStyle,
  label,
  Placeholder,
  onchange,
  maxLength,
  KeyboardType = "default",
  autoCapatilize = "none",
  Msg = "",
}: {
  containerStyle: object;
  label: string;
  Placeholder: any;
  onchange: Function;
  maxLength: number;
  KeyboardType: any;
  autoCapatilize: any;
  Msg: any;
}) => {
  return (
    <KeyboardAwareScrollView
      keyboardDismissMode="on-drag"
      contentContainerStyle={{ ...containerStyle }}
    >
      {/* Label and Erros Msg Section*/}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{ color: COLORS.gray, fontSize: SIZES.body3 }}
        >
          {label}
        </Text>
        <Text
          style={{ color: COLORS.gray, fontSize: SIZES.body3 }}
        >
          {Msg}
        </Text>
      </View>

      {/*Text Input Section*/}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          height: Dpheight(7),
          marginTop: SIZES.base,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: COLORS.black
          }}
          maxLength={maxLength}
          placeholder={Placeholder}
          placeholderTextColor={COLORS.black}
          keyboardType={KeyboardType}
          autoCapitalize={autoCapatilize}
          onChangeText={(Value) => {
            const text = Value.replace(/\s{2,}/g, ' ').trim()
            onchange(text);
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Textinput;
