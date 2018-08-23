
import React, {Component} from 'react';

import {
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity,
    ListView,
    Dimensions,
    DeviceEventEmitter,
    NetInfo,
    NativeModules,
} from 'react-native';

import List from './Select';
import data from './test-data';

export default class MainComponent extends Component {
    static navigationOptions=({navigation}) => ({
        title:'测试',
    });
    constructor(props) {
        super(props);
    }

    Show(item){
        console.log("item",item);
        Alert.alert('Show你选择了城市====》' + item.id + '#####' + item.name);
    }

    render(){
        return(
            <View>
                <List
                    param={data}
                    Show={this.Show.bind(this)}
                    footerWarning={'您终于发现了我的底线了~'}

                    footerIsHave={true}
                    style={{
                        /*分组的组名高度*/
                        heightForSection:30,

                        /*分组的组名背景颜色*/
                        sectionBackgroundColor:'#F4F4F4',

                        /*分组组名字体大小*/
                        sectionFontSize:20,

                        /*分组组名字体颜色*/
                        sectionFontColor:'black',

                        /*分组组名左边距*/
                        sectionMarginLeft:5,

                        /*列表每一行的高度*/
                        heightForCell:60,

                        /*图片、标题左边距*/
                        imgMarginLeft:10,
                        textMarginLeft:10,

                        /*主标题字体大小及颜色*/
                        headTitleColor:'black',
                        headTitleFontSize:25,

                        /*索引的字体大小及颜色*/
                        letterFontSize:15,
                        letterFontColor:'#D0D0D0',

                        /*索引的右边距*/
                        letterMarginRight:10,

                        /*索引的上边距*/
                        letterMarginTop:40,

                        /*索引列表高度*/
                        letterHeight:500,
                        /*索引列表宽度*/
                        letterWidth:20,

                        /*图片的高度、宽度，*/
                        imageHeight:40,
                        imageWidth:40,

                        /*最底部的高度*/
                        'footerHeight':50,

                        /*最底部的文字的大小、颜色*/
                        'footerWarningFontSize':15,
                        'footerWarningColor':'#DCCCCC',
                    }}
                />
            </View>
        )
    }


}
