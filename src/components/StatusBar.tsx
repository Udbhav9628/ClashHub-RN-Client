import { StatusBar } from 'react-native'
import React from 'react'
import { COLORS } from "../constants/Theame";

const StatusBarComp = () => {
    return (
        <StatusBar
            animated={true}
            backgroundColor={COLORS.white}
            barStyle="dark-content"
            hidden={false} />
    )
}

export default StatusBarComp