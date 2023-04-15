import React from "react";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    error: {},
  };
  checkInputValidation = (contactForm) => {
    let { name, email } = contactForm;
    let errors = {};
    if (!name) {
      errors.name = "Name cannot be empty";
    }
    if (!email) {
      errors.email = "Email cannot be empty";
    }
    return errors;
  };

  add = (e) => {
    e.preventDefault();

    // if (this.state.name === "" || this.state.email === "") {
    //   alert("All fields are mandatory!!");
    //   return;
    // }
    let errors = this.checkInputValidation(this.state);
    if (Object.keys(errors).length > 0) {
      this.setState({
        error: { ...errors },
      });
      return;
    }

    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "" });
    this.props.history.push("/");
  };

  onContactFormChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const errors = { ...this.state.error };
    delete errors[fieldName];
    this.setState({
      [fieldName]: fieldValue,
      error: { ...errors },
    });
  };

  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.onContactFormChange}
            />
          </div>
          <span>
            {this.state.error["name"] ? this.state.error["name"] : null}
          </span>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onContactFormChange}
            />
            <span>
              {this.state.error["email"] ? this.state.error["email"] : null}
            </span>
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}
export default AddContact;
