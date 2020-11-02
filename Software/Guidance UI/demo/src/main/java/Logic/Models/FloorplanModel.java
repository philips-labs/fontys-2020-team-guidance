package Logic.Models;

public class FloorplanModel {
    private String SSID;
    private String Link;

    public FloorplanModel(String SSID, String link) {
        this.SSID = SSID;
        Link = link;
    }

    public String getSSID() {
        return SSID;
    }

    public void setSSID(String SSID) {
        this.SSID = SSID;
    }

    public String getLink() {
        return Link;
    }

    public void setLink(String link) {
        Link = link;
    }
}
