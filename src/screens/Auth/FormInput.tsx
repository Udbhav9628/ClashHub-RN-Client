import React from "react";
import { View, Text, TextInput } from "react-native";
import { COLORS, Dpheight, SIZES } from "../../constants/Theame";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const FormInput = ({
  containerStyle,
  label,
  Placeholder,
  prepandComponent,
  appendComponent,
  onchange,
  secureTextEntry,
  KeyboardType = "default",
  autocomplete = "off",
  autoCapatilize = "none",
  errorMsg = "",
  maxLength,
}: {
  containerStyle: object;
  label: string;
  Placeholder: any;
  prepandComponent: any;
  appendComponent: any;
  onchange: Function;
  autocomplete: any;
  secureTextEntry: any;
  KeyboardType: any;
  autoCapatilize: any;
  errorMsg: any;
  maxLength: any;
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
          style={{ color: COLORS.red, fontSize: SIZES.body4 }}
        >
          {errorMsg}
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
        {prepandComponent}
        <TextInput
          style={{
            flex: 1,
            color: COLORS.black
          }}
          placeholder={Placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={KeyboardType}
          autoCapitalize={autoCapatilize}
          autoComplete={autocomplete}
          maxLength={maxLength}
          onChangeText={(Value) => {
            const text = Value.replace(/\s{2,}/g, ' ').trim()
            onchange(text);
          }}
        />
        {appendComponent}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FormInput;
