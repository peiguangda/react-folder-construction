import * as React from "react";
import { connect } from "react-redux";

// const mapStateToProps = (state: any) => ({
//   lang: state.lang,
// });

function mapStateToProps(state: any) {
  return { lang: state.lang };
}

interface Props {
  lang: Object;
  textKey: string;
}

class Trans extends React.Component<Props, {}> {
  render() {
    const { lang } = this.props;
    if (lang[this.props.textKey] !== undefined) {
      return lang[this.props.textKey];
    }
    return '';
  }
}

export default connect(mapStateToProps)(Trans);
