package com.doantracnghiem.doantracnghiem.Data_Transfer_Object;

import java.util.ArrayList;
import java.util.List;
class Value{
    private Integer value;

    public Integer getValue() {
        return value;
    }

    public Value() {
        value = 0;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Value(Integer value) {
        this.value = value;
    }
    public String toString(){
        return String.valueOf(value);
    }

}
public class KetQua {
    public KetQua(List<Value> result) {
        this.result = result;
    }

    public KetQua(Integer number) {
        this.result = new ArrayList<>();
        for(int i=0;i<number;i++){
            result.add(new Value());
        }
    }

    public KetQua() {
        this.result = new ArrayList<>();
    }

    private List<Value> result;

    public List<Value> getResult() {
        return result;
    }

    public void setResult(List<Value> result) {
        this.result = result;
    }
    public void show(){
        System.out.println("kich thuoc: "+result.size());
        for(Value tmp : result){
            System.out.println(tmp);
        }
    }   
}
