package com.guidance.javaserver;

import java.net.*;
import java.io.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class listeningServer_GETreqs {
    public static void main(String args[]){
        int port;
        ServerSocket socket;
        BufferedReader input;
        String pckgSent;
        PrintWriter output;
        Matcher matcher;

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
                    //"\\^GET \\/users\\?ID\\=[1-9]{1,7}[\\s\\t\\n\\r]+HTTP\\/1\\.1$"
                    System.out.println(sckt.isClosed() + "3");
                    while(true){
                        String msg = input.readLine();
                        if (msg==null) break;
                        System.out.println(msg);
                        if (msg.matches
                                ("\\^GET \\/users\\?ID\\=[1-9]{1,7}[\\s\\t\\n\\r]+HTTP\\/1\\.1[\\s\\t\\n\\r]*$")){
                            System.out.println(msg.substring(
                                    msg.indexOf("=")+1, msg.indexOf("H")-1));
                            System.out.println("Flag for alive is set to: " +sckt.getKeepAlive());
                            output = new PrintWriter(sckt.getOutputStream(),true);
                            //get user input and transmit it to server
                            pckgSent = "OK"; // here for returning ?
                            //stop if input line is "."
                            output.println("Data sent: "+ pckgSent);
                            sckt.close();
                        }else if(msg.equals("POST / HTTP/1.1")){
                            System.out.println("kure, POST e");
                        }
                    }
                    System.out.println(sckt.isClosed() + "4");
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

