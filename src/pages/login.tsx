import LayoutDefault from '@layouts/default';
import { PanelHeader } from '@shared/now-ui-components';
import * as React from 'react';
import { Card, CardHeader, Col, Row } from 'reactstrap';

export default class PageLogin extends React.Component<{}, {}> {
    public render() {
        return (
            <LayoutDefault title="pongpong">
                <PanelHeader size="sm" />
                <div className="content">
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Login</h5>
                                </CardHeader>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </LayoutDefault>
        );
    }
}
