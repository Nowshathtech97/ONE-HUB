# Import necessary libraries
import os
import json
import requests
from flask import Flask, render_template, request, jsonify
from bs4 import BeautifulSoup
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from a .env file for security
load_dotenv()

# Initialize the Flask web application
app = Flask(__name__, template_folder="templates")

# --- Configure the Gemini API ---
try:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in .env file.")
    
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')
    print("Gemini model configured successfully.")
except Exception as e:
    print(f"FATAL: Error configuring Gemini API: {e}")
    model = None

def get_fallback_analysis(company_name: str):
    """
    Provides a deterministic fallback response when the Gemini model is not configured.
    Keeps the UI and API usable in dev environments without an API key.
    """
    name = (company_name or "").strip() or "Company"
    return {
        "about": f"{name} profile analysis is running in offline mode (no AI key configured). Add GEMINI_API_KEY to enable full verification.",
        "services": [],
        "location": "N/A",
        "user_reviews": {
            "sentiment": "Mixed",
            "summary": "User review analysis is unavailable in offline mode. Configure the AI key to fetch and summarize reviews from public sources."
        }
    }

def get_company_website(search_query):
    """
    Uses the Gemini model to perform a web search and identify the correct
    company name and its official website from a potentially ambiguous query.
    """
    if not model: return {"error": "AI Model not configured."}
    
    prompt = f"""
    You are an intelligent research assistant. A user has provided the search query: '{search_query}'.
    Your task is to find the official corporate website for this company. The query might be a shorthand name (e.g., 'mahat' for 'Mahat Labs').
    
    Perform a web search to determine the correct full company name and its primary domain.
    
    Respond with ONLY a valid JSON object with two keys:
    1. "corrected_name": The full, official name of the company you found.
    2. "website_url": The official website URL, starting with https://.
    
    Example for query 'mahat': {{"corrected_name": "Mahat Labs", "website_url": "https://mahat.ai"}}
    Example for query 'openai': {{"corrected_name": "OpenAI", "website_url": "https://openai.com"}}
    
    If you cannot confidently determine a website, return: {{"error": "Could not find a matching company."}}
    """
    try:
        response = model.generate_content(prompt)
        json_text = response.text.strip().replace("```json", "").replace("```", "").strip()
        result = json.loads(json_text)
        
        if 'website_url' in result and not result['website_url'].startswith('http'):
            result['website_url'] = f"https://{result['website_url']}"
            
        print(f"Gemini found company details: {result}")
        return result
    except Exception as e:
        print(f"Error getting company website from Gemini: {e}")
        return {"error": f"Failed to identify company from query '{search_query}'. AI response was not valid JSON."}

def scrape_website_content(url):
    """
    Scrapes the text content from a given URL using requests and BeautifulSoup.
    """
    if not url: return None
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        for script_or_style in soup(["script", "style"]):
            script_or_style.decompose()
            
        text_content = ' '.join(soup.body.get_text(separator=' ', strip=True).split())
        print(f"Successfully scraped {len(text_content)} characters from {url}")
        
        return text_content[:8000]
    except requests.exceptions.RequestException as e:
        print(f"Error scraping website {url}: {e}")
        return None

# --- MODIFIED FUNCTION ---
def get_structured_ai_analysis(company_name, website_content):
    """
    Gets a structured JSON analysis from Gemini, instructing it to search the web
    for company details, services, and user reviews.
    """
    if not model: return {"error": "AI Model not configured."}
    
    # This prompt is updated to remove 'founders' and add 'services'.
    prompt = f"""
    You are an expert business analyst. Your task is to provide a structured analysis of the company '{company_name}'.
    Use the following scraped text from the company's website as your initial source:
    ---
    {website_content}
    ---
    
    Now, populate a JSON object with the following information. 
    **CRITICAL**: For every field, if the information is not in the provided text, you MUST perform a web search to find the correct details. Do not invent information.

    The JSON object must contain these exact keys:
    1.  'about': A detailed paragraph about the company's mission and products.
    2.  'services': A list of the main products or services offered by the company. **Search online** on their official website or product pages. If none can be found, return an empty list `[]`.
    3.  'location': The company's headquarters location (City, State/Country). **Search online** if not present in the text.
    4.  'user_reviews': An analysis based on a **web search for actual user reviews** from sites like G2, Capterra, or Trustpilot. This object must contain two sub-keys:
        a. 'sentiment': A one-word summary of the overall sentiment (e.g., "Positive", "Mixed", "Negative").
        b. 'summary': A paragraph summarizing the common points of praise and criticism found in the reviews you discovered.

    Provide the output strictly as a single, valid JSON object. Do not include any other text, markdown, or code formatting backticks.
    """

    try:
        response = model.generate_content(prompt)
        json_text = response.text.strip().replace("```json", "").replace("```", "").strip()
        return json.loads(json_text)
    except Exception as e:
        print(f"Error getting structured AI analysis: {e}")
        return {"error": f"Failed to get a structured response from the AI. Details: {e}"}

@app.after_request
def add_cors_headers(response):
    """
    Allow the Vite dev server (and other clients) to call /verify.
    For production, restrict origins as needed.
    """
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


# Frontend routes (standalone Flask UI)
@app.route('/')
def index():
    return render_template('index.html')


# Alias route (requested '@company' route)
@app.route('/company')
def company():
    return render_template('index.html')


@app.route('/health')
def health():
    return jsonify({"ok": True})

# API endpoint that the frontend calls
@app.route('/verify', methods=['POST', 'OPTIONS'])
def verify_company():
    if request.method == 'OPTIONS':
        return jsonify({"ok": True})
    company_query = request.json.get('company_name')
    if not company_query: return jsonify({'error': 'Company name is required.'}), 400
    if not model:
        return jsonify({
            'company_name': company_query.strip(),
            'website_url': '',
            'ai_analysis': get_fallback_analysis(company_query)
        })

    website_info = get_company_website(company_query)
    if not website_info or 'error' in website_info:
        error_msg = website_info.get('error', f"AI could not identify a company for '{company_query}'.")
        return jsonify({'error': error_msg}), 404

    corrected_name = website_info.get('corrected_name')
    website_url = website_info.get('website_url')

    content = scrape_website_content(website_url)
    if not content:
        print(f"Could not scrape {website_url}. Proceeding with AI analysis based on general knowledge.")
        content = "Could not retrieve website content. Rely on web search."

    ai_response = get_structured_ai_analysis(corrected_name, content)
    if 'error' in ai_response:
        return jsonify(ai_response), 500

    return jsonify({
        'company_name': corrected_name,
        'website_url': website_url,
        'ai_analysis': ai_response
    })

if __name__ == '__main__':
    app.run(debug=True)