import * as React from "react";
import { ApiEntity } from "../../../common/types";
import { Helmet } from "react-helmet";
import { translate } from "../../../helpers/Translate";
import {
  UserEntity,
  ReturnId,
  NotiFicationInterface,
  UserInfo
} from "../types";
import UserForm from "./UserForm";
import RowTable from "./RowTable";
import { LIMIT_RECORD } from "../../../common/constants";
import { find } from "lodash";
import { reset } from "redux-form";
import * as toastr from "toastr";
// import SweetAlert from "react-bootstrap-sweetalert";
import SweetAlert from 'sweetalert2-react';

export interface Props {
  api: ApiEntity;
  lang: Object;
  fetchUsers(parameters): Promise<any>;
  addUser(parameters): Promise<UserEntity>;
  countUpAge(parameters): Promise<ReturnId>;
  deleteUser(parameters): Promise<ReturnId>;
}

export interface State {
  alert: any;
  displayData: UserInfo[];
  totalRecord: number;
}

export class UserPage extends React.Component<Props, State, {}> {
  private pageIndex: number;
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      displayData: [],
      totalRecord: 0,
    };
    this.pageIndex = 1;
  }

  public componentDidMount() {
    // Call api get list data
    const { fetchUsers } = this.props;
    fetchUsers({ pageIndex: this.pageIndex }).then(res => {
      this.getListData(res);
    });
  }

  public componentWillReceiveProps(newProps) {
    const { user } = newProps;
    if (
      user.actionType === "user/ADD_USER" ||
      user.actionType === "user/COUNT_UP_AGE" ||
      user.actionType === "user/COUNT_UP_AGE_ERROR" ||
      user.actionType === "user/DELETE_USER" ||
      user.actionType === "user/DELETE_USER_ERROR"
    ) {
      // Reload List User
      this.reloadListUser();
    }
  }

  private loadMore = () => {
    const { fetchUsers } = this.props;
    this.pageIndex = this.pageIndex + 1;
    fetchUsers({ pageIndex: this.pageIndex }).then(res => {
      this.getListData(res);
    });
  };

  // Action show Alert
  private showAlert = (message, callBack) => {
    const { lang } = this.props;
    const getAlert = (
      <SweetAlert
        show={true}
        title={translate(lang, "areYouSure")}
        text={translate(lang, message)}
        showCancelButton= {true}
        onCanCel={() => this.onCancelAlert()}
        onConfirm={() => callBack()}
        reverseButtons={true}
        allowOutsideClick={() => this.onCancelAlert()}
      />
    );

    this.setState({
      alert: getAlert
    });
  };

  // Action Hide Alert
  private onCancelAlert = () => {
    this.setState({
      alert: null
    });
  };

  // Action Show notifi when action success/error
  private showNoti = (option: NotiFicationInterface) => {
    const { lang } = this.props;
    toastr[option.type](
      translate(lang, option.message),
      translate(lang, option.title),
      {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        timeOut: 2000
      }
    );
  };

  // Get Curent Page
  private getCurrentPage = () => {
    const { displayData } = this.state;
    let currentPage = 1;
    const pageFloor = Math.floor(displayData.length / LIMIT_RECORD);
    if (displayData.length % LIMIT_RECORD == 0) {
      currentPage = pageFloor;
    } else {
      currentPage = pageFloor + 1;
    }
    return currentPage;
  };

  private getObjectByKey = (item, keyName) => {
    return find(item.info, function(o) {
      return o.key == keyName;
    });
  };

  private reloadListUser = () => {
    const { fetchUsers } = this.props;
    this.pageIndex = 1;
    fetchUsers({ pageIndex: this.pageIndex }).then(res => {
      this.getListData(res);
    });
  };

  private countUpAge = item => {
    const objAge = this.getObjectByKey(item, "age");
    const { countUpAge } = this.props;
    countUpAge({ id: item.key, age: parseInt(objAge.value) })
      .then(res => {
        // Close Alert when success
        this.onCancelAlert();

        // Show noti when countUp Success
        this.showNoti({
          type: "success",
          title: "successTitle",
          message: "ageUpSuccess"
        });
      })
      .catch(err => {
        // Close Alert when success
        this.onCancelAlert();

        // Show noti when countUp Error
        this.showNoti({
          type: "error",
          title: "errorTitle",
          message: "countUpAgeError"
        });
      });
  };

  private actionDeleteUser = (userId: number) => {
    const { deleteUser } = this.props;

    deleteUser({ id: userId })
      .then(res => {
        // Close Alert when success
        this.onCancelAlert();

        // Show noti when Delete Success
        this.showNoti({
          type: "success",
          title: "successTitle",
          message: "deleteUserSuccess"
        });
      })
      .catch(err => {
        // Close Alert when success
        this.onCancelAlert();

        // Show noti when delete Error
        this.showNoti({
          type: "error",
          title: "errorTitle",
          message: "deleteUserError"
        });
      });
  };

  private addUser = (userData, dispatch) => {
    const { addUser } = this.props;
    userData.age = parseInt(userData.age);
    userData.name = userData.name.trim();

    addUser(userData)
      .then(res => {
        // Clear form after submit success
        dispatch(reset("userForm"));

        // Show noti when add user Success
        this.showNoti({
          type: "success",
          title: "successTitle",
          message: "addUserSuccess"
        });
      })
      .catch(err => {
        // Show noti when add user Error
        this.showNoti({
          type: "error",
          title: "errorTitle",
          message: "addUserError"
        });
      });
  };

  private getListData = res => {
    // const { displayData } = this.state;
    const listData = res.users;
    this.setState({ displayData: listData, totalRecord: res.totalRecord });
  };

  public render() {
    const { lang } = this.props;
    const { displayData, totalRecord } = this.state;
    // Check Enable/Disable Button Load More
    let disabledBtn = true;
    if (displayData.length < totalRecord) {
      disabledBtn = false;
    } else {
      disabledBtn = true;
    }
    return (
      <div className="container border border-secondary mt-1 p-5">
        <Helmet title={translate(lang, "member")} />
        {/* Show alert confirm when countupage or delete user */}
        {this.state.alert}

        {/* Start Form */}
        <UserForm onSubmit={this.addUser} lang={lang} />
        {/* End Form */}

        <div className="row clear border-bottom" />
        {/* Show list Data */}
        <div>
          {displayData.map(v => (
            <RowTable
              key={v.key}
              item={v}
              countUpAge={() =>
                this.showAlert("upAgeUser", () => this.countUpAge(v))
              }
              deleteUser={() =>
                this.showAlert("deleteUser", () => this.actionDeleteUser(v.key))
              }
              lang={lang}
            />
          ))}
        </div>
        <div className="row pt-5">
          <div className="col-md-12 col-xs-12 text-center">
            <input
              className="btn btn-outline-dark"
              type="button"
              value={translate(lang, "loadMoreBtn")}
              onClick={this.loadMore}
              disabled={disabledBtn}
            />
          </div>
        </div>
      </div>
    );
  }
}
