package Logic.Collection;

import Logic.Models.AdminKey;

import java.util.ArrayList;

public class AdminKeyCollection {
    private ArrayList<AdminKey> AdminKeys = new ArrayList<>();

    {
        AdminKey adminkey = new AdminKey();
        adminkey.setSSID("FontysWPA");
        adminkey.setKey("abcde1234");
        AdminKeys.add(adminkey);

        AdminKey adminkey2 = new AdminKey();
        adminkey2.setSSID("FontysWelkom");
        adminkey2.setKey("abcde4321");
        AdminKeys.add(adminkey2);
    }

    public String GetAdminSSIDByKey(String key) {
        System.out.println(key);

        for(AdminKey adminkey : AdminKeys) {
            if(adminkey.getKey().equals(key)) {
                return adminkey.getSSID();
            }
        }

        return "404";
    }
}
