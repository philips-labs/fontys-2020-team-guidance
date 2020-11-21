package Logic.Collection;

import Logic.Models.AdminKey;
import Logic.Models.SuperAdminKey;

import java.util.ArrayList;
import java.util.Collection;

public class AdminKeyCollection {
    private ArrayList<AdminKey> AdminKeys = new ArrayList<>();
    private ArrayList<SuperAdminKey> SuperAdminKeys = new ArrayList<>();

    {
        AdminKey adminkey = new AdminKey();
        adminkey.setSSID("FontysWPA");
        adminkey.setKey("abcde1234");
        AdminKeys.add(adminkey);

        AdminKey adminkey2 = new AdminKey();
        adminkey2.setSSID("FontysWelkom");
        adminkey2.setKey("abcde4321");
        AdminKeys.add(adminkey2);

        SuperAdminKey superadminkey = new SuperAdminKey();
        superadminkey.setKey("abcde1234");
        SuperAdminKeys.add(superadminkey);
    }

    public String GetAdminSSIDByKey(String key) {
        for(AdminKey adminkey : AdminKeys) {
            if(adminkey.getKey().equals(key)) {
                return adminkey.getSSID();
            }
        }

        return "404";
    }

    public Collection<AdminKey> CheckAdmin(String superAdminKey) {
        for(SuperAdminKey superadmin : SuperAdminKeys) {
            if(superadmin.getKey().equals(superAdminKey)) {
                return AdminKeys;
            }
        }

        throw new NullPointerException();
    }

    public Collection<AdminKey> EditAdminKey(String AdminKey, String newKey) {
        for(AdminKey adminKey : AdminKeys) {
            if(adminKey.getKey().equals(AdminKey)) {
                adminKey.setKey(newKey.substring(10,  newKey.length()-2));
            }
        }

        return AdminKeys;
    }

    public Collection<AdminKey> EditSSID(String AdminKey, String newSSID) {
        for(AdminKey adminKey : AdminKeys) {
            if(adminKey.getKey().equals(AdminKey)) {
                adminKey.setSSID(newSSID.substring(10,  newSSID.length()-2));
            }
        }

        return AdminKeys;
    }

    public Collection<AdminKey> DeleteAdminKey(String AdminKey) {
        for(int i = 0; i < AdminKeys.size(); i++) {
            if(AdminKeys.get(i).getKey().equals(AdminKey)) {
                AdminKeys.remove(i);
            }
        }

        return AdminKeys;
    }

    public Collection<AdminKey> AddAdminKey(AdminKey adminKey) {
        AdminKeys.add(adminKey);

        return AdminKeys;
    }
}
