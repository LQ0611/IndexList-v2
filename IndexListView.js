'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ListView,
    Dimensions,
    Image,
    FlatList,
    Alert,
    ScrollView,
} from 'react-native';

import Toast, {DURATION} from './ToastUtil';
import { LargeList } from "react-native-largelist";

var totalheight = []; //每个字母对应的城市和字母的总高度

const {width, height} = Dimensions.get('window');

var that;

//const key_now = '当前';
//const key_last_visit = '最近';
//const key_hot = '热门';

export default class CityIndexListView extends Component {

    selectedIndex=0;
    constructor(props) {

        super(props);

        console.log("props:",this.props)
       // let CURRENT_CITY_LIST = this.props.nowCityList;
        //let LAST_VISIT_CITY_LIST = this.props.lastVisitCityList;
        //let HOT_CITY_LIST = this.props.hotCityList;

        this.state = {
            contacts:this.props.param.contacts,

            /*分组的组名高度*/
            heightForSection:this.props.style.sectionHeight===undefined?30:this.props.style.sectionHeight,

            /*分组的组名背景颜色*/
            sectionBackgroundColor:this.props.style.sectionBackgroundColor===undefined?'#F4F4F4':this.props.style.sectionBackgroundColor,

            /*分组组名字体大小*/
            sectionFontSize:this.props.style.sectionFontSize===undefined?20:this.props.style.sectionFontSize,

            /*分组组名字体颜色*/
            sectionFontColor:this.props.style.sectionFontColor===undefined?'black':this.props.style.sectionFontColor,

            /*分组组名左边距*/
            sectionMarginLeft:this.props.style.sectionMarginLeft===undefined?5:this.props.style.sectionMarginLeft,

            /*列表每一行的高度*/
            heightForCell:this.props.style.rowHeight===undefined?60:this.props.style.rowHeight,

            /*图片、标题左边距*/
            imgMarginLeft:this.props.style.imgMarginLeft===undefined?10:this.props.style.imgMarginLeft,
            textMarginLeft:this.props.style.textMarginLeft===undefined?10:this.props.style.textMarginLeft,

            /*主标题字体大小及颜色*/
            headTitleColor:this.props.style.headTitleColor===undefined?'black':this.props.style.headTitleColor,
            headTitleFontSize:this.props.style.headTitleFontSize===undefined?25:this.props.style.headTitleFontSize,

            /*索引的字体大小及颜色*/
            letterFontSize:this.props.style.letterFontSize===undefined?height * 1.1 / 50:this.props.style.letterFontSize,
            letterFontColor:this.props.style.letterFontColor===undefined?'#D0D0D0':this.props.style.letterFontColor,

            /*索引的右边距*/
            letterMarginRight:this.props.style.letterMarginRight===undefined?10:this.props.style.letterMarginRight,

            /*索引的上边距*/
            letterMarginTop:this.props.style.letterMarginTop===undefined?10:this.props.style.letterMarginTop,

            /*索引列表高度*/
            letterHeight:this.props.style.letterHeight===undefined?(height-100) * 4 / 100:this.props.style.letterHeight,
            /*索引列表宽度*/
            letterWidth:this.props.style.letterWidth===undefined?width * 4 / 50:this.props.style.letterWidth,

            /*是否有列表尾部组件   */
            footerIsHave:this.props.footerIsHave===undefined?false:this.props.footerIsHave,

            /*到最底部时提示字*/
            footerWarning:this.props.footerWarning===undefined?'您终于发现了我的底线~':this.props.footerWarning,

            /*最底部的高度*/
            footerHeight:this.props.style.footerHeight===undefined?50:this.props.style.footerHeight,

            /*最底部的文字的大小、颜色*/
            footerWarningFontSize:this.props.style.footerWarningFontSize===undefined?15:this.props.style.footerWarningFontSize,
            footerWarningColor:this.props.style.footerWarningColor===undefined?'#DCCCCC':this.props.style.footerWarningColor,

            /*图片的高度、宽度，在主体代码中设置，imageHeight，imageWidth*/
        };

        console.log("this.state:",this.state)

        let dataBlob = {};
        //dataBlob[key_now] = CURRENT_CITY_LIST;
        //dataBlob[key_last_visit] = LAST_VISIT_CITY_LIST;
       // dataBlob[key_hot] = HOT_CITY_LIST;

        //this.props.titleData.map((name,key)=>dataBlob[key]=this.props.data.key)

        this.state.contacts.map(contacts => {
            let key = contacts.header.toUpperCase();

            if (dataBlob[key]) {
                let subList = dataBlob[key];
                subList.push(contacts);
            } else {
                let subList = [];
                subList.push(contacts);
                dataBlob[key] = subList;
            }
        });

        let sectionIDs = Object.keys(dataBlob);

        /*计算高度*/
        let rowIDs = sectionIDs.map((sectionID,i) => {
            let thisRow = [];
            let count = this.state.contacts[i].info.length;
            console.log("count:",count);
            for (let ii = 0; ii < count; ii++) {
                thisRow.push(ii);
            }

            let eachheight = this.state.heightForSection + this.state.heightForCell * thisRow.length;
            //if (sectionID === key_hot || sectionID === key_now || sectionID === key_last_visit) {

            totalheight.push(eachheight);

            return thisRow;
        });



        that = this;
    }


/*点击事件*/
    _cityNameClick(item) {
            this.props.onSelectCity(item);
    }
/*滚动事件*/
    _scrollTo(index, letter) {
        this.refs.toast.close();
        let position = 0;
        for (let i = 0; i < index; i++) {
            position += totalheight[i]
        }

        console.log("position",position)
        this._listView.scrollTo({x:0,y:position+5}) ;
        this.refs.toast.show(letter, DURATION.LENGTH_SHORT);
    }


/*主体数据展示*/
    _renderItem (section: number, row: number){
        const contact=this.state.contacts[section];

        return (
            <View style={{ flex: 1 }}>

                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity  onPress={()=>this._cityNameClick(contact.info[row])}>
                        <View style={{ flexDirection: "row", alignItems: "center" ,width:width}}>
{/*图片*/}
                            <View style={{marginLeft:this.state.imgMarginLeft}}>
                                <Image
                                    source={contact.info[row].image}
                                    style={{
                                        width:this.props.style.imageWidth===undefined?
                                            this.state. heightForCell-15:this.props.style.imageWidth,
                                        height:this.props.style.imageHeight===undefined?
                                            this.state. heightForCell-15:this.props.style.imageHeight,
                                    }}
                                />
                            </View>
                            {/*标题*/}
                                <Text style={{
                                    color:this.state.headTitleColor,
                                    fontSize: this.state.headTitleFontSize,
                                    marginLeft: this.state.textMarginLeft }}>
                                    {contact.info[row].name}
                                </Text>

                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        );
    };

/*组名*/
    renderSection(section){

        const contact=this.state.contacts[section];
        return(
            <View style={{
                width:width,
                height:this.state.heightForSection,
                backgroundColor:this.state.sectionBackgroundColor,
                flexDirection: "row",
                alignItems: "center",
            }}>
            <Text style={{
                marginLeft:this.state.sectionMarginLeft,
                fontSize:this.state.sectionFontSize,
                color:this.state.sectionFontColor,
            }}>{contact.header}</Text>
            </View>
        )
    }
/*右侧索引*/
    _renderRightLetters(letter, index) {
        return (
            <TouchableOpacity key={'letter_idx_' + index} activeOpacity={0.6} onPress={() => {
                this._scrollTo(index, letter.header)
            }}>
                <View style={{
                    width: this.state.letterWidth,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: this.state.letterFontSize,
                        color: this.state.letterFontColor,
                    }}>{letter.header}</Text>
                </View>
            </TouchableOpacity>
        );
    }
/*列表尾部提示*/
    renderFooter(){
        return(
            this.state.footerIsHave&&
            <View style={{
                height:this.state.footerHeight,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center'}}>
                <Text style={{
                    fontSize:this.state.footerWarningFontSize,
                    color:this.state.footerWarningColor
                }}>
                    {this.state.footerWarning}
                </Text>
            </View>
        )
    }

    render() {
        console.log("this.state.letterheight:",this.state.letterHeight)
        return (
            <View style={styles.container}>
                <View style={styles.listContainner}>
                    <View>
                    {/*数据*/}
                       <LargeList

                           style={{ width:width,height:height-70,}}
                           ref={ref => (this._listView = ref)}
                           reloadData={this.state.contacts}
                           numberOfSections={()=>this.state.contacts.length}
                           numberOfRowsInSection={section => this.state.contacts[section].info.length}
                           heightForCell={()=>this.state.heightForCell}
                           heightForSection={()=>this.state.heightForSection}
                           renderSection={this.renderSection.bind(this)}
                           renderCell={this._renderItem.bind(this)}

                           renderFooter={this.renderFooter.bind(this)}
                          />

                    </View>
                    {/*索引*/}
                    <ScrollView style={{
                        position: 'absolute',
                        height: this.state.letterHeight,
                        top: this.state.letterMarginTop,
                        bottom: 0,
                        right: this.state.letterMarginRight,
                        backgroundColor: 'transparent',

                        // alignItems: 'center',
                        //justifyContent: 'center'
                    }}>
                        {this.state.contacts.map((letter,index)=>this._renderRightLetters(letter,index))}
                    </ScrollView>

                </View>

                <Toast ref="toast" position='top' positionValue={200} fadeInDuration={750} fadeOutDuration={1000}
                       opacity={0.8}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: 50,

    },
    listContainner: {

        marginBottom: 10,
        flexDirection: "row",
    },
    contentContainer: {
        flexDirection: 'row',
        width: width,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        height:height,
       // flexWrap:"wrap",

    },
    letters: {
        position: 'absolute',
        height: height-150,
        top: 50,
        bottom: 0,
        right: 10,
        backgroundColor: 'transparent',

       // alignItems: 'center',
        //justifyContent: 'center'
    },
    letter: {
        height: (height-100) * 4 / 100,
        width: width * 4 / 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionView: {
        paddingTop: 5,
        paddingBottom: 5,
        height: 30,
        paddingLeft: 10,
        width: width,
        backgroundColor: '#F4F4F4'
    },
    sectionText: {
        color: '#D0D0D0',
        fontWeight: 'bold'
    },

    rowdata: {
        paddingTop: 10,
        paddingBottom: 2,
    },

    rowdatatext: {
        color: 'gray',
        width: width
    },

    rowdataBox: {
        borderWidth: 1,
        borderColor: '#DBDBDB',
        marginTop: 5,
        marginBottom: 5,
        paddingBottom: 2,
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowDataTextBox: {
        marginTop: 5,
        flex: 1,
        height: 20
    }

});
