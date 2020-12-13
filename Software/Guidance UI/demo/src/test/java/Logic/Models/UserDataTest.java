package Logic.Models;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserDataTest {

    @Test
    void getCoordinates() {

        String result = "onetwo";

        assertEquals("onetwo", result);
    }

    @Test
    void getCircleAroundBeacon() {
        String result = "onetwo";
        List<String> circle1 = new ArrayList<>();
        getCircleAroundBeacon();
        assertEquals("onetwo", result);
    }
}