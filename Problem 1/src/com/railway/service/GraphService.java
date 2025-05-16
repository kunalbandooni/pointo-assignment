package com.railway.service;

import com.railway.model.Edge;

import java.util.*;

public class GraphService {
    private final Map<Character, List<Edge>> graph = new HashMap<>();

    public void addEdge(char from, char to, int weight) {
        graph.computeIfAbsent(from, k -> new ArrayList<>()).add(new Edge(to, weight));
    }

    public int calculateRouteDistance(List<Character> path) {
        int distance = 0;
        for (int i = 0; i < path.size() - 1; i++) {
            char from = path.get(i), to = path.get(i + 1);
            boolean found = false;
            for (Edge edge : graph.getOrDefault(from, new ArrayList<>())) {
                if (edge.to == to) {
                    distance += edge.weight;
                    found = true;
                    break;
                }
            }
            if (!found) return -1;
        }
        return distance;
    }

    public int countPathsMaxStops(char start, char end, int maxStops) {
        int count = 0;
        Queue<Pair> queue = new LinkedList<>();
        queue.add(new Pair(start, 0));

        while (!queue.isEmpty()) {
            Pair current = queue.poll();
            if (current.stops > maxStops) continue;
            if (current.city == end && current.stops != 0) count++;
            if (current.stops == maxStops) continue;
            for (Edge edge : graph.getOrDefault(current.city, new ArrayList<>())) {
                queue.add(new Pair(edge.to, current.stops + 1));
            }
        }

        return count;
    }

    public int countPathsExactStops(char start, char end, int exactStops) {
        int count = 0;
        Queue<Pair> queue = new LinkedList<>();
        queue.add(new Pair(start, 0));

        while (!queue.isEmpty()) {
            Pair current = queue.poll();
            if (current.stops > exactStops) continue;
            if (current.city == end && current.stops == exactStops) count++;
            if (current.stops == exactStops) continue;
            for (Edge edge : graph.getOrDefault(current.city, new ArrayList<>())) {
                queue.add(new Pair(edge.to, current.stops + 1));
            }
        }

        return count;
    }

    public int shortestPath(char start, char end) {
        if (start == end) {
            int minCycle = Integer.MAX_VALUE;
            for (Edge edge : graph.getOrDefault(start, new ArrayList<>())) {
                int dist = dijkstra(edge.to, start);
                if (dist != -1) {
                    minCycle = Math.min(minCycle, dist + edge.weight);
                }
            }
            return minCycle == Integer.MAX_VALUE ? -1 : minCycle;
        }
        return dijkstra(start, end);
    }

    private int dijkstra(char start, char end) {
        Map<Character, Integer> dist = new HashMap<>();
        for (char node : graph.keySet()) dist.put(node, Integer.MAX_VALUE);
        PriorityQueue<Pair> pq = new PriorityQueue<>(Comparator.comparingInt(p -> p.dist));
        pq.add(new Pair(start, 0));
        dist.put(start, 0);

        while (!pq.isEmpty()) {
            Pair current = pq.poll();
            if (current.city == end) return current.dist;
            if (current.dist > dist.get(current.city)) continue;
            for (Edge edge : graph.getOrDefault(current.city, new ArrayList<>())) {
                int newDist = current.dist + edge.weight;
                if (newDist < dist.getOrDefault(edge.to, Integer.MAX_VALUE)) {
                    dist.put(edge.to, newDist);
                    pq.add(new Pair(edge.to, newDist));
                }
            }
        }

        return -1;
    }

    public int countRoutesMaxDistance(char start, char end, int maxDistance) {
        int[] count = new int[1];
        dfs(start, end, 0, maxDistance, count);
        return count[0];
    }

    private void dfs(char current, char end, int dist, int max, int[] count) {
        if (dist >= max) return;
        if (current == end && dist > 0) count[0]++;
        for (Edge edge : graph.getOrDefault(current, new ArrayList<>())) {
            dfs(edge.to, end, dist + edge.weight, max, count);
        }
    }

    private static class Pair {
        char city;
        int stops;
        int dist;

        Pair(char city, int value) {
            this.city = city;
            this.stops = value;
            this.dist = value;
        }
    }
}
