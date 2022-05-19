import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./Search.module.css";

const Search = React.forwardRef((props, ref) => (
  <form onSubmit={props.onSubmit} className={classes.search_container}>
    <table className={classes.elements_container}>
      <tbody>
        <tr>
          <td>
            <input
              ref={ref}
              type="text"
              placeholder="Search..."
              className={classes.search}
              value={props.value}
              onChange={props.onChange}
            />
          </td>
          <td>
            <SearchIcon
              onClick={props.onClick}
              className={classes.search_button}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </form>
));

export default Search;
