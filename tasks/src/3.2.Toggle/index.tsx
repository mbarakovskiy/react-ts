import React from 'react';
import ReactDom from 'react-dom';
import './styles.css';
import './toggle.css';

/**
    Допиши компонент Toggle.
    Пусть флаг хранится во внутреннем состоянии,
    а при изменении передается наружу через onChange.
 */

type ToggleProps = {
  onChange(value: boolean): void;
};

type ToggleState = {
    checked: boolean;
};

class Toggle extends React.Component<ToggleProps, ToggleState> {
    constructor(props: ToggleProps) {
        super(props);
        this.state = {
            checked: false
        };
    }

    render() {
      const checked = this.state;
      return (
          <span className={'container' + (checked ? ' isChecked' : '')} onClick={this.handleClick}>
            <span className="handle">
                <div className="bg" />
            <   span className="hinge" />
            </span>
        </span>
      );
  }

    handleClick = () => {
        const newChecked = !this.state.checked;
        if (this.props.onChange) {
            this.props.onChange(newChecked);
        }
        this.setState({
            checked: newChecked
        });
    };
}

ReactDom.render(
  <div className="page">
    <Toggle onChange={value => console.log(value)} /> Использовать умные компоненты
  </div>,
  document.getElementById('app')
);

/**
    Подсказки:
    - Начальное состояние компонента хранится в this.state и обычно инициируется в конструкторе.
    - Не забудь добавить super(props) первой строчкой конструктора, чтобы вызвать конструктор базового типа.
    - this.setState({property: value}) обновляет часть состояния и инициирует перерисовку.
 */
