#include <iostream>
#include <fstream>
#include <vector>
#include <map>
#include <queue>
#include <climits>
#include <functional>
#include <sstream>
#include <algorithm>


using namespace std;

map<char, vector<pair<char, int>>> graph;

void parseGraph(const string& input) {
    stringstream ss(input);
    string edge;
    while (getline(ss, edge, ',')) {
        edge.erase(remove_if(edge.begin(), edge.end(), ::isspace), edge.end());
        if (edge.size() < 3) continue;
        char from = edge[0];
        char to = edge[1];
        int weight = stoi(edge.substr(2));
        graph[from].emplace_back(to, weight);
    }
}

int calculateRouteDistance(const vector<char>& path) {
    int distance = 0;
    for (size_t i = 0; i < path.size() - 1; ++i) {
        char current = path[i];
        char next = path[i+1];
        bool found = false;
        for (const auto& edge : graph[current]) {
            if (edge.first == next) {
                distance += edge.second;
                found = true;
                break;
            }
        }
        if (!found) return -1;
    }
    return distance;
}

int countPathsMaxStops(char start, char end, int maxStops) {
    int count = 0;
    queue<pair<char, int>> q;
    q.push({start, 0});
    while (!q.empty()) {
        auto front = q.front();
        char city = front.first;
        int stops = front.second;
        q.pop();
        if (stops > maxStops) continue;
        if (city == end && stops != 0) count++;
        if (stops == maxStops) continue;
        for (const auto& edge : graph[city]) {
            q.push({edge.first, stops + 1});
        }
    }
    return count;
}

int countPathsExactStops(char start, char end, int exactStops) {
    int count = 0;
    queue<pair<char, int>> q;
    q.push({start, 0});
    while (!q.empty()) {
        auto front = q.front();
        char city = front.first;
        int stops = front.second;
        q.pop();
        if (stops > exactStops) continue;
        if (city == end && stops == exactStops) count++;
        if (stops == exactStops) continue;
        for (const auto& edge : graph[city]) {
            q.push({edge.first, stops + 1});
        }
    }
    return count;
}

int shortestPath(char start, char end) {
    if (start == end) {
        int minCycle = INT_MAX;
        for (const auto& edge : graph[start]) {
            priority_queue<pair<int, char>, vector<pair<int, char>>, greater<>> pq;
            map<char, int> dist;
            for (const auto& node : graph) dist[node.first] = INT_MAX;
            pq.push({0, edge.first});
            dist[edge.first] = edge.second;
            while (!pq.empty()) {
                auto top = pq.top();
                int currentDist = top.first;
                char u = top.second;
                pq.pop();
                if (u == start) {
                    if (currentDist < minCycle) minCycle = currentDist;
                    break;
                }
                if (currentDist > dist[u]) continue;
                for (const auto& e : graph[u]) {
                    char v = e.first;
                    int weight = e.second;
                    if (dist[v] > dist[u] + weight) {
                        dist[v] = dist[u] + weight;
                        pq.push({dist[v], v});
                    }
                }
            }
        }
        return minCycle == INT_MAX ? -1 : minCycle;
    }

    priority_queue<pair<int, char>, vector<pair<int, char>>, greater<>> pq;
    map<char, int> dist;
    for (const auto& node : graph) dist[node.first] = INT_MAX;
    pq.push({0, start});
    dist[start] = 0;
    while (!pq.empty()) {
        auto top = pq.top();
        int currentDist = top.first;
        char u = top.second;
        pq.pop();
        if (u == end) return currentDist;
        if (currentDist > dist[u]) continue;
        for (const auto& e : graph[u]) {
            char v = e.first;
            int weight = e.second;
            if (dist[v] > currentDist + weight) {
                dist[v] = currentDist + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return -1;
}

int countRoutesMaxDistance(char start, char end, int maxDistance) {
    int count = 0;
    function<void(char, int)> dfs = [&](char current, int currentDist) {
        if (current == end && currentDist != 0) {
            count++;
        }
        for (const auto& edge : graph[current]) {
            int newDist = currentDist + edge.second;
            if (newDist < maxDistance) {
                dfs(edge.first, newDist);
            }
        }
    };
    dfs(start, 0);
    return count;
}

int main() {
    string filename = "input.txt";
    ifstream file(filename);
    if (!file.is_open()) {
        cerr << "Could not open the file!" << endl;
        return 1;
    }
    string input;
    getline(file, input);
    parseGraph(input);

    // Problem 1: A-B-C
    vector<char> path1 = {'A', 'B', 'C'};
    int dist1 = calculateRouteDistance(path1);
    cout << "Output #1: " << (dist1 != -1 ? to_string(dist1) : "NO SUCH ROUTE") << endl;

    // Problem 2: A-D
    vector<char> path2 = {'A', 'D'};
    int dist2 = calculateRouteDistance(path2);
    cout << "Output #2: " << (dist2 != -1 ? to_string(dist2) : "NO SUCH ROUTE") << endl;

    // Problem 3: A-C
    vector<char> path3 = {'A', 'D', 'C'};
    int dist3 = calculateRouteDistance(path3);
    cout << "Output #3: " << (dist3 != -1 ? to_string(dist3) : "NO SUCH ROUTE") << endl;

    // Problem 4: A-E-B-C-D
    vector<char> path4 = {'A', 'E', 'B', 'C', 'D'};
    int dist4 = calculateRouteDistance(path4);
    cout << "Output #4: " << (dist4 != -1 ? to_string(dist4) : "NO SUCH ROUTE") << endl;

    // Problem 5: A-E-D
    vector<char> path5 = {'A', 'E', 'D'};
    int dist5 = calculateRouteDistance(path5);
    cout << "Output #5: " << (dist5 != -1 ? to_string(dist5) : "NO SUCH ROUTE") << endl;

    // Problem 6: C to C with max 3 stops
    int count6 = countPathsMaxStops('C', 'C', 3);
    cout << "Output #6: " << count6 << endl;

    // Problem 7: A to C with exactly 4 stops
    int count7 = countPathsExactStops('A', 'C', 4);
    cout << "Output #7: " << count7 << endl;

    // Problem 8: Shortest path A to C
    int shortest8 = shortestPath('A', 'C');
    cout << "Output #8: " << (shortest8 != -1 ? to_string(shortest8) : "NO SUCH ROUTE") << endl;

    // Problem 9: Shortest path B to B
    int shortest9 = shortestPath('B', 'B');
    cout << "Output #9: " << (shortest9 != -1 ? to_string(shortest9) : "NO SUCH ROUTE") << endl;

    // Problem 10: C to C with distance <30
    int count10 = countRoutesMaxDistance('C', 'C', 30);
    cout << "Output #10: " << count10 << endl;

    return 0;
}