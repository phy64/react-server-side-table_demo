import React from 'react'

class Input extends React.Component {
  renderCount = 0;
  state = {
    value: ''
  }

  render() {
    const { value } = this.state

    return <input {...this.props} value={value} onChange={this.handleChange}/>
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value }, () => {
      this.props.onChange(this.state.value)
    });
  };
};

export default Input;
