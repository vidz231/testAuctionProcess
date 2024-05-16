import React from "react";

export default function ItemCard({ item }) {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Starting Price: {item.startingPrice}</p>
      <p>Current Price: {item.currentPrice}</p>
      <p>Highest Bidder ID: {item.highestBidderId}</p>
      <p>End Time: {item.endTime}</p>
      {/* Display the list of bids */}
      <h3>Bids:</h3>
      {item.bids.map((bid, index) => (
        <p key={index}>
          Bid {index + 1}: {bid.amount}
        </p>
      ))}
    </div>
  );
}
