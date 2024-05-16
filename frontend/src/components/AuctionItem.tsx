import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuctionItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    startingPrice: number;
    currentPrice: number;
    highestBidderId?: number;
    endTime?: Date;
  };
  onPlaceBid: (itemId: number, amount: number) => void;
}

const AuctionItem: React.FC<AuctionItemProps> = ({ item, onPlaceBid }) => {
  const nav = useNavigate();
  const [bidAmount, setBidAmount] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(item.endTime)
  );
  const handleClick = () => {
    if (!sessionStorage.getItem("bidderId")) {
      nav("/login");
    } else {
      nav(`/auction/${item.id}`);
    }
  };
  const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(event.target.value);
  };

  const handleSubmitBid = (event: React.FormEvent) => {
    event.preventDefault();
    const amount = parseFloat(bidAmount);
    if (!isNaN(amount) && amount > item.currentPrice) {
      onPlaceBid(item.id, amount);
      setBidAmount("");
    } else {
      alert("Bid must be higher than current price.");
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(item.endTime));
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [item.endTime]);
  return (
    <div className="auction-item">
      <h2>{item.name}</h2>
      <p className="description">{item.description}</p>
      <div className="price-info">
        <p>
          <strong>Starting Price:</strong> $
          {(item.startingPrice || 0).toFixed(2)}
        </p>
        <p>
          <strong>Current Price:</strong> ${(item.currentPrice || 0).toFixed(2)}
        </p>
      </div>
      {item.highestBidderId && (
        <p>
          <strong>Highest Bidder:</strong> {item.highestBidderId ? "Yes" : "No"}
        </p>
      )}
      {item.endTime && (
        <p>
          <strong>Time Remaining:</strong> {timeRemaining}
        </p>
      )}
      <button onClick={handleClick}>Participate</button>
    </div>
  );
};
// Helper function to calculate remaining time (if endTime is provided)
function calculateTimeRemaining(endTime: Date): string {
  // If endTime is a string, convert it to a Date object
  if (typeof endTime === "string") {
    endTime = new Date(endTime);
  }

  const now = new Date();
  const diff = endTime.getTime() - now.getTime();

  if (diff <= 0) {
    return "Auction Ended";
  }

  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default AuctionItem;
