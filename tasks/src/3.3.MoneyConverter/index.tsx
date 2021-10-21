import React, {FC} from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
    Допиши конвертер валют.
    - Если пользователь ввел значение в рублях, то количество евро обновляется согласно курсу
    - Если пользователь ввел значение в евро, то количество рублей обновляется согласно курсу
 */

const RUBLES_IN_ONE_EURO = 70;

type MoneyConverterState = {
  valueInRubles: number;
  valueInEuros: number;
};

class MoneyConverter extends React.Component<{}, MoneyConverterState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      valueInRubles: 0,
      valueInEuros: 0
    };
  }

  render() {
    return (
      <div className="root">
        <div className="form">
          <h2>Конвертер валют</h2>
          <div>
            <span>&#8381;</span>
            <Money value={this.state.valueInRubles} onChange={this.handleChangeRubles} />
            &mdash;
            <Money value={this.state.valueInEuros} onChange={this.handleChangeEuros} />
            <span>&euro;</span>
          </div>
        </div>
      </div>
    );
  }

  handleChangeRubles = (value: number) => {
    this.setState({
      valueInRubles: value,
      valueInEuros: Math.round((100 * value) / RUBLES_IN_ONE_EURO) / 100
    });
  };

  handleChangeEuros = (value: number) => {
    this.setState({
      valueInRubles: Math.round(100 * value * RUBLES_IN_ONE_EURO) / 100,
      valueInEuros: value
    });
  };
}

type MoneyProps = {
  value: number;
  onChange(value: number): void;
};
const Money: FC<MoneyProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(extractNumberString(event.target.value));
  };

  return <input type="text" value={value} onChange={handleChange} />;
};

function extractNumberString(value: string): number {
  const str = value.replace(/^0+/g, '').replace(/[^.0-9]/g, '');
  const parts = str.split('.');
  return Number(parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str);
}

ReactDom.render(<MoneyConverter />, document.getElementById('app'));

/**
    Подсказки:
    - Сейчас каждый компонент Money хранит свое значение в собственном состоянии,
      чтобы конвертер работал, нужно уметь обновлять значение извне, поэтому нужно получать его из props.
    - В MoneyConverter наоборот надо создать состояние, которое будет хранить значения в обеих валютах.
      Таким образом ты сделаешь Lift State Up.
    - Заметь, что компонент Money теперь не содержит состояние и его можно переделать в функциональный компонент.
 */
