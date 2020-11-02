package Logic;

import Persistence.FloorplanData;

public class Floorplan {
    FloorplanData data = new FloorplanData();

    public String GetFloorplanFiles() {
        return data.GetFloorplanData();
    }
}
