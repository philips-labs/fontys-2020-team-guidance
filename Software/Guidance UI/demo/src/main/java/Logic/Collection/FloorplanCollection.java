package Logic.Collection;

import Logic.Models.Floorplan;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class FloorplanCollection {
    private ArrayList<Floorplan> Floorplans = new ArrayList<>();

    {
        Floorplan floorplan = new Floorplan();
        floorplan.setSSID("FontysWPA");
        floorplan.setLink("https://www.vistabluesingerisland.com/wp-content/themes/vistablue/images/floor/b.png");
        floorplan.setName("F1");
        Floorplans.add(floorplan);

        Floorplan floorplan2 = new Floorplan();
        floorplan2.setSSID("test");
        floorplan2.setLink("https://www.pngkit.com/png/full/358-3587140_floorplan-floor-plan.png");
        floorplan2.setName("F1");
        Floorplans.add(floorplan2);

        Floorplan floorplan3 = new Floorplan();
        floorplan3.setSSID("FontysWPA");
        floorplan3.setLink("https://www.vistabluesingerisland.com/wp-content/themes/vistablue/images/floor/b.png");
        floorplan3.setName("F2");
        Floorplans.add(floorplan3);

        Floorplan floorplan4 = new Floorplan();
        floorplan4.setSSID("FontysWPA");
        floorplan4.setLink("https://www.pngkit.com/png/full/358-3587140_floorplan-floor-plan.png");
        floorplan4.setName("F3");
        Floorplans.add(floorplan4);

        Floorplan floorplan5 = new Floorplan();
        floorplan5.setSSID("FontysWPA");
        floorplan5.setLink("https://www.vistabluesingerisland.com/wp-content/themes/vistablue/images/floor/b.png");
        floorplan5.setName("F4");
        Floorplans.add(floorplan5);
    }

    public Collection<Floorplan> GetFloorplansBySSID(String ssid) {
        if(Floorplans != null) {
            ArrayList<Floorplan> floorplans = new ArrayList<>();

            for(Floorplan floorplan : Floorplans) {
                if(floorplan.getSSID().equals(ssid)) {
                    floorplans.add(floorplan);
                }
            }

            return floorplans;
        }

        return null;
    }

    public Floorplan GetFloorplanBySSID(String ssid) {
        if(Floorplans != null) {
            for(Floorplan floorplan : Floorplans) {
                if(floorplan.getSSID().equals(ssid)) {
                    return floorplan;
                }
            }
        }

        throw new NullPointerException();
    }

    public Collection<Floorplan> AddFloorplan(Floorplan floorplan) {
        Floorplans.add(floorplan);
        return Floorplans;
    }

    public Collection<Floorplan> DeleteFloorplans(String name) {
        String ssid = "";

        for(int i = 0; i < Floorplans.stream().count(); i++) {
            if(Floorplans.get(i).getName().equals(name)) {
                ssid = Floorplans.get(i).getSSID();
                Floorplans.remove(i);
            }
        }

        return GetFloorplansBySSID(ssid);
    }
}
