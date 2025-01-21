package com.sai.chatApp.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Document(collection = "message")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    private String sender;
    private String content;

    private LocalDateTime timeStamp;

    public Message(String sender, String content) {
        this.sender = sender;
        this.content = content;
        this.timeStamp= LocalDateTime.now();
    }
}
