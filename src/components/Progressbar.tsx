import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, Dpheight, FONTS } from '../constants/Theame';

const Progressbar = ({ step, totalsteps, Height }: {
    step: number;
    totalsteps: number;
    Height: any;
}) => {
    const [width, setwidth] = useState(0);
    const animatedValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-1000)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, []);

    useEffect(() => {
        reactive.setValue(-width + (width * step) / totalsteps);
    }, [step, width])

    return (
        <View style={{
            marginVertical: 3
        }}>
            <Text style={{
                ...FONTS.body5, fontWeight: "700", color: COLORS.black,
                marginBottom: Dpheight(0.7)
            }} >
                Slots {step}/{totalsteps}
            </Text>
            <View style={{
                overflow: 'hidden',
                borderRadius: Height,
                height: Height,
                backgroundColor: 'rgba(0,0,0,0.1)'
            }}>
                <Animated.View onLayout={e => {
                    const newwidth = e.nativeEvent.layout.width;
                    setwidth(newwidth)
                }}
                    style={{
                        width: '100%',
                        borderRadius: Height,
                        height: Height,
                        backgroundColor: COLORS.primary,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        transform: [{
                            translateX: animatedValue
                        }]
                    }}>
                </Animated.View>
            </View>
        </View>
    )
}

export default Progressbar

const styles = StyleSheet.create({})