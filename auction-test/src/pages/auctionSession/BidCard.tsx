import React from "react";

interface Bid {
  id: number;
  auctionItem: {
    id: number;
    name: string;
    // Add other fields of AuctionItem if needed
  };
  amount: number;
  bidderId: number;
  timestamp: string; // or Date if you prefer
}

interface BidCardProps {
  bid: Bid;
}

const BidCard: React.FC<BidCardProps> = ({ bid }) => {
  return (
    <div>
      <h2>Bid for Item: {bid.auctionItem.name}</h2>
      <p>Bid Amount: {bid.amount}</p>
      <p>Bidder ID: {bid.bidderId}</p>
      <p>Timestamp: {bid.timestamp}</p>
    </div>
  );
};

export default BidCard;
