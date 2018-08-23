'use strict';
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import CityList from './IndexListView';

export default class SimpleSelectCity extends Component {
    static navigationOptions={
        title:'索引定位列表页'
    }
    constructor(props) {
        super(props);
        this.state = {
            showSearchResult: false,
            keyword: '',
            searchResultList: [],

            data:this.props.param,
        };

        console.log("this.props.rowHeight:",this.props.rowHeight===undefined);
    }

    onPressBack() {
        alert('你选择了返回====》header back');
    }

    onChanegeTextKeyword(newVal) {
        if (newVal === '') {
            this.setState({showSearchResult: false});
        } else {
            // 在这里过滤数据结果
            let dataList = this.filterCityData(newVal);

            this.setState({keyword: newVal, showSearchResult: true, searchResultList: dataList});
        }
    }

    filterCityData(text) {
        console.log('search for list', text);

        let rst = [];
        for (let idx = 0; idx < this.state.allCityList.length; idx++) {
            let item = this.state.allCityList[idx];
            if (item.name.indexOf(text) === 0 || item.spellName.indexOf(text) === 0) {
                rst.push(item);
            }
        }
        return rst;
    }

    onSelectCity(cityJson) {
        if (this.state.showSearchResult) {
            this.setState({showSearchResult: false, keyword: ''});
        }

        this.props.Show!==undefined&&this.props.Show(cityJson);
    }

    render() {
        return (
            <View style={styles.container}>
{/*
                <Header onPressBack={this.onPressBack.bind(this)} title="城市列表"/>
*/}

                    <View style={{flex: 1}}>
                        <CityList
                            onSelectCity={this.onSelectCity.bind(this)}
                            param={this.state.data}
                            rowHeight={this.props.rowHeight===undefined?60:this.props.rowHeight}
                            sectionHeight={this.props.sectionHeight===undefined?40:this.props.sectionHeight}
                            footerWarning={this.props.footerWarning}

                            footerIsHave={this.props.footerIsHave}
                            style={this.props.style!==undefined?this.props.style:{}}

                        />

                    </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
    },
    currentCity: {
        backgroundColor: '#ffffff',
        height: 20,
        margin: 5
    },
    currentCityText: {
        fontSize: 16
    }
});
