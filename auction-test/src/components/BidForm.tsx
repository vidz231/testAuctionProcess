// src/components/BidForm.tsx

import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { over, Client } from "stompjs";

const BidForm: React.FC = () => {
  const [itemId, setItemId] = useState<number | null>(null);

  const [bidAmount, setBidAmount] = useState(""); // Start with empty string

  const [stompClient, setStompClient] = useState<Client | null>(null);

  // Rest of the code...

  useEffect(() => {
    const socket = new SockJS("localhost:8080/ws"); // Adjust if needed
    const client = over(socket);
    setStompClient(client);

    return () => client.disconnect({});
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!itemId) {
      alert("Please select an item to bid on.");
      return;
    }

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    stompClient?.send(
      "/app/bid",
      {},
      JSON.stringify({
        itemId,
        amount,
        bidderId: 1, // Replace with actual bidder ID
      })
    );

    setBidAmount(""); // Clear the input after submitting
  };

  return (
    <form onSubmit={handleSubmit} className="bid-form">
      {/* Dropdown to select auction items */}
      <select
        title="Select Item"
        value={itemId ?? ""}
        onChange={(e) => setItemId(parseInt(e.target.value, 10) || null)}
      >
        <option value="">Select Item</option>
        {/* You'll need to fetch auction items from your API and map them here */}
      </select>

      <input
        type="number"
        placeholder="Bid Amount"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        min="0.01"
        step="0.01"
      />

      <button type="submit">Place Bid</button>
    </form>
  );
};

export default BidForm;
