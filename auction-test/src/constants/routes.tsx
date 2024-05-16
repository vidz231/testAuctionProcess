import App from "../App";
import Login from "../components/Login";
import AuctionsSessions from "../pages/auctionSession/AuctionsSessions";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/auction/:id",
    element: <AuctionsSessions />,
  },
];
export default routes;
