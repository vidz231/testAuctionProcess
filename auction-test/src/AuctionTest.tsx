import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient: Client;

const AuctionTest: React.FC = () => {
  const [auctionItems, setAuctionItems] = useState<any[]>([]);

  useEffect(() => {
    connect();
  }, []);

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = new Client({
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
  const [bidAmount, setBidAmount] = useState<number>(0);

  const placeBid = (itemId: string, bidAmount: number) => {
    stompClient.publish({
      destination: "/app/bid",
      body: JSON.stringify({ itemId, bidAmount }),
    });
  };

  return (
    <div>
      <h1>Auction Test Page</h1>
      {auctionItems.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <label htmlFor={`bidAmount_${index}`}>Bid Amount:</label>
          <input
            type="number"
            id={`bidAmount_${index}`}
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
          />
          <button
            onClick={() =>
              placeBid(
                item.id,
                Number(
                  (
                    document.getElementById(
                      `bidAmount-${item.id}`
                    ) as HTMLInputElement
                  )?.value
                )
              )
            }
          >
            Place Bid
          </button>
        </div>
      ))}
    </div>
  );
};

export default AuctionTest;
