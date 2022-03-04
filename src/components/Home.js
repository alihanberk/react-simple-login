import React, { Component } from 'react';
import { Row, Col, Input, Icon, Button } from "antd";
import { connect } from 'react-redux';
import { actions } from '../store/modules'
import axios from 'axios';
import { loginModel } from '../helpers'


const api = "https://6222732e666291106a26be5d.mockapi.io/api/login";

class Home extends Component {
  state = {
    data: new loginModel(),
    sending: false,
    response: null
  }

  update = (key, value) => {
    let { data } = this.state;
    data[key] = value;
    this.setState({ data })
  }
  clear = () => {
    let _data = { data: new loginModel() }
    this.setState({ ..._data })
  }

  //For with Redux & Actions
  handleSubmit = () => {
    this.setState({ sending: true })
    let endpoint = { keyOne: api };
    this.props.dispatch(actions.global.addData({
      data: { ...this.state.data, key: 'value' },
      key: 'login',
      ...endpoint
    }))
      .then(() => this.setState({ sending: false }))
  }

  //For without Redux & Actions
  handleAxiosSubmit = () => {
    this.setState({ sending: true })
    axios.post(api, this.state.data)
      .then(response => this.setState({ response: response.data }))
      .finally(() => this.setState({ sending: false }))
  }


  render() {
    let { username, password } = this.state.data;
    let { sending, response } = this.state
    let { login } = this.props;
    return (
      <div className="form-container">
        <Row>
          <Col span={8} offset={8}>
            <div className="form-wrapper">

              <h1 className="text-center">Login Form</h1>

              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Ad"
                value={username}
                onChange={(e) => this.update('username', e.target.value)}
              />

              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Şifre"
                value={password}
                onChange={(e) => this.update('password', e.target.value)}
              />

              <Row gutter={16} >
                <Col span={12} className="p-5">
                  <Button block type="danger" onClick={this.clear}> Temizle </Button>
                </Col>
                <Col span={12} className="p-5">
                  <Button loading={sending} block onClick={this.handleSubmit}> Gönder </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8}>
            <h2 className="text-center">
              {
                (login || response) &&
                JSON.stringify(login || response)
              }
            </h2>
          </Col>
        </Row>
      </div>
    );
  };
};

const mapStateToProps = ({ global }) => ({ ...global });
export default connect(mapStateToProps)(Home);