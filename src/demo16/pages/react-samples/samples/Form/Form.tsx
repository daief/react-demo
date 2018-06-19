import * as React from 'react';
import './form.scss';

interface IFormProps {
  form: any;
}

interface IDynamicInputProps {
  type: string;
  onChange: any;
  value: any;
  options?: any[];
  label: string;
}

interface IFormItem {
  key: string;
  label: string;
  element: any;
  rules: object[];
  value?: any;
}

const schema: IFormItem[] = [
  {
    key: 'name',
    label: 'input name',
    element: {
      type: 'input',
    },
    rules: [{required: true, message: 'please input name'}],
  },
  {
    key: 'gender',
    label: 'select gender',
    element: {
      type: 'select',
      options: [
        {value: 'male', label: 'male'},
        {value: 'female', label: 'female'},
      ]
    },
    rules: [{required: true, message: 'please select gender'}],
  },
]

class DynamicInput extends React.Component<IDynamicInputProps, {}> {
  render() {
    const {type, value, onChange, options, label} = this.props;
    switch(type) {
      case 'input':
        return <input value={value} onChange={onChange} placeholder={label} />;
      case 'select':
        return (
          <select value={value} onChange={onChange}>
            <option value="">{label}</option>
            {
              options.map((op, idx) => {
                return <option key={idx} value={op.value}>{op.label}</option>
              })
            }
          </select>
        );
      default:
       return null;
    }
  }
}

export default class Form extends React.Component<IFormProps, {}> {
  render() {
    const {form} = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        {
          schema.map(item => {
            return getFieldDecorator(item.key, {
              rules: item.rules,
              validateTrigger: 'onChange',
              initialValue: item.value || '',
            })(
              <div key={item.key} className="form__item">
                <DynamicInput label={item.label} {...item.element} />
              </div>
            )
          })
        }
      </div>
    );
  }
};