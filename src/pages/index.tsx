import LayoutDefault from '@layouts/default';
import { PanelHeader } from '@shared/now-ui-components';
import { SingletonRouter } from 'next/router';
import * as React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

interface IPageIndexProps {
    url: SingletonRouter;
}

export default class PageIndex extends React.Component<IPageIndexProps, {}> {
    public render() {
        return (
            <LayoutDefault title="pongpong" url={this.props.url}>
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
            </LayoutDefault>
        );
    }
}
