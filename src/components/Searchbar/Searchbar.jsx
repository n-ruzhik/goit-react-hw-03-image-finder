import { Component } from "react";
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import css from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    query: "",
  }
  
  handleQueryChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
        toast.error ("Please, enter your request!");
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: "" });
  };
   
    render() {
    return (      
          <form onSubmit={this.handleSubmit} className={css.searchForm}>
            <input
              className={css.searchInput}
              type="text"
              name="queryToSearch"
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handleQueryChange}
            />
            <button type="submit" className={css.searchBtn}>Search
            </button>
          </form>
    );
  }
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}