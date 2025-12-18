import google.generativeai as genai
from django.conf import settings
import json
import re
import logging

logger = logging.getLogger(__name__)

genai.configure(api_key=settings.GEMINI_API_KEY)

# SDK usually handles the 'models/' prefix automatically
MODEL_NAME = "gemini-2.5-flash"


def generate_module_content(topic, difficulty):
    prompt = f"""
    Create a {difficulty} level learning module on "{topic}"

    Rules:
    - Step-by-step explanation
    - Examples
    - Clear headings
    - Plain text
    """

    try:
        print(f"DEBUG: Generating module content for {topic} using {MODEL_NAME}")
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)
        print(f"DEBUG: Successfully generated module content")
        return response.text
    except Exception as e:
        print(f"DEBUG: Gemini API error for module content: {str(e)}")
        logger.error(f"Gemini API error: {str(e)}")
        # Return a fallback content if API fails
        return f"""# Learning Module: {topic}

## Introduction
This is a {difficulty} level module on {topic}.

## Overview
Due to high demand, we couldn't generate custom content right now. Please try again in a few minutes.

## Key Concepts
- Core concepts of {topic}
- Practical applications
- Best practices

Please refresh the page or try again later for AI-generated content.
"""


def generate_test(topic, difficulty):
    prompt = f"""
    Create 5 MCQ questions on "{topic}" at {difficulty} level.

    Output STRICT JSON (no markdown, no code blocks, just raw JSON):
    [
      {{
        "id": 1,
        "question": "",
        "options": {{
          "A": "",
          "B": "",
          "C": "",
          "D": ""
        }},
        "correct_answer": "A"
      }}
    ]
    """

    try:
        print(f"DEBUG: Generating test for {topic} using {MODEL_NAME}")
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)
        
        # Clean the response - remove markdown code blocks if present
        text = response.text.strip()
        if text.startswith("```"):
            # Remove markdown code block markers
            text = re.sub(r'^```(?:json)?\n?', '', text)
            text = re.sub(r'\n?```$', '', text)
        
        print(f"DEBUG: Successfully generated test")
        return json.loads(text)
    except Exception as e:
        print(f"DEBUG: Gemini API error for test generation: {str(e)}")
        logger.error(f"Gemini API error for test generation: {str(e)}")
        # Return fallback test questions
        return [
            {
                "id": 1,
                "question": f"What is a key concept in {topic}?",
                "options": {
                    "A": "Understanding fundamentals",
                    "B": "Ignoring basics",
                    "C": "Skipping practice",
                    "D": "None of the above"
                },
                "correct_answer": "A"
            },
            {
                "id": 2,
                "question": f"Why is learning {topic} important?",
                "options": {
                    "A": "It has no value",
                    "B": "Career advancement",
                    "C": "Time waste",
                    "D": "Not recommended"
                },
                "correct_answer": "B"
            },
            {
                "id": 3,
                "question": "What is the best approach to learning?",
                "options": {
                    "A": "Skip theory",
                    "B": "Only memorize",
                    "C": "Practice regularly",
                    "D": "Avoid examples"
                },
                "correct_answer": "C"
            },
            {
                "id": 4,
                "question": "How should you handle challenges?",
                "options": {
                    "A": "Give up quickly",
                    "B": "Persist and learn",
                    "C": "Avoid them",
                    "D": "Ignore errors"
                },
                "correct_answer": "B"
            },
            {
                "id": 5,
                "question": "What helps reinforce learning?",
                "options": {
                    "A": "Never reviewing",
                    "B": "Passive reading",
                    "C": "Active practice",
                    "D": "Multitasking"
                },
                "correct_answer": "C"
            }
        ]


def generate_detailed_roadmap(topic):
    """Generates a comprehensive learning roadmap for a specific topic."""
    prompt = f"""
    Create a professional, highly structured, and comprehensive learning roadmap for "{topic}".
    
    The output MUST be formatted in clean Markdown and include these exact sections:
    
    ## 1. Executive Summary
    - High-level overview of the topic
    - Why it's important in the current tech landscape
    - Career prospects
    
    ## 2. Learning Prerequisites
    - Foundational concepts needed
    - Recommended tools/software
    
    ## 3. The Roadmap (Stage-by-Stage)
    Break the topic into 5-7 distinct learning stages. For EACH stage, provide:
    - **Stage Title**
    - **Key Concepts**: Bulleted list of what to learn
    - **Deep Dive**: 1-2 paragraphs explaining the core logic
    - **Pro Tip**: A practical industry insight
    - **Resource Indicator**: [Video/Doc/Book] type recommendation
    
    ## 4. Hands-on Milestone Projects
    - **Project A (Beginner)**: Build something simple
    - **Project B (Intermediate)**: Implement a core feature
    - **Project C (Advanced)**: Scale or optimize
    
    ## 5. Master's Checklist & Resources
    - Checklist of skills acquired
    - Top 3 official documentations or repositories
    
    ## 6. Future Trends & Next Steps
    - Where this technology is heading
    - Advanced certifications or specializations
    
    Aesthetics:
    - Use Horizontal Rules (---) between major sections.
    - Use emojis for bullet points to make it engaging (e.g., 🚀, 📘, 🛠️).
    - Use Blockquotes (>) for important warnings or definitions.
    - Use Syntax Highlighting (```code) for any code examples.
    """

    try:
        print(f"DEBUG: Generating detailed roadmap for {topic} using {MODEL_NAME}")
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)
        print(f"DEBUG: Successfully generated detailed roadmap")
        return response.text
    except Exception as e:
        print(f"DEBUG: Gemini API error for roadmap generation: {str(e)}")
        logger.error(f"Gemini API error for roadmap generation: {str(e)}")
        return f"# Learning Roadmap: {topic}\n\nOur AI-guided learning service is currently experiencing high load. Please try again in 1 minute."

