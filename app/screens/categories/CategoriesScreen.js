import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { Header, Container, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import { strings } from '../../utils/i18n';
import { DataCall } from './DataCall';
import { LayoutUtil } from './LayoutUtil';
import { ImageRenderer } from './ImageRenderer';
import { ViewSelector } from './ViewSelector';
import styles from './styles';
import { HeaderBackNativeBase } from '../../components/Header';
import { getCategoryAction } from '../../actions/masterlist-actions';
import * as navigationActions from '../../actions/navigation-actions'
import GenericHeader from '../../components/Header/GenericHeader';

class CategoriesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2;
            }),
            layoutProvider: LayoutUtil.getLayoutProvider(1,40),
            images: [],
            count: 0,
            viewType: 0,
        };
        this.inProgressNetworkReq = false;
    }
    componentWillMount() {
        this.props.dispatch(getCategoryAction());
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.responseCategory !== this.props.responseCategory) {
            this.setState({
                dataProvider: this.state.dataProvider.cloneWithRows(
                    this.props.responseCategory
                ),
                count: this.props.responseCategory.length,
            });
        }
    }

    onPressCatagoryFilter = (id) => {
        let filters ={}
        filters["category"]=id;
        navigationActions.goToProductsTab({filters:filters});
      }

    rowRenderer = (type, data) => {
        //We have only one view type so not checks are needed here
        return <ImageRenderer imageUrl={data} onPressItem={()=>this.onPressCatagoryFilter(data.id)}/>;
    };
    // viewChangeHandler = viewType => {
    //     //We will create a new layout provider which will trigger context preservation maintaining the first visible index
    //     this.setState({
    //         layoutProvider: LayoutUtil.getLayoutProvider(viewType),
    //         viewType: viewType,
    //     });
    // };
    handleListEnd = () => {
        this.fetchMoreData();

        //This is necessary to ensure that activity indicator inside footer gets rendered. This is required given the implementation I have done in this sample
        this.setState({});
    };
    renderFooter = () => {
        //Second view makes sure we don't unnecessarily change height of the list on this event. That might cause indicator to remain invisible
        //The empty view can be removed once you've fetched all the data
        return this.inProgressNetworkReq
            ? <ActivityIndicator
                style={styles.csscreenActivityIndicator}
                size="large"
                color={'black'}
            />
            : <View style={styles.csscreenActivityIndicatorheight} />;
    };

    openDrawer = () => {
        this.props.navigation.navigate("DrawerOpen")
    }

    render() {
        //Only render RLV once you have the data
        return (
            <View style={styles.container}>
                {/* <ViewSelector
                    viewType={this.state.viewType}
                    viewChange={this.viewChangeHandler}
                /> */}
                <GenericHeader title={strings('categoriesScreen.categories_title')} />

                {this.state.count > 0
                    ? <RecyclerListView
                        // style={styles.csscreenActivityIndicatorlistview}
                        contentContainerStyle={{ margin: 15, backgroundColor: 'white', }}
                        dataProvider={this.state.dataProvider}
                        layoutProvider={this.state.layoutProvider}
                        rowRenderer={this.rowRenderer}
                        renderFooter={this.renderFooter}
                    />
                    : null}
                {/* onEndReached={this.handleListEnd} */}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.masterListR.error,
        responseCategory: state.masterListR.responseCategory
    };
}

export default connect(mapStateToProps)(CategoriesScreen)