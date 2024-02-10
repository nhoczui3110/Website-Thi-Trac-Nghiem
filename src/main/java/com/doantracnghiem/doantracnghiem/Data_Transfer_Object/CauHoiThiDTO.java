package com.doantracnghiem.doantracnghiem.Data_Transfer_Object;

import java.util.List;
import com.doantracnghiem.doantracnghiem.Entity.CauHoi;
import com.doantracnghiem.doantracnghiem.Entity.LuaChon;

public class CauHoiThiDTO {
    private CauHoi CauHoi;
    private List<LuaChon> LuaChon;
   
    public CauHoiThiDTO(com.doantracnghiem.doantracnghiem.Entity.CauHoi cauHoi,
            List<com.doantracnghiem.doantracnghiem.Entity.LuaChon> luaChon) {
        CauHoi = cauHoi;
        LuaChon = luaChon;
    }
    public CauHoi getCauHoi() {
        return CauHoi;
    }
    @Override
	public String toString() {
		return "CauHoiThiDTO [CauHoi=" + CauHoi + ", LuaChon=" + LuaChon + "]";
	}
	public void setCauHoi(CauHoi cauHoi) {
        CauHoi = cauHoi;
    }
    public List<LuaChon> getLuaChon() {
        return LuaChon;
    }
    public void setLuaChon(List<LuaChon> luaChon) {
        LuaChon = luaChon;
    }
    
}
