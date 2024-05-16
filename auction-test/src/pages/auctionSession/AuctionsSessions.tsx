import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET } from "../../utils/requests";

export default function AuctionsSessions() {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    GET(`/auction/${id}`);
  }, [id]);
  return <div>AuctionsSessions</div>;
}
