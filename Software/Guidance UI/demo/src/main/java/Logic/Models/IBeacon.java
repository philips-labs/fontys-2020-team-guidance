package Logic.Models;

public class IBeacon {
    private int Id;
    private int X;
    private int Y;
    private String Type;
    private String SSID;
    private String Floorplanid;
    private String name;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getX() {
        return X;
    }

    public void setX(int x) {
        X = x;
    }

    public int getY() {
        return Y;
    }

    public void setY(int y) {
        Y = y;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        Type = type;
    }

    public String getSSID() {
        return SSID;
    }

    public void setSSID(String SSID) {
        this.SSID = SSID;
    }

    public String getFloorplanid() {
        return Floorplanid;
    }

    public void setFloorplanid(String floorplanid) {
        Floorplanid = floorplanid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
