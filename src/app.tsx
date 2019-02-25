import * as React from 'react';
import { connect } from 'react-redux';
import { GatewayProvider } from 'react-gateway';
import { State } from './redux/reducers';
import { ApiEntity } from './common/types'
import { fetchTextAction } from './modules/trans/reducer';
import 'toastr/build/toastr.min.css';
import 'core-js';

export interface Props {
  api: ApiEntity;
  lang: object;
  fetchText(): void;    
}

class AppContainer extends React.Component<Props, {}> {

  constructor(props) {
    super(props);
}

  public componentWillMount() {
    this.props.fetchText();
  }

  public render() {
    return (
      <GatewayProvider>
        <div>
          {this.props.children}
        </div>
      </GatewayProvider>
    );
  }
}

const mapStateToProps = (state: State) => ({
  api: state.api,
  lang: state.lang
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchText: () => dispatch(fetchTextAction())
});

export const App = connect(
  mapStateToProps,
  mapDispatchToProps 
)(AppContainer);

