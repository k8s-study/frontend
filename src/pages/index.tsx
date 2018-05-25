import LayoutDefault from '@layouts/default';
import { PanelHeader } from '@shared/now-ui-components';
import { IAuthProps, withAuth } from '@util/with-auth';
import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class PageIndex extends React.Component<IAuthProps, {}> {
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
            </LayoutDefault>
        );
    }
}

export default connect()(withAuth(PageIndex));
