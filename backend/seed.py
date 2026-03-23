import sqlite3
import json
import uuid

DB_FILE = "crooksec.sqlite"

projects = [
  {
    "title": "AI Chatbot System",
    "category": "Artificial Intelligence",
    "desc": "Enterprise-grade conversational AI with multi-turn dialogue, RAG pipelines, and custom knowledge bases.",
    "tags": ["GPT-4", "RAG", "LangChain", "FastAPI"],
    "image": "/services/service_ai.png",
    "accent": "#00F0FF",
    "challenge": "The client's support team was overwhelmed by a 300% surge in complex technical inquiries, leading to 48-hour response times.",
    "solution": "We deployed a highly tuned RAG pipeline leveraging GPT-4, digesting their entire 50GB technical documentation repository for instant, highly accurate querying.",
    "result": "Support resolution times plummeted from 48 hours to 3 seconds, saving $1.2M annually while maintaining a 98% CSAT score."
  },
  {
    "title": "AI Voice Calling System",
    "category": "AI Communications",
    "desc": "Real-time AI voice assistant platform with sub-200ms latency, natural TTS/STT, and seamless CRM integrations.",
    "tags": ["Whisper", "TTS", "WebRTC", "Python"],
    "image": "https://images.unsplash.com/photo-1713464044292-e6798c8bb0e2?w=600&q=60",
    "accent": "#7000FF",
    "challenge": "A massive outbound sales center faced high turnover rates and inconsistent lead qualification across hundreds of human agents.",
    "solution": "Engineered a low-latency WebRTC voice agent mimicking human pacing and intonation, deeply integrated into Salesforce.",
    "result": "Increased daily qualified leads by 400% while allowing the human operators to focus entirely on closing warm, high-intent prospects."
  },
  {
    "title": "Blockchain DeFi Platform",
    "category": "Blockchain",
    "desc": "Decentralized finance protocol with audited smart contracts, liquidity pools, yield farming, and governance tokens.",
    "tags": ["Solidity", "Ethereum", "Web3.js", "React"],
    "image": "/services/service_blockchain.png",
    "accent": "#F59E0B",
    "challenge": "The startup needed an un-hackable, massively scalable decentralized exchange with zero liquidity fragmentation.",
    "solution": "Architected custom automated market maker (AMM) contracts with built-in flash loan resistance and extensive formal verification.",
    "result": "The protocol attained $50M Total Value Locked (TVL) in month one, with zero security incidents despite continuous adversarial pressure."
  },
  {
    "title": "Luxury Jewelry E-Commerce Platform",
    "category": "Secure Web & E-Commerce",
    "desc": "A high-end, lightning-fast luxury e-commerce platform featuring highly secure, high-value transaction pipelines and real-time inventory sync.",
    "tags": ["React", "Node.js", "Stripe", "Tailwind CSS"],
    "image": "/services/service_ecommerce.png",
    "accent": "#F43F5E",
    "challenge": "The luxury retailer was losing high-net-worth clients due to an insecure, clunky legacy website that suffered from checkout crashes and lacked real-time synchronization for one-of-a-kind high-value items.",
    "solution": "We engineered a stunning, buttery-smooth frontend experience backed by a heavily fortified headless architecture. The platform includes end-to-end encrypted checkouts specifically designed for handling massive transaction limits seamlessly.",
    "result": "Delivered a flawless shopping experience that increased ultra-high-net-worth client conversion rates by 210% and successfully secured 100% of all high-value transactions during peak seasons.",
    "link": "https://jewellery-crooksec.lovable.app",
    "liveThumbnail": True
  },
  {
    "title": "Enterprise Security Platform",
    "category": "Cybersecurity",
    "desc": "Full-stack SIEM/SOAR platform with threat intelligence feeds, automated incident response, and real-time dashboards.",
    "tags": ["Python", "Elasticsearch", "Grafana", "AWS"],
    "image": "/services/service_defensive.png",
    "accent": "#EF4444",
    "challenge": "The MSSP provider was drowning in false positives, causing alert fatigue and missing critical infiltration attempts.",
    "solution": "Built a robust SIEM data pipeline using Elasticsearch paired with machine-learning heuristics to auto-triage anomalies.",
    "result": "Reduced alert noise by 94% and cut the Mean Time To Respond (MTTR) from 5 hours to under 4 minutes."
  },
  {
    "title": "vSign ERP Secure Platform",
    "category": "Secure Architecture",
    "desc": "A cryptographically secure Enterprise Resource Planning prototype featuring immutable document signing and zero-trust authentication.",
    "tags": ["React", "Node.js", "Cryptography", "Zero-Trust"],
    "image": "/services/service_blockchain.png",
    "accent": "#00F0FF",
    "challenge": "The client required a highly secure, tamper-proof Enterprise Resource Planning (ERP) and document signing platform (vSign) to safely handle sensitive legal agreements across distributed global teams without risking document forgery or interception.",
    "solution": "We rapidly engineered an end-to-end encrypted ERP prototype built on scalable web infrastructure. The system features immutable audit logs, strict zero-trust authentication protocols, and verifiable cryptographic signatures for every document state change.",
    "result": "Delivered a high-fidelity, secure prototype that successfully proved the concept to stakeholders, paving the way for the client to safely process and manage confidential legal documents at enterprise scale.",
    "link": "https://vsign-crooksec-com.lovable.app/",
    "liveThumbnail": True
  }
]

def seed_db():
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    
    # Clear existing projects
    cur.execute('DELETE FROM projects')
    
    for p in projects:
        proj_id = str(uuid.uuid4())
        tags_json = json.dumps(p.get("tags", []))
        link = p.get("link", None)
        live_thumb = 1 if p.get("liveThumbnail", False) else 0
        
        cur.execute('''
            INSERT INTO projects (id, title, category, desc, tags, image, accent, challenge, solution, result, link, liveThumbnail)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            proj_id, p["title"], p["category"], p["desc"], tags_json, p["image"], p["accent"], 
            p["challenge"], p["solution"], p["result"], link, live_thumb
        ))
        
    conn.commit()
    print(f"Successfully seeded {len(projects)} projects into {DB_FILE}!")
    conn.close()

if __name__ == "__main__":
    seed_db()
