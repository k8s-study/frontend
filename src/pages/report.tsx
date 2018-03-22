import LayoutDefault from '@layouts/default';
import { PanelHeader } from '@shared/now-ui-components';
import * as React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

export default class PageReport extends React.Component<{}, {}> {
    public render() {
        return (
            <LayoutDefault title="pongpong" url={this.props.url}>
                <PanelHeader size="sm" />
                <div className="content">
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Report</h5>
                                </CardHeader>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </LayoutDefault>
        );
    }
}
