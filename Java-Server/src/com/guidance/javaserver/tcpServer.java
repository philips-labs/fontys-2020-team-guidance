package com.guidance.javaserver;

import java.net.*;
import java.io.*;

public class tcpServer {
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
            while(true){
                Socket sckt = socket.accept();
                System.out.println(sckt.isClosed());
                System.out.println("New connection accepted "
                        + sckt.getInetAddress()
                        + ":"
                        +sckt.getPort());
                input = new BufferedReader(new InputStreamReader(sckt.getInputStream()));
                System.out.println("Keep-Alive: "+ sckt.getKeepAlive());
                System.out.println(sckt.isClosed());
                //print received data
                try {
                    System.out.println(sckt.isClosed());
                    while(true){
                        String msg = input.readLine();
                        if (msg==null) break;
                        System.out.println(msg);
                        if (msg.equals("PING|")){
                            System.out.println("Flag for alive is set to: " +sckt.getKeepAlive());
                            output = new PrintWriter(sckt.getOutputStream(),true);
                            //get user input and transmit it to server
                            pckgSent = "OK"; // here for returning ?
                            //stop if input line is "."
                            output.println("Data sent: "+ pckgSent);
                            sckt.close();
                        }
                    }
                    System.out.println(sckt.isClosed());
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
