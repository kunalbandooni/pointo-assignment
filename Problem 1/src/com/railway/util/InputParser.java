package com.railway.util;

import com.railway.service.GraphService;

import java.io.*;
import java.util.regex.*;

public class InputParser {
    public static void parseFile(String filename, GraphService graphService) throws IOException {
        BufferedReader br = new BufferedReader(new FileReader(filename));
        String line = br.readLine();
        if (line == null) return;
        String[] routes = line.split(",");
        Pattern pattern = Pattern.compile("([A-Z])([A-Z])(\\d+)");
        for (String route : routes) {
            Matcher matcher = pattern.matcher(route.trim());
            if (matcher.matches()) {
                char from = matcher.group(1).charAt(0);
                char to = matcher.group(2).charAt(0);
                int weight = Integer.parseInt(matcher.group(3));
                graphService.addEdge(from, to, weight);
            }
        }
    }
}
