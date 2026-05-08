#!/usr/bin/env python3
"""
Portfolio API Backend Testing Suite
Tests all backend endpoints for the portfolio application
"""

import requests
import json
import sys
from typing import Dict, Any, List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://cern-fusion.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

class PortfolioAPITester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name: str, passed: bool, details: str = ""):
        """Log test result"""
        status = "✅ PASS" if passed else "❌ FAIL"
        result = f"{status} - {test_name}"
        if details:
            result += f": {details}"
        
        self.test_results.append(result)
        if not passed:
            self.failed_tests.append(f"{test_name}: {details}")
        print(result)
        
    def test_personal_info_endpoint(self):
        """Test GET /api/personal-info endpoint"""
        print("\n=== Testing Personal Info Endpoint ===")
        
        try:
            response = requests.get(f"{API_BASE_URL}/personal-info", timeout=10)
            
            if response.status_code != 200:
                self.log_test("Personal Info - Status Code", False, f"Expected 200, got {response.status_code}")
                return
                
            self.log_test("Personal Info - Status Code", True, "200 OK")
            
            data = response.json()
            
            # Check required fields
            required_fields = ['name', 'title', 'tagline', 'email', 'linkedin', 'bio']
            for field in required_fields:
                if field in data:
                    self.log_test(f"Personal Info - {field} field", True)
                else:
                    self.log_test(f"Personal Info - {field} field", False, "Field missing")
            
            # Check social media fields specifically requested
            social_fields = ['github', 'instagram', 'twitter']
            for field in social_fields:
                if field in data and data[field]:
                    self.log_test(f"Personal Info - {field} field", True, f"Value: {data[field]}")
                else:
                    self.log_test(f"Personal Info - {field} field", False, "Field missing or empty")
            
            # Check profile_photo field exists (can be None)
            if 'profile_photo' in data:
                self.log_test("Personal Info - profile_photo field", True, f"Value: {data['profile_photo']}")
            else:
                self.log_test("Personal Info - profile_photo field", False, "Field missing")
            
            # Verify specific social links as requested
            expected_social_links = {
                'github': 'github.com/UMANG-SH941',
                'instagram': 'instagram.com/retonotes_ix99',
                'twitter': 'x.com/Umangshukla02'
            }
            
            for platform, expected_url in expected_social_links.items():
                if platform in data and data[platform] == expected_url:
                    self.log_test(f"Personal Info - {platform} URL", True, f"Correct: {expected_url}")
                else:
                    actual = data.get(platform, 'Not found')
                    self.log_test(f"Personal Info - {platform} URL", False, f"Expected: {expected_url}, Got: {actual}")
                    
        except requests.exceptions.RequestException as e:
            self.log_test("Personal Info - Request", False, f"Request failed: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Personal Info - JSON Parse", False, f"Invalid JSON response: {str(e)}")
        except Exception as e:
            self.log_test("Personal Info - General", False, f"Unexpected error: {str(e)}")
    
    def test_projects_endpoint(self):
        """Test GET /api/projects endpoint"""
        print("\n=== Testing Projects Endpoint ===")
        
        try:
            # Test basic projects endpoint
            response = requests.get(f"{API_BASE_URL}/projects", timeout=10)
            
            if response.status_code != 200:
                self.log_test("Projects - Status Code", False, f"Expected 200, got {response.status_code}")
                return
                
            self.log_test("Projects - Status Code", True, "200 OK")
            
            data = response.json()
            
            # Check if response is a list
            if not isinstance(data, list):
                self.log_test("Projects - Response Type", False, "Expected list, got other type")
                return
                
            self.log_test("Projects - Response Type", True, "List returned")
            
            # Check if all 6 projects are returned
            if len(data) == 6:
                self.log_test("Projects - Count", True, "6 projects returned")
            else:
                self.log_test("Projects - Count", False, f"Expected 6 projects, got {len(data)}")
            
            # Check required fields for each project
            required_project_fields = ['title', 'description', 'tags', 'image', 'status', 'order']
            for i, project in enumerate(data):
                for field in required_project_fields:
                    if field in project:
                        self.log_test(f"Projects - Project {i+1} {field}", True)
                    else:
                        self.log_test(f"Projects - Project {i+1} {field}", False, "Field missing")
            
            # Check seeking_sponsors and sponsor_link for "In Progress" projects
            in_progress_projects = [p for p in data if p.get('status') == 'In Progress']
            self.log_test("Projects - In Progress Count", True, f"Found {len(in_progress_projects)} 'In Progress' projects")
            
            for i, project in enumerate(in_progress_projects):
                project_title = project.get('title', f'Project {i+1}')
                
                if 'seeking_sponsors' in project:
                    self.log_test(f"Projects - {project_title} seeking_sponsors field", True, f"Value: {project['seeking_sponsors']}")
                else:
                    self.log_test(f"Projects - {project_title} seeking_sponsors field", False, "Field missing")
                
                if 'sponsor_link' in project:
                    self.log_test(f"Projects - {project_title} sponsor_link field", True, f"Value: {project['sponsor_link']}")
                else:
                    self.log_test(f"Projects - {project_title} sponsor_link field", False, "Field missing")
            
            # Test filtering by status
            print("\n--- Testing Project Status Filtering ---")
            
            statuses_to_test = ['In Progress', 'Completed', 'Research']
            for status in statuses_to_test:
                try:
                    filter_response = requests.get(f"{API_BASE_URL}/projects?status={status}", timeout=10)
                    if filter_response.status_code == 200:
                        filtered_data = filter_response.json()
                        # Check if all returned projects have the correct status
                        all_correct_status = all(p.get('status') == status for p in filtered_data)
                        if all_correct_status:
                            self.log_test(f"Projects - Filter by {status}", True, f"Returned {len(filtered_data)} projects")
                        else:
                            self.log_test(f"Projects - Filter by {status}", False, "Some projects have incorrect status")
                    else:
                        self.log_test(f"Projects - Filter by {status}", False, f"Status code: {filter_response.status_code}")
                except Exception as e:
                    self.log_test(f"Projects - Filter by {status}", False, f"Error: {str(e)}")
                    
        except requests.exceptions.RequestException as e:
            self.log_test("Projects - Request", False, f"Request failed: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Projects - JSON Parse", False, f"Invalid JSON response: {str(e)}")
        except Exception as e:
            self.log_test("Projects - General", False, f"Unexpected error: {str(e)}")
    
    def test_contact_endpoint(self):
        """Test POST /api/contact endpoint"""
        print("\n=== Testing Contact Endpoint ===")
        
        try:
            # Test contact message submission
            test_contact_data = {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "subject": "Test Contact Message",
                "message": "This is a test message to verify the contact endpoint is working properly."
            }
            
            response = requests.post(
                f"{API_BASE_URL}/contact",
                json=test_contact_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code != 200:
                self.log_test("Contact - Status Code", False, f"Expected 200, got {response.status_code}")
                return
                
            self.log_test("Contact - Status Code", True, "200 OK")
            
            data = response.json()
            
            # Check response structure
            if 'success' in data and data['success']:
                self.log_test("Contact - Success Field", True, "Success: True")
            else:
                self.log_test("Contact - Success Field", False, f"Success field missing or false: {data}")
            
            if 'message' in data:
                self.log_test("Contact - Message Field", True, f"Message: {data['message']}")
            else:
                self.log_test("Contact - Message Field", False, "Message field missing")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact - Request", False, f"Request failed: {str(e)}")
        except json.JSONDecodeError as e:
            self.log_test("Contact - JSON Parse", False, f"Invalid JSON response: {str(e)}")
        except Exception as e:
            self.log_test("Contact - General", False, f"Unexpected error: {str(e)}")
    
    def test_database_seeding(self):
        """Test if database collections are properly seeded"""
        print("\n=== Testing Database Seeding ===")
        
        # Test various endpoints to ensure data is seeded
        endpoints_to_test = [
            ("/experience", "Experience"),
            ("/skills", "Skills"),
            ("/education", "Education"),
            ("/certifications", "Certifications"),
            ("/languages", "Languages")
        ]
        
        for endpoint, name in endpoints_to_test:
            try:
                response = requests.get(f"{API_BASE_URL}{endpoint}", timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    if data:  # Check if data exists
                        self.log_test(f"Database - {name} Seeded", True, f"Data found")
                    else:
                        self.log_test(f"Database - {name} Seeded", False, "No data found")
                else:
                    self.log_test(f"Database - {name} Seeded", False, f"Status code: {response.status_code}")
            except Exception as e:
                self.log_test(f"Database - {name} Seeded", False, f"Error: {str(e)}")
    
    def test_api_root(self):
        """Test API root endpoint"""
        print("\n=== Testing API Root ===")
        
        try:
            response = requests.get(f"{API_BASE_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if 'message' in data:
                    self.log_test("API Root - Response", True, f"Message: {data['message']}")
                else:
                    self.log_test("API Root - Response", False, "No message field")
            else:
                self.log_test("API Root - Status", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("API Root - Request", False, f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests"""
        print(f"🚀 Starting Portfolio API Backend Tests")
        print(f"📍 Testing API at: {API_BASE_URL}")
        print("=" * 60)
        
        # Run all test methods
        self.test_api_root()
        self.test_personal_info_endpoint()
        self.test_projects_endpoint()
        self.test_contact_endpoint()
        self.test_database_seeding()
        
        # Print summary
        print("\n" + "=" * 60)
        print("🏁 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        failed_count = len(self.failed_tests)
        passed_count = total_tests - failed_count
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_count}")
        print(f"Failed: {failed_count}")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for failure in self.failed_tests:
                print(f"  - {failure}")
        
        if failed_count == 0:
            print("\n🎉 ALL TESTS PASSED!")
            return True
        else:
            print(f"\n⚠️  {failed_count} TESTS FAILED")
            return False

def main():
    """Main function to run tests"""
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()