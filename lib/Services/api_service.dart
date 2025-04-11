import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:managment/data/model/add_date.dart';

class ApiService {
  static const String baseUrl =
      'http://localhost:4000'; // Replace with your backend URL

  // Fetch all expenses
  static Future<List<Add_data>> fetchExpenses() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/expenses'));

      if (response.statusCode == 200) {
        final jsonResponse = jsonDecode(response.body);

        // Handle different response formats
        List<Add_data> expensesList = [];

        if (jsonResponse is List) {
          expensesList = jsonResponse
              .map<Add_data>((item) => Add_data.fromJson(item))
              .toList();
        } else if (jsonResponse is Map<String, dynamic> &&
            jsonResponse.containsKey('expenses')) {
          List<dynamic> expenses = jsonResponse['expenses'];
          expensesList = expenses
              .map<Add_data>((item) => Add_data.fromJson(item))
              .toList();
        } else {
          throw Exception("Unexpected JSON format from API");
        }

        return expensesList;
      } else {
        throw Exception(
            'Failed to load expenses: Status ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching expenses: $e');
    }
  }
}
