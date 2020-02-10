import axios from "axios";

let port = `:${process.env.REACT_APP_PORT || 3030}`;
if (port === ":Heroku") {
  port = "";
}

export default axios.create({
  baseURL: `//${window.location.hostname}${port}/api`
});
