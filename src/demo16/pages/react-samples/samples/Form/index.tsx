import * as React from 'react';
import Form from './Form';
import { createForm } from 'rc-form';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps<{}> {
  form: any;
}

interface IState {
  errMsg: string;
}

@createForm()
export default class FormIndex extends React.Component<IProps, IState> {
  state = {
    errMsg: '',
  }

  handFormSubmit = () => {
    const {form} = this.props;

    form.validateFields((error: any, values: any) => {
      if (error) {
        const firstError = error[Object.keys(error).filter((_, index) => index === 0)[0]]
        if (firstError) {
          const errMsg = firstError.errors[0].message;
          this.setState({
            errMsg,
          });
        }
        return
      } else {
        // submit success
        this.setState({
          errMsg: '',
        });
        alert(`validate fields success: ${JSON.stringify(values)}`);
      }
    })
  }

  render() {
    const { form } = this.props;
    const { errMsg } = this.state;
    return (
      <div>
        <Form form={form} />
        <p>{errMsg}</p>
        <button onClick={this.handFormSubmit} style={buttonStyle}>edit</button>
      </div>
    );
  }
};

const buttonStyle: React.CSSProperties = {
  outline: 'none',
  border: '1px solid #111',
}