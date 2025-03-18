import React from "react";

interface CounterProps {
    initialValue?: number
}

interface CounterState {
    count: number
}

export class Counter extends React.Component<CounterProps, CounterState> {
    constructor(props: CounterProps) {
        super(props);
        this.state = {
            count: props.initialValue ?? 0
        };
    }

    increment()  {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    }

    decrement() {
        this.setState(prevState => ({
            count: prevState.count - 1
        }));
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                {onClick: () => this.decrement()},
                '-'
            ),
            React.createElement(
                'span',
                {style: {margin: '0 10px'}},
                this.state.count
            ),
            React.createElement(
                'button',
                {onClick: () => this.increment()},
                '+'
            )
        );
    }
}
