from flask import Flask, request, jsonify
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from flask_cors import CORS
import os
from dotenv import load_dotenv
load_dotenv()  # Load environment variables from .env file


app = Flask(__name__)
CORS(app)

# Load Azure credentials from environment variables


key = os.getenv('AZURE_TEXT_ANALYTICS_KEY')
endpoint = os.getenv('AZURE_TEXT_ANALYTICS_ENDPOINT')

# Initialize the Text Analytics client
client = TextAnalyticsClient(endpoint=endpoint, credential=AzureKeyCredential(key))

@app.route('/api/analyze-text', methods=['POST'])

def analyze_text():
    print("Request received")
    try:
        data = request.get_json()
        text = data.get('text')
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400

        documents = [text]
        response = client.analyze_sentiment(documents)

        print("Response",response)
        
        if not response or len(response) == 0:
            print("No response from analysis service")
            return jsonify({'error': 'No response from analysis service'}), 500

        result = response[0]
        
        if hasattr(result, 'error'):
            return jsonify({'error': result.error.message}), 500

        return jsonify({
            'sentiment': result.sentiment,
            'confidenceScores': {
                'positive': result.confidence_scores.positive,
                'neutral': result.confidence_scores.neutral,
                'negative': result.confidence_scores.negative
            },
            'text': text
        })

    except Exception as error:
        print(f'Text analysis error: {error}')
        
        status_code = 500
        error_message = 'Failed to analyze text'
        
        if hasattr(error, 'code'):
            if error.code == 'InvalidApiKey':
                status_code = 401
                error_message = 'Invalid API key'
            elif error.code == 'ResourceNotFound':
                status_code = 404
                error_message = 'Azure resource not found'
            elif error.code == 'TooManyRequests':
                status_code = 429
                error_message = 'Too many requests - please try again later'
        
        return jsonify({'error': error_message}), status_code

if __name__ == '__main__':
    app.run(debug=True, port=5000)