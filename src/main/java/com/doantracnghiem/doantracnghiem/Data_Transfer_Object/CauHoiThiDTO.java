package com.doantracnghiem.doantracnghiem.Data_Transfer_Object;

import java.util.List;

import com.doantracnghiem.doantracnghiem.Entity.CTBaiThi;
import com.doantracnghiem.doantracnghiem.Entity.CauHoi;
import com.doantracnghiem.doantracnghiem.Entity.LuaChon;

public class CauHoiThiDTO {
    private CauHoi CauHoi;
    private List<LuaChon> LuaChon;
    private CTBaiThi ctBaiThi;
    public CauHoiThiDTO(CauHoi cauHoi,List<LuaChon> luaChon,CTBaiThi ctBaiThi) {
        this.CauHoi = cauHoi;
        this.LuaChon = luaChon;
        this.ctBaiThi = ctBaiThi;
    }
    public CauHoiThiDTO() {
        
    }
    public void setDapAnSinhVien(Integer dapansv){
        ctBaiThi.setDapAnSv(dapansv);
    }
    public CTBaiThi getCtBaiThi() {
		return ctBaiThi;
	}
	public void setCtBaiThi(CTBaiThi ctBaiThi) {
		this.ctBaiThi = ctBaiThi;
	}
    public CauHoi getCauHoi() {
        return CauHoi;
    }
	public void setCauHoi(CauHoi cauHoi) {
        this.CauHoi = cauHoi;
    }
    public List<LuaChon> getLuaChon() {
        return LuaChon;
    }
    public void setLuaChon(List<LuaChon> luaChon) {
        this.LuaChon = luaChon;
    }
    
    @Override
    public String toString() {
        return "CauHoiThiDTO [CauHoi=" + CauHoi + ", LuaChon=" + LuaChon + "]";
    }
}
