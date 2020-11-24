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
                //print received data
                try {
                    String headerLine = null;
                    while((headerLine = input.readLine()).length() != 0){
                        System.out.println("H:"+headerLine);
                    }
                    StringBuilder payload = new StringBuilder();
                    while(input.ready()){
                        payload.append((char) input.read());
                    }
                    System.out.println("Payload: "+ payload);
                    clientSocket.close();
                } catch (IOException e) {
                    System.out.println(e);
                }
                //connection close by client
            }
        }
        catch(IOException e){System.out.println(e);}
    }
}
