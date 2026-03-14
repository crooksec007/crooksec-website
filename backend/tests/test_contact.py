import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestContactAPI:
    """Tests for /api/contact endpoints"""

    def test_api_root(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "operational"

    def test_post_contact(self):
        payload = {
            "name": "TEST_John Doe",
            "email": "TEST_john@example.com",
            "subject": "Test Subject",
            "message": "This is a test message"
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["subject"] == payload["subject"]
        assert data["message"] == payload["message"]
        assert "id" in data
        assert "created_at" in data

    def test_get_contacts(self):
        r = requests.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)

    def test_contact_persisted(self):
        payload = {
            "name": "TEST_Persist User",
            "email": "TEST_persist@example.com",
            "subject": "Persist Test",
            "message": "Checking persistence"
        }
        post_r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert post_r.status_code == 200
        created_id = post_r.json()["id"]

        get_r = requests.get(f"{BASE_URL}/api/contact")
        assert get_r.status_code == 200
        ids = [c["id"] for c in get_r.json()]
        assert created_id in ids

    def test_post_contact_missing_name(self):
        payload = {"email": "test@example.com", "message": "msg"}
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422

    def test_post_contact_missing_message(self):
        payload = {"name": "Test", "email": "test@example.com"}
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422
