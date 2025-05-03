package com.pkdoc.papers.users.dtos;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserPaperDTO implements Serializable {
    private int id;
    private String name;
}
