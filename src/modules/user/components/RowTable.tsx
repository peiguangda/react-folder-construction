import * as React from "react";
import { translate } from '../../../helpers/Translate';
import { find } from "lodash";

export interface Props {
  item: any;
  countUpAge(item): void;
  deleteUser(id): void;
  lang: Object;
}

export default class RowTable extends React.Component<Props, {}> {
    private getObjectByKey = (item, keyName) =>{
        return find(item.info , function(o) { return o.key == keyName; });
    }
    public render() {
        const { item, countUpAge, deleteUser, lang } = this.props;
        const objName = this.getObjectByKey(item, 'name');
        const objAge = this.getObjectByKey(item, 'age');
        const objComment = this.getObjectByKey(item, 'comment');
        let disabledCountUp = false;
        if(parseInt(objAge.value) >= 999){
            disabledCountUp = true;
        }
        return (
            <div className="row pt-3 pb-3 border-bottom">
                <div className="col-md-4 col-xs-4 text-justify">
                    {objName.value} ({objAge.value})
                </div>
                <div className="col-md-6 col-xs-6 text-justify break-work" dangerouslySetInnerHTML={{
                __html: objComment.value
                }}>
                </div>
                <div className="col-md-2 col-xs-2 text-center">
                    <input className="btn btn-outline-dark" type="button" value="+1" disabled ={disabledCountUp} onClick={()=> countUpAge(item)}/>
                    <input className="btn btn-outline-dark button-mgr-left" type="button" value={translate(lang, 'deleteBtn')} onClick={()=> deleteUser(item.key)}/>
                </div>
            </div>
        );
    }
}
  
