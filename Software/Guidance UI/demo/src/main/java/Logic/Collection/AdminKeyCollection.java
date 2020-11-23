package Logic.Collection;

import Logic.Models.AdminKey;
import Logic.Models.Floorplan;
import Persistence.AdminKeyData;
import Persistence.FloorplanData;

import java.util.ArrayList;
import java.util.Collection;

public class AdminKeyCollection {
    AdminKeyData AdminKeyData = new AdminKeyData();
    private ArrayList<AdminKey> AdminKeys = new ArrayList<>();

    public String GetAdminSSIDByKey(String key) {
        AdminKeys = AdminKeyData.GetAllAdminKeys();

        for(AdminKey adminkey : AdminKeys) {
            if(adminkey.getKey().equals(key)) {
                return adminkey.getSSID();
            }
        }

        return "404";
    }

    public Collection<AdminKey> CheckAdmin(String superAdminKey) {
        if(AdminKeyData.CheckSuperadmin(superAdminKey)) {
            AdminKeys = AdminKeyData.GetAllAdminKeys();
            return AdminKeys;
        }
        else throw new NullPointerException();
    }

    public Collection<AdminKey> EditAdminKey(String AdminKey, String newKey) {
        for(AdminKey adminKey : AdminKeys) {
            if(adminKey.getKey().equals(AdminKey)) {
                String oldKey = adminKey.getKey();
                newKey = newKey.substring(10,  newKey.length()-2);
                adminKey.setKey(newKey);
                AdminKeyData.UpdateAdminKey(adminKey, oldKey);
            }
        }

        return AdminKeys;
    }

    public Collection<AdminKey> EditSSID(String AdminKey, String newSSID) {
        for(AdminKey adminKey : AdminKeys) {
            if(adminKey.getKey().equals(AdminKey)) {
                String oldKey = adminKey.getKey();
                newSSID = newSSID.substring(10,  newSSID.length()-2);
                adminKey.setSSID(newSSID);
                AdminKeyData.UpdateAdminKey(adminKey, oldKey);
            }
        }

        return AdminKeys;
    }

    public Collection<AdminKey> DeleteAdminKey(String adminKey) {
        AdminKeyData.DeleteAdminKey(adminKey);
        for(int i = 0; i < AdminKeys.size(); i++) {
            if(AdminKeys.get(i).getKey().equals(adminKey)) {
                AdminKeys.remove(i);
            }
        }

        return AdminKeys;
    }

    public Collection<AdminKey> AddAdminKey(AdminKey adminKey) {
        if(!AdminKeyExists(adminKey)) {
            AdminKeys.add(adminKey);
            AdminKeyData.CreateAdminkey(adminKey);
        }

        return AdminKeys;
    }

    public Boolean AdminKeyExists(AdminKey adminkey) {
        for(AdminKey adminKey : AdminKeys) {
            if(adminKey.getKey().equals(adminkey.getKey())) {
                return true;
            }
        }

        return false;
    }
}
