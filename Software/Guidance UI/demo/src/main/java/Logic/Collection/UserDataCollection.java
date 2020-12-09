package Logic.Collection;

import Logic.Models.UserData;
import Persistence.UserDataData;

import java.util.ArrayList;
import java.util.Collection;

public class UserDataCollection {
    UserDataData userDataData = new UserDataData();
    private ArrayList<UserData> userDataList = new ArrayList<>();

    public Collection<UserData> GetUserDatasByEmail(String email) {
        userDataList =  userDataData.GetAllUserData();

        if(userDataList != null) {
            ArrayList<UserData> userDataList2 = new ArrayList<>();

            for(UserData userData : userDataList) {
                if(userData.getEmail().equals(email)) {
                    userDataList2.add(userData);
                }
            }

            return userDataList2;
        }

        return null;
    }

    public UserData GetUserDataByEmail(String email) {
        userDataList =  userDataData.GetAllUserData();

        if(userDataList != null) {
            for(UserData userData : userDataList) {
                if(userData.getEmail().equals(email)) {
                    return userData;
                }
            }
        }

        return null;
    }

    public Collection<UserData> AddUserData(UserData userData) {
        if(!UserDataEmailExists(userData)) {
            userDataList.add(userData);
            userDataData.CreateUserData(userData);
        }

        return GetUserDatasByEmail(userData.getEmail());
    }

    public Boolean UserDataEmailExists(UserData userData) {
        for(UserData userData1 : userDataList) {
            if(userData1.getEmail().equals(userData.getEmail())) {
                return true;
            }
        }

        return false;
    }

    public Collection<UserData> DeleteUserData(String givenEmail) { // Deze is sws fout! even in de gaten houden
        String email = "";

        userDataData.DeleteUserData(givenEmail);

        for(int i = 0; i < userDataList.size(); i++) {
            if(userDataList.get(i).getEmail().equals(givenEmail)) {
                email = userDataList.get(i).getEmail();
                userDataList.remove(i);
            }
        }

        return GetUserDatasByEmail(email);
    }
}
