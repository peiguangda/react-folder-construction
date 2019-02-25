import * as React from "react";
import { reduxForm, Field, InjectedFormProps, formValues, getFormValues } from 'redux-form';
import Trans from "../../../modules/trans";
import { translate } from '../../../helpers/Translate';
import validate  from '../../../common/validate/validate';
import { assign } from "lodash";

import { Editor } from '@tinymce/tinymce-react';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CustomProps {
    lang: Object;
}

interface State {
    isDirtyEditor: Boolean
}

class UserForm extends React.Component<CustomProps & InjectedFormProps<{}, CustomProps> & State> {
    private renderField = (props) =>{
        const {input, type, meta: { touched, error }, className, rows, lang} = props;
        let classInput = className;
        if(touched && error){
            classInput = className + ' has-error';
        }
        return(
            <div>
                <input {...input} type={type} className={classInput} rows={rows}/>
                {touched && ((error && <span className="error-message">{translate(lang, error)}</span>))}
            </div>
        )
    }

    renderEditor = (field) => {
        const editorConfig = {
            menubar:false,
            toolbar: false,
            statusbar: false,
            plugins: "autoresize",
            autoresize_bottom_margin: 0,
            autoresize_min_height: 150,
            setup: function(editor) {
                editor.on('focusIn', function(e) {
                    const element = document.getElementById("mceu_0-body");
                    element.classList.add("custom-border");
                });
                editor.on('focusOut', function(e) {
                    const element = document.getElementById("mceu_0-body");
                    element.classList.remove("custom-border");
                  });
                editor.on('Dirty', function(e) {
                    this.setState({isDirtyEditor: true});
                });
              }
        };
        const props = assign({}, field);      
        return (
            <div className="custom-editor">
                <Editor
                    {...props}
                    apiKey="ism300rhzit6hezxg8vm56onj3gwa5r92wvsb50yv13vmaew"
                    value={props.input.value}
                    onBlur={(event) => { field.input.onChange(event.target.getContent()); }}
                    init={editorConfig}
                />
            </div>
        );
    }

    render() {
      const { pristine, submitting, reset, handleSubmit, lang } = this.props;
      return (
        <form onSubmit={handleSubmit}>
            <div className="row mt-3">
                <div className="col-md-2 col-xs-2"><Trans textKey={'name'}/></div>
                <div className="col-md-5 col-xs-5">
                    <Field
                        name="name"
                        component={this.renderField}
                        type="text"
                        label={translate(lang, 'name')}
                        className="form-control"
                        lang={lang}
                    />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-2 col-xs-2"><Trans textKey={'age'}/></div>
                <div className="col-md-5 col-xs-5">
                    <Field
                        name="age"
                        component={this.renderField}
                        type="number"
                        label={translate(lang, 'age')}
                        className="form-control"
                        lang={lang}
                    />
                </div>
            </div>
            {/* CKEditor */}
            <div className="row mt-3">
                <div className="col-md-2 col-xs-2"><Trans textKey={'comment'}/></div>
                <div className="col-md-10 col-xs-10">
                    <Field
                        name="comment"
                        component={this.renderEditor}
                        className="form-control"
                    />
                </div>
            </div>
            {/* End CKEditor */}
            <div className="row mt-3 mb-3">
                <div className="col-12 text-center">
                    <input
                        className="btn btn-outline-dark"
                        type="submit"
                        value={translate(lang, 'registerBtn')}
                        disabled={pristine || submitting}
                    />
                    <input
                        className="btn btn-outline-dark button-mgr-left"
                        type="reset"
                        value={translate(lang, 'cancelBtn')}
                        disabled={pristine || submitting}
                        onClick={reset}
                    />
                </div>
            </div>
        </form>
      );
    }
  }

export default reduxForm<{}, CustomProps>({
    form: 'userForm',
    validate
})(UserForm);
