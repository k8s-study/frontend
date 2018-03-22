import * as React from 'react';

interface IPanelHeaderProps {
    size?: string;
    content?: React.ReactNode;
}

class PanelHeader extends React.Component<IPanelHeaderProps, {}> {
    public render() {
        return (
            <div className={'panel-header ' + (this.props.size !== undefined ? 'panel-header-' + this.props.size : '')}>
                {this.props.content}
            </div>
        );
    }
}

export default PanelHeader;
