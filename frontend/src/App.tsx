import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { over, Client } from "@stomp/stompjs";
import AuctionItem from "./components/AuctionItem";
import "./styles.css";

function App() {
  const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([]); // Adjust type as needed

  useEffect(() => {
    connect();
  }, []);
  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient: Client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });

    stompClient.onConnect = (frame) => {
      console.log("Connected: " + frame);

      stompClient.subscribe("/topic/app", (message) => {
        if (message.body) {
          const updatedItems = JSON.parse(message.body);
          setAuctionItems(updatedItems);
        }
      });

      fetch("http://localhost:8080/auction")
        .then((response) => response.json())
        .then((items) => {
          setAuctionItems(items);
        });
    };

    stompClient.activate();
  };
  const handlePlaceBid = (itemId: number, amount: number) => {
    // Implement this function to send a bid to the server
  };
  return (
    <div className="App">
      <h1>Live Auction</h1>
      <div className="auction-items">
        {auctionItems.map((item) => (
          <AuctionItem key={item.id} item={item} onPlaceBid={handlePlaceBid} />
        ))}
      </div>
      {/* <BidForm /> You'll need to create this component */}
    </div>
  );
}

export default App;
