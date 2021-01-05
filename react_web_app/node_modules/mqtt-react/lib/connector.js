"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mqtt = require("mqtt");

var _mqtt2 = _interopRequireDefault(_mqtt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Connector = function (_Component) {
    _inherits(Connector, _Component);

    function Connector(props, context) {
        _classCallCheck(this, Connector);

        var _this = _possibleConstructorReturn(this, (Connector.__proto__ || Object.getPrototypeOf(Connector)).call(this, props, context));

        _this._makeStatusHandler = function (status) {
            return function () {
                _this.setState({ mqttStatus: status });
            };
        };

        var initialState = {};
        _this.state = initialState;
        return _this;
    }

    _createClass(Connector, [{
        key: "getChildContext",
        value: function getChildContext() {
            return {
                mqtt: this.mqtt,
                mqttStatus: this.state.mqttStatus
            };
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            var _props = this.props,
                mqttProps = _props.mqttProps,
                mqtt = _props.mqtt;


            this.mqtt = mqtt ? mqtt : _mqtt2.default.connect(mqttProps);

            this.mqtt.on('connect', this._makeStatusHandler('connected'));
            this.mqtt.on('reconnect', this._makeStatusHandler('reconnect'));
            this.mqtt.on('close', this._makeStatusHandler('closed'));
            this.mqtt.on('offline', this._makeStatusHandler('offline'));
            this.mqtt.on('error', console.error);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.mqtt.end();
        }
    }, {
        key: "render",
        value: function render() {
            return this.renderConnected();
        }
    }, {
        key: "renderConnected",
        value: function renderConnected() {
            return _react.Children.only(this.props.children);
        }
    }]);

    return Connector;
}(_react.Component);

Connector.propTypes = {
    mqqt: _propTypes2.default.object,
    mqttProps: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    children: _propTypes2.default.element.isRequired
};
Connector.childContextTypes = {
    mqtt: _propTypes2.default.object,
    mqttStatus: _propTypes2.default.string
};
exports.default = Connector;