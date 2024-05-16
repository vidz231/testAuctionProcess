package com.example.demorealtimeauctionwithWebsocketAndRedis.pojos;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data // Lombok annotation for getters/setters
public class AuctionItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private BigDecimal startingPrice;
    private BigDecimal currentPrice;
    private Long highestBidderId; // Store the bidder's ID
    private LocalDateTime endTime;
    @OneToMany
    private List<Bid> bids;


    // ... other fields (e.g., endTime)
}
