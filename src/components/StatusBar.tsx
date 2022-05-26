import { StatusBar } from 'react-native'
import React from 'react'

const StatusBarComp = () => {
    return (
        <StatusBar
            animated={true}
            barStyle="dark-content"
            hidden={false} />
    )
}

export default StatusBarComp