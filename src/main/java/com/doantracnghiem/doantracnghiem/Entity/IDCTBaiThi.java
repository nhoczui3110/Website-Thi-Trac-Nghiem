package com.doantracnghiem.doantracnghiem.Entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class IDCTBaiThi implements Serializable {
    private int idThi;
    private int idch;
}
