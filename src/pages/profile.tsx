import { ICurrentUser } from '@common/types';
import LayoutDefault from '@layouts/default';
import { PanelHeader } from '@shared/now-ui-components';
import { IAuthProps, withAuth } from '@util/with-auth';
import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, Col, Row } from 'reactstrap';

interface IPageProfile extends IAuthProps {
    currentUser: ICurrentUser;
}

class PageProfile extends React.Component<IPageProfile, {}> {
    public render() {
        return (
            <LayoutDefault title="pongpong | Profile">
                <PanelHeader size="sm" />
                <div className="content">
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Profile</h5>
                                </CardHeader>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </LayoutDefault>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.currentUser,
});

export default connect(mapStateToProps)(withAuth(PageProfile));
