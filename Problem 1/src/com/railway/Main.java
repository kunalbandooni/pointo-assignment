package com.railway;

import com.railway.service.GraphService;
import com.railway.util.InputParser;

import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        GraphService graphService = new GraphService();
        try {
            InputParser.parseFile("input.txt", graphService);
        } catch (Exception e) {
            System.err.println("Error reading input: " + e.getMessage());
            return;
        }

        printResult(1, graphService.calculateRouteDistance(Arrays.asList('A', 'B', 'C')));
        printResult(2, graphService.calculateRouteDistance(Arrays.asList('A', 'D')));
        printResult(3, graphService.calculateRouteDistance(Arrays.asList('A', 'D', 'C')));
        printResult(4, graphService.calculateRouteDistance(Arrays.asList('A', 'E', 'B', 'C', 'D')));
        printResult(5, graphService.calculateRouteDistance(Arrays.asList('A', 'E', 'D')));

        printResult(6, graphService.countPathsMaxStops('C', 'C', 3));
        
        printResult(7, graphService.countPathsExactStops('A', 'C', 4));

        printResult(8, graphService.shortestPath('A', 'C'));
        printResult(9, graphService.shortestPath('B', 'B'));
        
        printResult(10, graphService.countRoutesMaxDistance('C', 'C', 30));
    }

    private static void printResult(int num, int dist) {
        System.out.println("Output #" + num + ": " + (dist != -1 ? dist : "NO SUCH ROUTE"));
    }
}
