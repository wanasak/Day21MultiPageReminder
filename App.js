import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    LayoutAnimation,
    View
} from "react-native";

import ReminderContainer from "./src/ReminderContainer";
import Util from "./src/utils";

export default class extends Component {
    constructor() {
        super();
        this.listData = [
            {
                title: "Scheduled",
                numOfItems: 0,
                theme: "#979797",
                list: []
            },
            {
                title: "Movie",
                numOfItems: 0,
                theme: "#cb7adf",
                list: []
            },
            {
                title: "Work",
                numOfItems: 0,
                theme: "#f9005f",
                list: []
            },
            {
                title: "Home",
                numOfItems: 0,
                theme: "#00a8f4",
                list: []
            },
            {
                title: "Reminder",
                numOfItems: 0,
                theme: "#68d746",
                list: []
            },
            {
                title: "Development",
                numOfItems: 6,
                theme: "#fe952b",
                list: [
                    {
                        selected: false,
                        text: "day20"
                    },
                    {
                        selected: false,
                        text: "day21"
                    },
                    {
                        selected: false,
                        text: "day22"
                    },
                    {
                        selected: false,
                        text: "day23"
                    },
                    {
                        selected: false,
                        text: "day24"
                    },
                    {
                        selected: false,
                        text: "day25"
                    }
                ]
            }
        ];
        this.animation = {
            duration: 200,
            create: {
                type: LayoutAnimation.Types.linear
            },
            update: {
                type: LayoutAnimation.Types.linear,
                springDamping: 0.5
            }
        };
        this.state = {
            isOn: this.isOn,
            init: true
        };
    }

    _swith(index) {
        let isOn = this.listData.map(() => {
            return false;
        });
        isOn[index] = true;
        this.setState({
            isOn,
            init: false
        });
        LayoutAnimation.configureNext(this.animation);
    }

    _reset() {
        const isOn = this.listData.map(() => {
            return false;
        });
        this.setState({
            isOn,
            init: true
        });
        LayoutAnimation.configureNext(this.animation);
    }

    render() {
        const len = this.listData.length;
        const lists = this.listData.map((elm, index) => {
            return (
                <ReminderContainer
                    switch={() => this._swith(index)}
                    key={"list" + index}
                    listData={elm}
                    listStyle={
                        this.state.init
                            ? { top: 20 + index * 65 }
                            : {
                                  top: this.state.isOn[index]
                                      ? 20
                                      : Util.size.height + 5 * index - 5 * len
                              }
                    }
                />
            );
        });

        return (
            <View style={styles.container}>
                <Image source={{ uri: "desktop" }} style={styles.container} />
                {lists}
                <TouchableHighlight
                    underlayColor="transparent"
                    style={styles.reset}
                    onPress={() => this._reset()}
                >
                    <View />
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Util.size.width,
        height: Util.size.height
    },
    reset: {
        height: 30,
        width: Util.size.width,
        bottom: 0,
        left: 0,
        position: "absolute"
    }
});
