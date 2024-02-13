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
    public CTBaiThi(int idThi) {
		this.idThi = idThi;
		dapAnSv = 0;
	}
	@Id
    @Column(name = "IDCH")
    private int idch;
    public CTBaiThi(int idThi, int idch, int dapAnSv, int thuTuChon, boolean trangThaiXoa) {
		this.idThi = idThi;
		this.idch = idch;
		this.dapAnSv = dapAnSv;
		this.thuTuChon = thuTuChon;
		this.trangThaiXoa = trangThaiXoa;
	}
	public int getIdThi() {
		return idThi;
	}
	public CTBaiThi() {
	}
	public void setIdThi(int idThi) {
		this.idThi = idThi;
	}
	public int getIdch() {
		return idch;
	}
	public void setIdch(int idch) {
		this.idch = idch;
	}
	public int getDapAnSv() {
		return dapAnSv;
	}
	public void setDapAnSv(int dapAnSv) {
		this.dapAnSv = dapAnSv;
	}
	public int getThuTuChon() {
		return thuTuChon;
	}
	public void setThuTuChon(int thuTuChon) {
		this.thuTuChon = thuTuChon;
	}
	public boolean isTrangThaiXoa() {
		return trangThaiXoa;
	}
	public void setTrangThaiXoa(boolean trangThaiXoa) {
		this.trangThaiXoa = trangThaiXoa;
	}
	@Column(name = "DAPANSV")
    private int dapAnSv;
    @Column(name = "THUTUCHON")
    private int thuTuChon;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;
}
