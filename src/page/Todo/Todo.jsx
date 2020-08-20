import React, { Component } from 'react';
import { Button, Input, Radio } from 'antd';
import './todo.scss';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noOneMessage: 'No options yet',
            userINput: [],
            value: '',
            userInputValue: '',
            isDisabled: false
        };
    }

    // 方法
    check = value => {
        let checkValue = value;
        const checkList = this.state.userINput;

        if (checkList.includes(checkValue)) {
            this.setState({
                isDisabled: true
            })
        } else {
            this.setState({
                isDisabled: false
            })
        }

    }

    userInfo = e => {

        this.check(e.target.value)
        this.setState({
            userInputValue: e.target.value
        })

    }

    getUserInfo() {
        // 空值判断
        if (this.state.userInputValue.length === 0) {
            alert('不要输入空值');
        } else {
            let newList = this.state.userINput;
            newList.push(this.state.userInputValue)
            this.setState({
                userINput: newList,
                userInputValue: ''
            })
        }
    }

    // 单选改变
    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    // 组件化渲染

    // 渲染单选
    renderTodoList() {
        if (this.state.userINput.length === 0) {
            return (
                <div className="list">
                    {this.state.noOneMessage}
                </div>
            )
        } else {
            const radioStyle = {
                float: 'left',
                lineHeight: '30px',
                height: '30px',
                fontSize: '18px',
                padding: '0 5px'
            };
            const renderList = <Radio.Group onChange={this.onChange} value={this.state.value}>
                {this.state.userINput.map((item) =>
                    <Radio style={radioStyle} value={item} key={item}>{item}</Radio>
                )}
            </Radio.Group>

            return (
                <div className="list">
                    {renderList}
                    {/* 这里有必要的话要再拆一下 */}
                    <p className="user-selected-radio">Selected option is {this.state.value}</p>
                </div>
            )
        }
    }

    // 添加单选
    renderInputAdd() {
        return (
            <div className="box">
                <Input placeholder="input your need" value={this.state.userInputValue} onChange={(value) => this.userInfo(value)} className="user-input" />
                <Button disabled={this.state.isDisabled} className="add-buttton" type="dashed" onClick={() => this.getUserInfo()}>+  Add</Button>
            </div>
        )
    }

    render() {
        return (
            <div className="box">
                {this.renderTodoList()}
                {this.renderInputAdd()}
            </div>

        )
    }
}