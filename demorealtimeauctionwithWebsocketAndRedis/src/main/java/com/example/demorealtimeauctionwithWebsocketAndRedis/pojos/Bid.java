package com.example.demorealtimeauctionwithWebsocketAndRedis.pojos;

import com.example.demorealtimeauctionwithWebsocketAndRedis.pojos.AuctionItem;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private AuctionItem auctionItem;
    private BigDecimal amount;
    private Long bidderId;
    private LocalDateTime timestamp;
}
