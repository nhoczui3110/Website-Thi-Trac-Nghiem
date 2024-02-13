package com.doantracnghiem.doantracnghiem.Data_Transfer_Object;

import java.util.ArrayList;
import java.util.List;

public class DanhSachCauHoiThiDTO {
    private List<CauHoiThiDTO> list;
    public DanhSachCauHoiThiDTO() {
		this.list = new ArrayList<>();
	}
	public DanhSachCauHoiThiDTO(List<CauHoiThiDTO> list) {
		this.list = list;
	}

	public List<CauHoiThiDTO> getList() {
		return list;
	}

	public void setList(List<CauHoiThiDTO> list) {
		this.list = list;
	}
    public void addCauHoiThi(CauHoiThiDTO cauHoiThiDTO){
        this.list.add(cauHoiThiDTO);
    }
	public void showTest(){
		for(CauHoiThiDTO tmp :list){
			System.out.println(tmp);
		}
	}


}
