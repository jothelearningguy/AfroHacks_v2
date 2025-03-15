package com.example.alumni;


import java.io.*;
import java.util.*;
import static spark.Spark.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
//import java.util.Arrays;

// Concrete class representing a Person1
class Person1 {
    private static int counter = 1;
    protected int id;
    protected String name;
    protected String university;
    protected String notableAchievements;
    protected String major;
    protected String fieldAfterGraduation;
    //protected String hometown; //delete this 
    protected int yearOfGraduation;

    public Person1(String name, String university, String major, String fieldAfterGraduation, 
                  int yearOfGraduation, String notableAchievements /*String hometown*/) {
        this.id = counter++;
        this.name = name;
        this.university = university;
        this.notableAchievements = notableAchievements;
        this.major = major;
        this.fieldAfterGraduation = fieldAfterGraduation;
        //this.hometown = hometown; //delete this
        this.yearOfGraduation = yearOfGraduation;
    }

    public String getUniversity() {
        return university;
    }

    public int getYearOfGraduation() {
        return yearOfGraduation;
    }

    public String getMajor() {
        return major;
    }

    public String getFieldAfterGraduation() {
        return fieldAfterGraduation;
    }

    public void displayDetails() {
        System.out.println("ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("University: " + university);
        System.out.println("Notable Achievements: " + notableAchievements);
        System.out.println("Major: " + major);
        System.out.println("Field After Graduation: " + fieldAfterGraduation);
        //System.out.println("Hometown: " + hometown); //delete this
        System.out.println("Year of Graduation: " + yearOfGraduation);
        System.out.println("--------------------------");
    }
}

class CSVReader1 {
    public static List<Person1> readCSV(String filename) {
        List<Person1> people = new ArrayList<>();
        String line;
        String splitBy = ",";
        
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            br.readLine(); // Skip header line
            while ((line = br.readLine()) != null) {
                String[] data = line.split(splitBy);
                if (data.length == 6) {         //change 6 to 7 IOT undo
                    Person1 person = new Person1(
                            data[0].trim(),
                            data[1].trim(),
                            data[2].trim(),
                            data[3].trim(),
                            Integer.parseInt(data[4].trim()),
                            data[5].trim()      // add "data[6].trim()" IOT undo
                            
                    );
                    people.add(person);
                }
            }
        } catch (IOException | NumberFormatException e) {
            e.printStackTrace();
        }
        return people;
    }
}
// Main class to test sorting functionality
public class TestCSVReaderWSort {
    
    // Sorting by Field After Graduation
    public static void sortFieldAfterGrad(List<Person1> people) {
        Collections.sort(people, Comparator.comparing(Person1::getFieldAfterGraduation).thenComparingInt(Person1::getYearOfGraduation));
    }
    
 // Sorting by University
    public static void sortUniversity(List<Person1> people) {
        Collections.sort(people, Comparator.comparing(Person1::getUniversity).thenComparingInt(Person1::getYearOfGraduation));
    }

    // Sorting by Graduation Year
    public static void sortGradYear(List<Person1> people) {
        Collections.sort(people, Comparator.comparingInt(Person1::getYearOfGraduation).thenComparing(Person1::getUniversity));
    }

    // Sorting by Major
    public static void sortMajor(List<Person1> people) {
        Collections.sort(people, Comparator.comparing(Person1::getMajor).thenComparingInt(Person1::getYearOfGraduation));
    }

    public static void main(String[] args) {
        // Set the port for Spark Java (default is 4567, here we choose 8080)
        port(8080);

        // Define an API endpoint to serve alumni data as JSON
        get("/alumni", (req, res) -> {
            // Use a relative path if your CSV file is in the same folder
            String filename = "my-alumni-api/afrohacks2Final.csv";
            List<Person1> people = CSVReader1.readCSV(filename);
            sortFieldAfterGrad(people); // Sort data (choose your desired sorting function)
            
            // Convert the list to JSON
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            res.type("application/json");
            return gson.toJson(people);
        });
        
        // Optionally, you can add more endpoints here for other sorts or filtering.
        
        System.out.println("API is running on http://localhost:8080/alumni");
    
    }
}
