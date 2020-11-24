package com.guidance.javaserver;

import com.mysql.cj.jdbc.Blob;

import java.net.*;
import java.io.*;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.HashMap;

public class listeningServer_GET {
    public static void main(String args[]){
        int port;
        ServerSocket socket;
        BufferedReader input;
        String pckgSent;
        PrintWriter output;

        try {
            port = Integer.parseInt(args[0]);
        }
        catch (Exception e) {
            System.out.println("port = 1500(default)");
            port = 16000;
        }

        try {
            socket = new ServerSocket(port);
            System.out.println("Server waiting for client on port " + socket.getLocalPort()+"\n");

            //looping...
            //BELOW IS KEEPING THE SERVER SOCKET ALIVE UNTIL INSTRUCTED OTHERWISE
            while(true){
                Socket sckt = socket.accept();
                System.out.println(sckt.isClosed() + "1");
                System.out.println("New connection accepted "
                        + sckt.getInetAddress()
                        + ":"
                        +sckt.getPort());
                input = new BufferedReader(new InputStreamReader(sckt.getInputStream()));
                System.out.println("Keep-Alive: "+ sckt.getKeepAlive());
                System.out.println(sckt.isClosed() + "2");
                //print received data
                try {
                    //BELOW IS GATHERING HE DATA DEPENDING ON THE REQUEST
                    //"\\^GET \\/users\\?ID\\=[1-9]{1,7}[\\s\\t\\n\\r]+HTTP\\/1\\.1$"
                    System.out.println(sckt.isClosed() + "3");
                    String msg = input.readLine();
                    if (msg==null) break;
                    System.out.println(msg);
                    String userID = "";
                    boolean selector = false;
                    if (msg.contains("GET")) {
                        if (msg.contains("/users?")) {
                            userID = msg.substring(
                                    msg.indexOf("=") + 1, msg.indexOf("H") - 1);
                            selector = false;
                        }
                        if (msg.contains("/floorplan?")){
                            selector = true;
                        }
                    }
                    HashMap<Integer, Object[]> result;
                    if (selector) {
                        //picture handling
                        result = DAL.GetImageCollection();
                    }else {
                        //text handling
                        String query = "SELECT * FROM user WHERE id=@0";
                        String[] props = new String[]{userID};
                        result = DAL.Read_Object(query, props);
                    }
                    if (result != null) {
                        for (Integer key : result.keySet()) {
                            System.out.print("id: " + key + " -> ");
                            for (var value : result.get(key)) {
                                System.out.print("/" + value);
                            }
                            System.out.println();
                        }
                    }
                    //BELOW IS FORMATTING THE DATA

                    //BELOW IS THE RETURNING OF THE FORMATTED INFORMATION
                    output = new PrintWriter(sckt.getOutputStream(),true);
                    //get user input and transmit it to server
                    pckgSent = "OK"; // here for returning ?
                    //stop if input line is "."
                    output.println("Data sent: "+ pckgSent);
                    sckt.close();

                }
                catch (IOException e){
                    System.out.println(e);
                }
                //connection close by client
            }
        }
        catch (IOException e){
            System.out.println(e);
        }
    }
}

