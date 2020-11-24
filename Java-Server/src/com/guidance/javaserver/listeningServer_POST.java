package com.guidance.javaserver;

import java.net.*;
import java.io.*;

public class listeningServer_POST {
    public static void main(String[] args) {
        int port;
        ServerSocket servSocket;
        Socket clientSocket;
        BufferedReader input;
        String pckgSent;
        PrintWriter output;

        try {
            port = Integer.parseInt(args[0]);
        } catch (Exception e) {
            System.out.println("port = 1500(default)");
            port = 16001;
        }

        try {
            servSocket = new ServerSocket(port);
            System.out.println("Server waiting for client on port " + servSocket.getLocalPort() + "\n");

            //looping...
            while (true) {
                clientSocket = servSocket.accept();
                System.out.println("New connection accepted "
                        + clientSocket.getInetAddress()
                        + ":"
                        + clientSocket.getPort());
                input = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                System.out.println("Keep-Alive: " + clientSocket.getKeepAlive());
                //print received data
                try {
                    //"\\^GET \\/users\\?ID\\=[1-9]{1,7}[\\s\\t\\n\\r]+HTTP\\/1\\.1$"
                    while (true) {
                        String msg = input.readLine();
                        if (msg == null) break;
                        System.out.println(msg);
                        if (msg.contains("POST")) {
                            System.out.println(msg.substring(
                                    msg.indexOf("=") + 1, msg.indexOf("H") - 1));
                        }
                        output = new PrintWriter(clientSocket.getOutputStream(), true);
                        //get user input and transmit it to server
                        pckgSent = "OK"; // here for returning ?
                        //stop if input line is "."
                        output.println("Data sent: " + pckgSent);
                        clientSocket.close();

                    }
                } catch (IOException e) {
                    System.out.println(e);
                }
                //connection close by client
            }
        }
        catch(IOException e){System.out.println(e);}
    }
}
