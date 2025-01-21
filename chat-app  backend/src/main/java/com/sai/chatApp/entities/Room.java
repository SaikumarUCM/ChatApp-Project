package com.sai.chatApp.entities;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@Document(collection = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {


    @Id
    private String id;  // Mongo dbL Unique Identifies

    private String roomId;

    @DBRef
    private List<Message> messages= new ArrayList<>();

}
