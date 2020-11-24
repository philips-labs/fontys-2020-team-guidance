package com.guidance.javaserver;


import java.util.HashMap;

public class ClassName {
    public static void main(String[] args) {
        //System.out.println("hye there");
        //query will be coming from the object class files in order to have custom 'sentences' for them

        String queryIns = "insert into user (Name, Age, Gender, Email) value ('@0', @1, '@2', '@3')";
        String queryDel = "delete from user where id = @0";
        String queryUp = "update user set Name = '@0' where id = @1";
        String queryRead = "select * from user";

        String[] statsIns = new String[]{"Arnold", "79", "Female", "arnie@papaflirts.com"};
        String[] statsDel = new String[]{"17"};
        String[] statsUp = new String[]{"NotIvan", "13"};
        String[] statsRead = null;

        //0 - insert, 1 - update, 2 - delete
        //System.out.println(DAL.CreateUpdateDelete_Object(1, queryUp, statsUp));
        HashMap<Integer, Object[]> temp = DAL.Read_Object(queryRead, statsRead);
        //check the below for nullPointerException first
        for (Integer key : temp.keySet()) {
            System.out.print("id: " + key + " -> ");
            for (var value : temp.get(key)) {
                System.out.print("/" + value);
            }
            System.out.println();
        }
        //Creating an object
        //Return code 0 = unsuccessful /there may be errors
        //Return code 1 = successful
    }
}

