import React, {Component} from 'react';
import auth from '../../utils/auth';
import './SignupPage.css';


class SignupPage extends Component {
  state = {
    shouldRedirect: false
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if(this.refs.password.value === this.refs.confirmPassword.value) {
      const formData = {
        name: this.refs.name.value,
        email: this.refs.email.value,
        password: this.refs.password.value
      }
      auth.signUp(formData).then(() => {
        console.log('success');
      });
      // auth.signIn(formData).then(user => {
      //   if(user) {
      //     this.props.onSignUp();
      //     this.setState({shouldRedirect: true});
      //   }
      // })
    }
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <input ref="name" type="text" placeholder="Name" />
          <input ref="email" type="text" placeholder="Email" />
          <input ref="password" type="password" placeholder="Password" />
          <input ref="confirmPassword" type="password" placeholder="Confirm Password" />
          <button>Confirm</button>
        </form>
      </div>
    )
  }

}

// const SignupPage = (props) => {
//   return (
//     <div>
//       <div>
//
//       </div>
//     </div>
//   )
// }

export default SignupPage
