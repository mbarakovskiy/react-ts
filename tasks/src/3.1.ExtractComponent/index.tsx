import React, { FC } from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
    1. Переделай renderPost в функциональный компонент Post
       Для этого используй тип FC

    2. ESLint настроен так, чтобы проверять переданные атрибуты.
       У нас везде атрибуты — это строки. Сделай свойства author и time обязательными.

    3. Сделай так, чтобы в author подставлялось значение <Неизвестный автор>,
       если атрибут не передали.
       Проверь что работает, убрав имя автора.

    4. Переделай компонент так, чтобы message передавался через props.children.
 */
type PostProps = {
  author?: string;
  time: string;
};

const Post: FC<PostProps> = ({ author = '<Неизвестный автор>', time, children }) => {
    return (
        <div className="post">
            <div className="postHeader">
                <span className="postAuthor">{author}</span>
                <br />
                <span className="postTime">{time}</span>
            </div>
            <div className="postMessage">{children}</div>
        </div>
    );
}


ReactDom.render(
  <div className="page">
    <div className="posts">
        <Post author={'Милая девушка'} time={'3 часа назад'}>Можно использовать для выпекания чизкейков :)</Post>
        <Post time={'2 часа назад'}>Грише запретили въезд в Азербайджан</Post>
    </div>
  </div>,
  document.getElementById('app')
);

/**
    Подсказки к 1:
    - {renderMyComponent({a: 1, b: 'some'})} → <MyComponent a={1} b="some">
    - Первый аргумент функции компонента обычно называется props

    Подсказки к 2:
    type MyComponentProps = {
        requiredValue: string;
        optionalValue?: string;
    }

    Подсказки к 3:
    - const { b = 'defaultValue' } = props;

    Подсказки к 4:
    - Дети — это вложенные узлы тэга.
      Пример с одним ребенком: <MyComponent>Значение</MyComponent>
    - Дети попадают в props в виде массива props.children.
    const { children } = props;
 */
