package com.example.demorealtimeauctionwithWebsocketAndRedis.pojos;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Bidder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private int id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private float creditLimit;

    private StatusType status;

    public enum StatusType {
        CHAT,
        JOIN,
        LEAVE
    }

    @OneToMany
    private List<Bid> bids;


}
