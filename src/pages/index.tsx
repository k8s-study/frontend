import { IReduxContext } from '@common/types';
import LayoutDefault from '@layouts/default';
import { addCount, initStore, serverRenderClock, startClock } from '@redux/store';
import { PanelHeader } from '@shared/now-ui-components';
import { IAuthProps, withAuth } from '@util/with-auth';
import * as withRedux from 'next-redux-wrapper';
import { SingletonRouter } from 'next/router';
import * as React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { bindActionCreators } from 'redux';

interface IPageIndexProps extends IAuthProps {}

class PageIndex extends React.Component<IPageIndexProps, {}> {
    public static async getInitialProps ({ store, isServer }: IReduxContext<any>): Promise<any> {
        store.dispatch(serverRenderClock(isServer));
        store.dispatch(addCount());
    }

    public render() {
        return (
            <LayoutDefault title="pongpong">
                <PanelHeader size="sm" />
                <div className="content">
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Dashboard</h5>
                                </CardHeader>
                                <CardBody>
                                    Hello!
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <a onClick={this.props.addCount}>add count {this.props.count}</a>
            </LayoutDefault>
        );
    }
}

const mapStateToProps = (state: any) => ({
    count: state.count,
});

const mapDispatchToProps = (dispatch) => {
    return {
        addCount: bindActionCreators(addCount, dispatch),
        startClock: bindActionCreators(startClock, dispatch),
    };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(withAuth(PageIndex));
