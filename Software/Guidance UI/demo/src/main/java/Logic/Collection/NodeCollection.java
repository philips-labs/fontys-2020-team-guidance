package Logic.Collection;

import Logic.Models.Node;
import Persistence.NodeData;

import java.util.Collection;

public class NodeCollection {

    NodeData crud = new NodeData();

    public Collection<Node> GetNodesBySSIDAndFloorplanId(String ssid, String floorplanId) {
        return crud.GetNodes(ssid, floorplanId);
    }

    public void SaveNode(Node node) {
        crud.CreateNode(node);
    }
}
