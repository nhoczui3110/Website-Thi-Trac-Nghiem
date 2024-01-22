package com.doantracnghiem.doantracnghiem.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "CTBAITHI")
@IdClass(IDCTBaiThi.class)
public class CTBaiThi {
    @Id
    @Column(name = "IDTHI")
    private int idThi;
    @Id
    @Column(name = "IDCH")
    private int idch;
    @Column(name = "DAPANSV")
    private int dapAnSv;
    @Column(name = "THUTUCHON")
    private int thuTuChon;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;
}
